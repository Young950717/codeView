// 定义三种状态
const PENDING = 'PENDING',
    FULLFILLED = 'FULLFILLED',
    REJECTED = 'REJECTED'
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
        if (this.status === FULLFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if (this.status === PENDING) {
            // 添加订阅者
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }

    }
}
module.exports = MyPromise