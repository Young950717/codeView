const MyPromise = require('./MyPromise.js')

let promise = new MyPromise((reslove, reject) => {
    // reslove(1)
    // reject(2)
    // throw new Error('Error')
    setTimeout(() => {
        reslove(3)
    }, 1000)
})
promise.then(value => {
    console.log('fullFill1: ', value)
}, reason => {
    console.log('reject1:', reason)
})
promise.then(value => {
    console.log('fullFill2: ', value)
}, reason => {
    console.log('reject2:', reason)
})