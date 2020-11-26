import { initState } from './state'
function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        vm.$option = options
        initState(vm)
    }
}
export {
    initMixin
}