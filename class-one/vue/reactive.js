import observe from './observe'
function defineReactiveData(data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            console.log('响应式获取数据：' + value)
            return value
        },
        set(newVal) {
            if (newVal === value) return
            console.log('响应式设置数据：' + newVal)
            value = newVal
        }
    })
}
export default defineReactiveData

