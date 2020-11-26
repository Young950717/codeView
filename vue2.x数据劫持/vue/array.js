import { ARR_METHOD } from './config'
import observeArr from './observeArr'
var originArrMethods = Array.prototype // 原始原型引用
var arrMethods = Object.create(originArrMethods) // 拷贝

ARR_METHOD.map(function (m) {
    // 重写方法
    arrMethods[m] = function () {
        var args = Array.prototype.slice.call(arguments)
        // var args = Array.from(arguments)
        var rt = originArrMethods[m].apply(this, args) // 调用
        var newArr
        // 如果操作的方法带参数的，需要重新观察
        switch (m) {
            case 'push':
            case 'unshift':
                newArr = args
                break
            case 'splice':
                newArr = args.splice(2)
                break
        }
        newArr && observeArr(newArr)
        return rt
    }
})
export {
    arrMethods
}