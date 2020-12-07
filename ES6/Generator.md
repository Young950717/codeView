# Generator 生成器
**MDN定义**  
生成器对象是由一个 generator function 返回的,并且它符合可迭代协议和迭代器协议。

**理解它**  
Generator是一个es6新加的断言函数，让遍历可控值，妈妈再也不用担心无限循环爆栈啦

**兼容性**  
IE不兼容

# 关于使用它
Generator原型上有三个方法，分别是
```javascript
Generator.prototype.next() // 返回一个由 yield表达式生成的值。

Generator.prototype.return() // 返回给定的值并结束生成器。

Generator.prototype.throw() //向生成器抛出一个错误。

```

Generator函数返回的对象有两个属性，一个是`value`，表示yield前的值，另一个是`done`，表示函数是否结束
  ## Examples
### yield关键字和next
定义一个fn，在function关键字后面加一个`*`。yield关键字是一个断言的效果，函数执行到这里就要暂停，只要手动调用.next()方法才会继续执行，且yield没有返回值
```javascript
function* gen () {
   let val
   val = yield 1
   console.log(val)
}
let g = gen()
g.next() // => 无输出
g.next() // => undefined
```
### 循环中使用Generator

```javascript
   function* loop () {
    for (let i = 0; i < 5; i++) {
      yield console.log(i)
    }
    return
  }
```
调用
```javascript
let t = loop() // =>这个时候不会打印0 1 2 3 4 
t.next() // =>log 0
t.next() // =>log 1
t.next() // =>log 2
t.next() // =>log 3
t.next() // =>log 4
t.next() // =>log 5
t.next() // =>不log了

 ```


### next
next方法的传值是传给yield的返回值
```javascript
function* gen () {
    let val
    val = yield [1, 2, 3]
    console.log(val)
  }
let g = gen()
console.log(g.next(10)) // 不会打印10，因为遇到yield停止了，但是此时没有进行赋值操作，所以传值没有意义
console.log(g.next(20)) // 打印20
console.log(g.next(66)) // 函数已经结束了，所以传值没有意义
```

### return函数
return函数可以让Generator函数提前结束。return函数也可以传值，同next
```javascript
function* gen () {
   let val
   val = yield [1, 2, 3]
   // val = yield 2
   console.log(val)
 }
 let g = gen()
 g.next()
 g.return() // =>打断函数，下面本应该输出20的，现在没有输出了，
 g.next(20)
 ```

 ### thorw函数
```javascript
{
function* gen () {
  while (1) { // 死循环
    try {
      yield 1
    } catch (e) {
      console.log(e.message)
    }
  }
}
let g = gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
g.throw(new Error('制造错误')) // =>输出 '制造错误'
console.log(g.next()) // done还是false
}
 ```

## 场景
1. 抽奖
假设1等奖一名，二等奖3名，三等奖5名,随机抽取  
先不采用Generator来写
```javascript
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
  let t = draw()
  for (const value of t) {
    console.log(value)
  }
```

这样写 不好的点在于，你一下子就把人全部列出来了，而且使用了三个循环，浪费性能，我们采用`Generator`来改写一下

```javascript
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
let t = draw()
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
console.log(t.next().value)
 ```
 这么改造的话就可以一个一个的把人给抽出来，且没有用3个for循环  
 
2. 斐波那契数列

传统递归
```javascript
{
  function Fibonacci (n) {
    let res
    if (n === 1 || n === 2) {
      return res = 1
    }
    return Fibonacci(n - 2) + Fibonacci(n - 1)
  }
  console.log(Fibonacci(10))
}
```

改造
```javascript
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
  let o = Fibonacci(10)
  let res
  const result = []
  while (!(res = o.next()).done) {
    result.push(res.value)
  }
  console.log(result)
 ```

# 总结
Generator拥有断言的作用，可以使函数停下来，配合可迭代协议iterator可以自定义一个可遍历的数据结构