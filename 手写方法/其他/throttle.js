/**
 * @description 闭包实现简单的节流函数
 * @param {Function} fn 
 * @param {Number} wait 等待的时间 单位ms
 */
function throttle (fn, wait) {
  let lastTime = 0
  return function () {
    const context = this
    const arg = arguments
    let nowTime = new Date().getTime()
    if (nowTime - lastTime > wait) {
      fn.apply(context, arg)
      lastTime = nowTime
    }
  }

}