Function.prototype.myCall = function (context) {
  if (!context) {
    context = window
  }
  const fn = Symbol()
  context[fn] = this
  const args = Array.from(arguments).slice(1);
  context[fn](...args)
  delete context[fn]
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
test.myCall(obj, 5, 6)