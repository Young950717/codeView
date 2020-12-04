# Proxy 代理
**MDN定义**  
Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。  

**理解它**  
Proxy作为es6新增加的内置对象，以及强大的代理功能，使得开发者们对它爱不释手，说到代理，生活中最常见的代理就是下馆子吃饭，你不会跑去厨房和师傅说，来一盘回锅肉，一叠炒米线，而和服务员说这些话，服务员帮你去传达这个意思，以及帮你把菜给端过来

**兼容性**  
IE不兼容

# 关于使用它
Proxy是一个内置的构造函数，他接受两个参数，一个是`target` 需要被代理的对象。另一个是`handler` 个人理解为操作器  
```javascript
  // Proxy 支持的拦截操作
  get(target, propKey, receiver) // 拦截对象属性的读取，比如proxy.foo和proxy['foo']。
  set(target, propKey, value, receiver) // 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
  has(target, propKey) // 拦截propKey in proxy的操作，返回一个布尔值。
  deleteProperty(target, propKey) // 拦截delete proxy[propKey]的操作，返回一个布尔值。
  ownKeys(target) // 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for... in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
  getOwnPropertyDescriptor(target, propKey) // 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
  defineProperty(target, propKey, propDesc) // 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.  defineProperties(proxy, propDescs) // 返回一个布尔值。
  preventExtensions(target) // 拦截Object.preventExtensions(proxy)，返回一个布尔值。
  getPrototypeOf(target) // 拦截Object.getPrototypeOf(proxy)，返回一个对象。
  isExtensible(target) // 拦截Object.isExtensible(proxy)，返回一个布尔值。
  setPrototypeOf(target, proto) // 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额  外操作可以拦截。
  apply(target, object, args) // 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy. apply(...)。
  construct(target, args) // 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 ```
  ## Examples
  ### 普通的拦截
```javascript
  let fangdong = {
    home: {
      price: 200,
      message: '三室一厅'
    }
  }
  let zhongjie = new Proxy(fangdong, {
    get (target, key) {
      if (key === 'price') {
        return target['home'][key] + 20
      } else {
        return '不告诉你'
      }
    }
  })
  console.log(zhongjie.price)  // => 220
  console.log(zhongjie.home.message) // => '不告诉你'
```
### 设置对象只读
```javascript
 let fangdong = {
    price: 200,
    name: 'xxx'
  }
  // Object.freeze(fangdong)
  let d = new Proxy(fangdong, {
    get (target, key) {
      return target[key]
    },
    set (target, key, value) {
      return false
    }
  })
  d.name = 'yyy'
  console.log(d.name) // => 'xxx'
 ```
 ### 校验拦截 
 利用proxy校验拦截上报。且不改变原来的数据结构
 ```javascript
  let o = {
    name: 'young',
    age: 18
  }
  // 抽离校验
  const validator = (target, key, value) => {
    if (Reflect.has(target, key)) {
      if (key === 'age') {
        if (value > 25) {
          // 如要监控违规操作的话，直接抛出错误
          throw new TypeError('xxxxx')
          // return false
        } else {
          target[key] = value
        }
      } else {
        target[key] = value
      }
    } else {
      return false
    }
  }
  let d = new Proxy(o, {
    get (target, key) {
      return target[key] || ''
    },
    set (target, key, value) {
      try {
        validator(target, key, value)
      } catch (e) {
        // 此处可以添加上报的方法
        console.log(e)
      }
    }
  })
  d.name = 'xxx'
  d.age = 30 // 制造错误
  d.price = 1000
  console.log(d)
  ```

  ### 组件id场景
场景模拟：每个组件都有自己的id，每次读取都是一样的，且不可修改
```javascript
class Component {
  constructor() {
    this.id = Math.random().toString(36).slice(-8)
  }
}
let com1 = new Component()
let com2 = new Component()
for (let i = 0; i < 10; i++) {
  console.log(com1.id, com2.id)
}
com1.id = 333
console.log(com1.id, com2.id)  // => 问题：可以被修改
 ```
 * 改进
```javascript
class Component {
  constructor() {
    this.proxy = new Proxy({
      id: Math.random().toString(36).slice(-8)
    }, {})
  }
  get id () {
    return this.proxy.id
  }
}
let com1 = new Component()
let com2 = new Component()
for (let i = 0; i < 10; i++) {
  console.log(com1.id, com2.id)
}
com1.id = 333
console.log(com1.id, com2.id)
```
  ### 可撤销
  另外Proxy还提供了可撤销的方法，使用Proxy的静态方法`revocable`
```javascript
let o = {
  price: 200,
  name: 'xxx'
}
let d = Proxy.revocable(o, {
  get (target, key) {
    if (key === 'price') {
      return target[key] + 20
    } else {
      return target[key]
    }
  }
})
console.log(d.proxy.price) // => 200 
d.revoke() // =>销毁代理
console.log(d.proxy.price) // => 报错
```

# 总结
Proxy的功能非常强大，值得大家在平时的业务代码中使用，vue3.x也是使用了Proxy代替了以往Object.defineProperty去进行数据劫持