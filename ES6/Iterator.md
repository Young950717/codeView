# Iterator 可迭代器
# MDN定义
Iterator 函数返回一个对象，它实现了遗留的迭代协议，并且迭代了一个对象的可枚举属性。  
* 自己的话  
处理集合中的每个项是很常见的操作。JavaScript 提供了许多迭代集合的方法，从简单的for循环到map()和filter()。迭代器和生成器将迭代的概念直接带入核心语言，并提供了一种机制来自定义for…of循环的行为。

# 引用
在认识Iterator之前，先举个例子  
假设我们从后台返回拿到一些数据
```javascript
const ajaxData = {
  allGames: {
    moba: ['lol', '梦三国', 'dota', '风暴英雄'],
    fps: ['csgo', 'pubg', '堡垒之夜'],
    role: ['梦幻西游', '大话西游', '水浒q传']
  },
  allSingers: 'none of my bussiness'
}
 ```
 但是你只想要allGames里面的数据，且需要把它变成一个数组，而不是现在的三个，那么我们有哪几种做法呢
## 强撸 缺点: `不够优雅`
 ```javascript
let res = []
res = res.concat(ajaxData.allGames.moba).concat(ajaxData.allGames.fps).concat(ajaxData.allGames.role)
console.log(res)
 ```
 或者
 ```javascript
let res = []
for(let key in ajaxData.allGames) {
  res = res.concat(ajaxData.allGames[key])
}
console.log(res)
  ```
## 使用自定义迭代器  

我们都知道遍历一个数组的时候我们可以使用for...of的方法，那么我们可以不可以用同样的写法来去遍历我们自定义的数据结构呢，答案就是我们的Iterator  
### 可迭代协议与迭代器协议

再写代码之前先要了解这两个东西  
`迭代器协议`就是返回一个对象，这个对象包含一个无参数的函数next，且这个next函数返回一个对象，里面有done和value属性，done代表遍历是否结束，value表示返回当前遍历的值  
```javascript
return {
  next() {
    done: boolean,
    value: any
  }
}
```
`可迭代协议`允许 JavaScript 对象去定义或定制它们的迭代行为, 例如（定义）在一个 for…of 结构中什么值可以被循环（得到）。一些内置类型都是内置的可迭代类型并且有默认的迭代行为, 比如 `Array` or`Map`, 另一些类型则不是 (比如Object) 。为了变成可迭代对象， 一个对象必须实现 `iterator`方法, 意思是这个对象（或者它原型链上的某个对象）必须有一个名字是`Symbol.iterator`的属性

### 实现
```javascript
ajaxData[Symbol.iterator] = function () {
  let allGames = this.allGames
  let keys = Reflect.ownKeys(allGames)
  let values = []
  return {
    next () {
      if (!values.length) {
        if (keys.length) {
          values = allGames[keys[0]]
          keys.shift()
        }
      }
      return {
        done: !values.length,
        value: values.shift()
      }
    }
  }
}
let res = []
for (let v of ajaxData) {
  res.push(v)
}
console.log(res)
```
这样我们就可以使用for...of的方法去遍历我们的自定义对象结构了  
### 另一种写法
眼尖的小伙伴是不是发现了return出来的对象很像我们的`Generator`实例返回的结构，没错，我们也可以使用`Generator`去改写里面的逻辑
```javascript
ajaxData[Symbol.iterator] = function* () {
  let allGames = this.allGames
  let keys = Reflect.ownKeys(allGames)
  let values = []
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allGames[keys[0]]
        keys.shift()
        yield values.shift()
      } else {
        return false
      }
    } else {
      yield values.shift()
    }
  }
}
```
这种写法的优点就是可以不需要手动返回迭代器协议需要的返回值，交给Generator去实现