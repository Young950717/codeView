# Reflect 反射
**MDN定义**  
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。Reflect不是一个函数对象，因此它是不可构造的。  

**理解它**  
在`java`中，反射的含义就是编译/静态扫描阶段不知道哪类被加载，只有在调用的时候才被执行  
大部分`Object`的静态方法，比如`defineProperty`, `getPrototypeOf`这些都迁移到这里来了  
命令式变成 => `函数式编程`

**兼容性**  
IE不兼容

# 关于使用它
由于它不可以被`new`，所以直接使用它的静态方法
```javascript
  // 13个静态方法
  Reflect.apply(target, thisArg, args) // 同apply用法
  Reflect.construct(target, args) //new一个对象的另一种写法
  Reflect.get(target, name, receiver) // 获取一个对象上的一个值
  Reflect.set(target, name, value, receiver) // 设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true
  Reflect.defineProperty(target, name, desc) // 同Object.defineProperty 返回值不同
  Reflect.deleteProperty(target, name) // 作为函数的delete操作符，相当于执行 delete target[name]。
  Reflect.has(target, name) // 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同
  Reflect.ownKeys(target) // 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
  Reflect.isExtensible(target) // 类似于 Object.isExtensible().判断一个对象是否可拓展的
  Reflect.preventExtensions(target) // 类似于 Object.preventExtensions()。阻止新属性添加到对象。返回一个Boolean
  Reflect.getOwnPropertyDescriptor(target, name) // 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符,  否则返回 undefined.
  Reflect.getPrototypeOf(target) // 类似于 Object.getPrototypeOf() 返回指定对象的原型
  Reflect.setPrototypeOf(target, prototype) // 设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true。
 ```

 ## Examples
 ### Reflect.apply
* demo1
```javascript
  let price = 10.2
  // es5写法
  console.log(Math.floor.apply(null, [price])) // => 10
  // 使用Reflect
  console.log(Reflect.apply(Math.floor, null, [price])) // => 10
```
* demo2 上面那个例子看不出有啥实际作用，来看这个例子
```javascript
  // 假设price大于10我们就向下取整，如果小于10就向上取整
  let price = 12.3
  // es5写法
  if (price > 10) {
    console.log(Math.floor.apply(null, [price]))
  } else {
    console.log(Math.ceil.apply(null, [price]))
  }
  // 使用Reflect
  console.log(Reflect.apply(price > 10 ? Math.floor : Math.ceil, null, [price]))
 ```

 ### Reflect.has VS in 运算法
```javascript
  let object = {}
  console.log('key' in object)
  console.log(Reflect.has(object, 'key'))
```

### defineProperty
```javascript
  // 修改了某些返回值 defineProperty
  const student = {}
  const oRes = Object.defineProperty(student, 'name', { value: 'young' })  //=> return student对象
  const rRes = Reflect.defineProperty(student, 'age', { value: '18' }) //=> return true
  console.log(student, oRes, rRes)
 ```
 还有更多的静态方法小伙伴们可以逐个逐个自行玩耍~
 # 总结
 总的来说，Object上的`静态方法`Reflect都有，而Reflect有的Object不一定有，更重要的是，改变了`命令式`的书写习惯，更向`函数式编程`靠拢