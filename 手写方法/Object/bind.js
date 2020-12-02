Function.prototype.myBind = function (context) {
  if (!context) {
    context = window
  }
  const that = this
  const args = Array.from(arguments).slice(1)
  return function () {
    that.apply(context, args)
  }
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
let res = test.myBind(obj, [5, 6])
res()