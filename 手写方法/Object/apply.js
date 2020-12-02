Function.prototype.myApply = function (context, arg) {
  if (!context) {
    context = window
  }
  const fn = Symbol()
  context[fn] = this
  let res = context[fn](...arg)
  delete context[fn]
  return res
}

let obj = {
  a: 1,
  b: 2
}
function test (c, d) {
  console.log(this.a, this.b)
  console.log(`c: ${c}===d: ${d}`)
}
// test()
test.myApply(obj, [3, 4])