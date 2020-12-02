const MyPromise = require('./MyPromise.js')

// let promise = new MyPromise((reslove, reject) => {
//     // reslove(1)
//     // reject(2)
//     // throw new Error('Error')
//     setTimeout(() => {
//         reslove(3)
//     }, 1000)
// })
// promise.then(value => {
//     console.log('fullFill1: ', value)
// }, reason => {
//     console.log('reject1:', reason)
// })
// promise.then(value => {
//     console.log('fullFill2: ', value)
// }, reason => {
//     console.log('reject2:', reason)
// })

// let promise1 = new MyPromise((reslove, reject) => {
//     reslove('promise1')
// })
// let promise2 = promise1.then(value => {
//     return value + '-> then-> ' + 'promise2'
// })
//     .then(value => {
//         console.log(value)
//     }, () => {

//     })
// let promise1 = new MyPromise((reslove, reject) => {
//     reslove('promise1')
// })
// let promise2 = promise1.then(value => {
//     return value + '-> then-> ' + 'promise2'
// })
//     .then(value => {
//         console.log(value)
//     }, () => {

//     })

let promise1 = new MyPromise((reslove, reject) => {
    reslove('promise1')
})
let promise2 = promise1.then(value => {
    // return new Error('error') // 正常报错
    // return Promise.resolve('promise reslove') // 正常输出
    // return 'Promise then' // 正常输出
    return new MyPromise((reslove, reject) => {
        // reslove('new promise reslove')  // 正常输出
        // setTimeout(() => {
        //     reslove('new promise reslove') // 正常输出
        // }, 2000)
        setTimeout(() => {
            reslove(new MyPromise((reslove, reject) => {
                reslove('new Promise reslove')
            }))
        }, 2000)
    })
}, reason => {
    return reason
})
// promise2.then().then().then().then(value => {
//     console.log(value)
// }, reason => {
//     console.log(reason)
// })
promise2.then().then().then().then(value => {
    throw Error('xxx')
}, reason => {
    console.log(reason)
})
    .catch(e => {
        console.log(e)
    })