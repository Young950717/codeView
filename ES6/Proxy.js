/**
 * @description 代理函数 Proxy
 */

// 中介模式-租房子介绍
{
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
  // console.log(zhongjie.price)
  // console.log(zhongjie.home)
}

// 设置对象只读
{
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
  // console.log(d)
}


// 校验拦截 且不改变原来的数据结构
{
  // 浏览器 监听错误  node下用try catch
  // windows.addEventListener('error', e => {
  //   console.log(e.message)
  //   // 监控上报的逻辑函数
  //   // report(xxx)
  // }, true)
  let o = {
    name: 'young',
    age: 18
  }
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
        console.log(e)
      }
    }
  })
  // d.name = 'xxx'
  // d.age = 30
  // d.price = 1000
  // console.log(d)
}

// 场景模拟
// 每个组件都有自己的id，每次读取都是一样的，且不可修改
{
  /* 第一版
     问题：可以被修改
  */
  // class Component {
  //   constructor() {
  //     this.id = Math.random().toString(36).slice(-8)
  //   }
  // }
  // let com1 = new Component()
  // let com2 = new Component()
  // for (let i = 0; i < 10; i++) {
  //   console.log(com1.id, com2.id)
  // }
  // com1.id = 333
  // console.log(com1.id, com2.id)

  // 第二版 问题：不可修改，但是每次读取不一样
  // class Component {
  //   get id () {
  //     return Math.random().toString(36).slice(-8)
  //   }
  // }
  // let com1 = new Component()
  // let com2 = new Component()
  // for (let i = 0; i < 10; i++) {
  //   console.log(com1.id, com2.id)
  // }
  // com1.id = 333
  // console.log(com1.id, com2.id)

  // 正确版本
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
  // let com1 = new Component()
  // let com2 = new Component()
  // for (let i = 0; i < 10; i++) {
  //   console.log(com1.id, com2.id)
  // }
  // com1.id = 333
  // console.log(com1.id, com2.id)
}


// 可撤销的代理
{
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
  console.log(d.proxy.price)
  d.revoke() // =>销毁代理
  console.log(d.proxy.price)
}
