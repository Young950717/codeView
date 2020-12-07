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

// 抽奖的一个例子
{
  function draw (first = 1, second = 3, third = 5) {
    // 奖品池
    const firstPrize = ['1A', '1B', '1C', '1D', '1E', '1F']
    const secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I']
    const thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I', '3J', '3K', '3L', '3M', '3N', '3O', '3P', '3Q']
    let result = []
    let random
    // 一等奖
    for (let i = 0; i < first; i++) {
      random = Math.floor(Math.random() * firstPrize.length)
      result = result.concat(firstPrize.splice(random, 1))
    }
    // 二等奖
    for (let i = 0; i < second; i++) {
      random = Math.floor(Math.random() * secondPrize.length)
      result = result.concat(secondPrize.splice(random, 1))
    }
    // 三等奖
    for (let i = 0; i < third; i++) {
      random = Math.floor(Math.random() * thirdPrize.length)
      result = result.concat(thirdPrize.splice(random, 1))
    }
    return result
  }
  // let t = draw()
  // for (const value of t) {
  //   console.log(value)
  // }
}

// 抽奖Generator改写
{
  function* draw (first = 1, second = 3, third = 5) {
    // 奖品池
    const firstPrize = ['1A', '1B', '1C', '1D', '1E', '1F']
    const secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2G', '2H', '2I']
    const thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3G', '3H', '3I', '3J', '3K', '3L', '3M', '3N', '3O', '3P', '3Q']
    let count = 0
    let random
    while (1) {
      if (count < first) {
        random = Math.floor(Math.random() * firstPrize.length)
        yield firstPrize[random]
        count++
        firstPrize.splice(random, 1)
      } else if (count < first + second) {
        random = Math.floor(Math.random() * secondPrize.length)
        yield secondPrize[random]
        count++
        secondPrize.splice(random, 1)
      } else if (count < first + second + third) {
        random = Math.floor(Math.random() * thirdPrize.length)
        yield thirdPrize[random]
        count++
        thirdPrize.splice(random, 1)
      } else {
        return '结束了'
      }
    }
  }
  // let t = draw()
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
  // console.log(t.next().value)
}


// 斐波那契数列 es5
{
  function Fibonacci (n) {
    let res
    if (n === 1 || n === 2) {
      return res = 1
    }
    return Fibonacci(n - 2) + Fibonacci(n - 1)
  }
  // console.log(Fibonacci())
}

{
  function* Fibonacci (n) {
    let current = 1
    let = last = 0
    while (n--) {
      yield current
      var temp = current
      current += last
      last = temp
    }
  }
  // var o = feb(10), res, result = [];
  let o = Fibonacci(10)
  let res
  const result = []
  while (!(res = o.next()).done) {
    result.push(res.value)
  }
  console.log(result)
}