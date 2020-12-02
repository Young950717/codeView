/**
 * @description 利用闭包手写简易防抖函数
 * @param {Function} fn 执行函数
 * @param {Number} delay 几毫秒后无操作就执行fn
 */
function debounce (fn, delay) {
  let timer
  return function () {
    const context = this
    const arg = arguments
    // 只要调用就清除上一个记录过的事件
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, arg)
    }, delay)
  }
}