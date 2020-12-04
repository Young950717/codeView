/**
 * @description Generator 让遍历停下来
 */

{
  function* loop () {
    for (let i = 0; i < 5; i++) {
      yield console.log(i)
    }
    return
  }
  // let run = loop()
  // run
  // run.next()
  // run.next()
  // run.next()
  // run.next()
  // run.next()
  // run.next()
  // run.next()
  // run.next()
}

//yield没有返回值
{
  function* gen () {
    let val
    val = yield 1
    console.log(val)
  }
  // let g = gen()
  // g.next() // => 无输出
  // g.next() // => undefined
}
//yield加 *  表示后面跟着1.一个可遍历对象 2.Generator的实例
{
  function* gen () {
    let val
    val = yield* [1, 2, 3]
    console.log(val)
  }
  // let g = gen()
  // g.next() // => 无输出
  // g.next() // => 无输出
  // console.log(g.next()) // => { value: 1, done: false }
  // console.log(g.next()) // => { value: 2, done: false }
}

// 传值 next方法的传值是传给yield的返回值
{
  function* gen () {
    let val
    val = yield [1, 2, 3]
    // val = yield 2
    console.log(val)
  }
  // let g = gen()
  // console.log(g.next(10))
  // console.log(g.next(20))
  // console.log(g.next(66))
}

// return()强行打断
{
  function* gen () {
    let val
    val = yield [1, 2, 3]
    // val = yield 2
    console.log(val)
  }
  // let g = gen()
  // console.log(g.next(10))
  // g.return()
  // g.return(100) // => { value: 100, done: true }  
  // console.log(g.next(20))
}

// 抛出异常以及捕获异常
{
  function* gen () {
    while (1) {
      try {
        yield 1
      } catch (e) {
        console.log(e.message)
      }
    }
  }
  // let g = gen()
  // console.log(g.next())
  // console.log(g.next())
  // console.log(g.next())
  // console.log(g.next())
  // g.throw(new Error('制造错误'))
  // console.log(g.next())
}