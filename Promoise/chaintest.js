/**
 * @description 尝试各种原生链式调用的结果
 */

let promise = new Promise((reslove, reject) => {
    reslove('first reslove')
})

// 情况1 通过return传递结果
// promise.then(value => {
//     return value
// })
// .then(value => {
//     console.log(value)
// })

// 情况2 通过return一个新的promise reslove结果
// promise.then(value => {
//     return value
// })
//     .then(value => {
//         return new Promise((reslove, reject) => {
//             // reslove(value)
//             setTimeout(() => {
//                 reslove(value)
//             }, 2000)
//         })
//     })
//     .then(value => {
//         console.log(value)
//     })

// 情况3 通过新的promise reject结果
// promise.then(value => {
//     return value
// })
//     .then(value => {
//         return new Promise((reslove, reject) => {
//             // reslove(value)
//             setTimeout(() => {
//                 reject('ERROR')
//             }, 2000)
//         })
//     })
//     .then(value => {
//         console.log(value)
//     }, reason => {
//         console.log('Rejected:' + reason)
//     })

// 情况4 then走了失败的回调 再走then
// promise.then(value => {
//     return value
// })
//     .then(value => {
//         return new Promise((reslove, reject) => {
//             // reslove(value)
//             setTimeout(() => {
//                 reject('ERROR')
//             }, 2000)
//         })
//     })
//     .then(value => {
//         console.log(value)
//     }, reason => {
//         console.log('Rejected: ' + reason) // 打印 Rejected: ERROR
//         // 默认return undefined
//     })
//     .then(value => {
//         console.log('FullFilled: ' + value) // 打印 FullFilled: undefined
//     }, reason => {
//         console.log('Rejected:' + reason) // 不走
//     })


// 情况5 then中 throw new Error
// promise.then(value => {
//     return value
// })
//     .then(value => {
//         return new Promise((reslove, reject) => {
//             // reslove(value)
//             setTimeout(() => {
//                 reject('ERROR')
//             }, 2000)
//         })
//     })
//     .then(value => {
//         console.log(value)
//     }, reason => {
//         console.log('Rejected: ' + reason) // 打印 Rejected: ERROR
//         // 默认return undefined
//     })
//     .then(value => {
//         throw new Error('throw error')
//     })
//     .then(value => {
//         console.log(value)
//     }, reason => {
//         console.log('exeption: ' + reason) // =>exeption: Error: throw error
//     })

// 情况6 用catch捕获异常
// promise.then(value => {
//     return value
// })
//     .then(value => {
//         return new Promise((reslove, reject) => {
//             // reslove(value)
//             setTimeout(() => {
//                 reject('ERROR')
//             }, 2000)
//         })
//     })
//     .then(value => {
//         console.log(value)
//     }, reason => {
//         console.log('Rejected: ' + reason) // 打印 Rejected: ERROR
//         // 默认return undefined
//     })
//     .then(value => {
//         throw new Error('throw error')
//     })
//     .then(value => {
//         console.log(value)
//         // 如果写多一个onRejected回调的话那就会走这个，不走下面的catch
//     })
//     .catch(err => {
//         console.log('Catch: ' + err) // =>Catch: Error: throw error
//     })


// 情况7 catch返回
promise.then(value => {
    return value
})
    .then(value => {
        return new Promise((reslove, reject) => {
            // reslove(value)
            setTimeout(() => {
                reject('ERROR')
            }, 2000)
        })
    })
    .then(value => {
        console.log(value)
    }, reason => {
        console.log('Rejected: ' + reason) // 打印 Rejected: ERROR
        // 默认return undefined
    })
    .then(value => {
        throw new Error('throw error')
    })
    .then(value => {
        console.log(value)
    })
    .catch(err => {
        console.log('Catch: ' + err) // =>Catch: Error: throw error
        return 'Catch error'
    })
    .then(value => {
        console.log('Then: ', value)
    })

    // 在promise里面, catch也是遵循then的运行原则

/* 成功条件
   then里面返回一个普通的js值
   then里面返回一个新的promise，reslove出来的值 value
*/
/* 失败条件
   then里面返回一个新的promise的reject出来的值 reason
   then抛出了异常
*/
