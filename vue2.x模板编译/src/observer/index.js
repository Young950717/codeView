import { arrMethods } from './array'
function Observer (data) {
    if (data instanceof Array) {
        data.__proto__ = arrMethods
        observeArr(data)
    } else {
        this.walk(data)
    }
}
Observer.prototype.walk = function (data) {
    var keys = Object.keys(data)
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        var value = data[key]
        defineReactiveData(data, key, value)
    }
}
function observeArr (arr) {
    for (var i = arr; i < arr.length; i++) {
        observe(arr[i])
    }
}
function defineReactiveData (data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get () {
            console.log('响应式获取数据：' + value)
            return value
        },
        set (newVal) {
            if (newVal === value) return
            console.log('响应式设置数据：' + newVal)
            value = newVal
        }
    })
}
export default Observer