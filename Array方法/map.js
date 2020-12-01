/**
 * @deprecated 根据草案手写map
 */
Array.prototype.myMap = function (callbackfn, thisArg) {
    // 处理数组类型异常
    if (this === null || this === undefined) {
        throw new TypeError("Cannot read property 'map' of null or undefined");
    }
    // 处理回调类型异常
    if (Object.prototype.toString.call(callbackfn) != '[object Function]') {
        throw new TypeError(callbackfn + ' is not a function')
    }

    let O = Object.create(this)
    let T = thisArg
    let len = O.length >>> 0 // 保证len为数字且为整数
    let A = new Array(len) // 用于返回的数组
    for (let k = 0; k < len; k++) {
        if (k in O) { // 根据下标处理
            let kValue = O[k]
            let mappedValue = callbackfn.call(T, kValue, k, O)
            A[k] = mappedValue
        }
    }
    return A
}

let res = [1, 2, 3].myMap((o) => {
    return o * 2
})
console.log(res);
