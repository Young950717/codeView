# 手写/重写Promise

# 实现思路
根据promise/A+的规则  
1. promise的参数为一个函数，且实例化promise后自动执行
2. promise有三个状态，pending，fullfill和reject，且开始为pending
3. fullfill后会返回value, reject则返回reason
```javascript
// 初步的构造器
class Mypromise {
    constructor(executor){
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        executor()
    }
}
 ``` 
由于```value```值由```reslove()```传出去,```reason```由```reject```传出去  
## 改造
```javascript
class Mypromise {
    constructor(executor) {
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined
        // 写在构造器而不写在原型链的原因是因为每个实例都有自己的的reslove和reject
        const reslove = value => {
            if (this.status === 'pending') {
                this.status = 'fullFilled'
                this.value = value
            }
        }
        const reject = reason => {
            if (this.status === 'pending') {
                this.status = 'reject'
                this.reaason = reason
            }
        }
        executor(reslove, reject)
    }
    then (onFulfilled, onRejected) {
        if (this.status === 'pending') {
            onFulfilled(this.value)
        }
        if (this.status === 'pending') {
            onRejected(this.reason)
        }
    }
} 
```
## 问题  
看起来没问题，但是如果写这样的代码
```javascript
    let promise = new MyPromise((reslove,reject) => {
        throw new Error('捣乱')
    })
    promise.then(value => {
        console.log(value)
    }, reason => {
        console.log(reason)
    })
 ```
你会发现，不走reject那条路，而原生的则是走reject那条路  
## 继续改造  
捕捉这个异常也很简单，其实就给executor加个try catch就好了
```javascript
class Mypromise {
    constructor(executor){
        // ...省略
        try {
            executor(reslove, reject)
        } catch(e) {
            reject(e)
        }
    }
} 
```
## 异步 发布-订阅模式
还有最后一种情况就是解决在executor里面放一个异步
```javascript
class Mypromise {
    constructor(executor){
        //... 省略
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = value => {
            if (this.status === 'pending') {
                this.status = 'fullFilled'
                this.value = value
                // 发布
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
             if (this.status === 'pending') {
                this.status = 'reject'
                this.reason = reason
                // 发布
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
    }
    then () {
         //... 省略
         // 加多一个处理pending状态的判断
         if (this.status === 'pending') {
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
```
