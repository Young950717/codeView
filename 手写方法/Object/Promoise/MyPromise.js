// 定义三种状态
const PENDING = 'PENDING',
    FULLFILLED = 'FULLFILLED',
    REJECTED = 'REJECTED'

// 核心处理函数
function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<MyPromise>'))
    }
    let called = false // 是否调用resolve reject的标记
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then // 可能抛出异常
            if (typeof then === 'function') {
                // 是promise
                then.call(x, y => {
                    if (called) return
                    called = true
                    // 递归处理嵌套promise
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class MyPromise {
    constructor(executor) {
        this.status = PENDING // 初始状态
        this.value = undefined // 两个值皆为undefined
        this.reason = undefined

        // 存储池 => 发布订阅模式
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        // 挂在到每个实例都是不同的resolve和reject方法
        const resolve = value => {
            if (this.status === PENDING) {
                this.status = FULLFILLED
                this.value = value
                // 发布
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                // 发布
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        // try catch的目的是在executor中抛出异常直接走reject
        try {
            executor(resolve, reject)
        } catch (ex) {
            reject(ex)
        }
    }
    then (onFulfilled, onRejected) {
        // 解决then穿透问题
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULLFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // 这里如果写成同步 promise2是拿到不到的，所以使用了宏任务去放到任务队列去执行,下方同理
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        // console.log(e)
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                // 添加订阅者
                this.onFulfilledCallbacks.push(() => {
                    // 这里不需要加是因为只有异步了才会进这里
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
        return promise2
    }
    catch (errorCallback) {
        return this.then(null, errorCallback)
    }
}

module.exports = MyPromise