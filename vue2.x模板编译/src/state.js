
import { proxyData } from './utils'
import observe from './observer'
function initState (vm) {
    const options = vm.$options
    if (options.data) {
        initData(vm)
    }
}
function initData (vm) {
    var data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
    for (const key in data) {
        proxyData(vm, '_data', key)
    }
    observe(vm._data)
}
export {
    initState
}