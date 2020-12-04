/**
 * @description Reflect 反射机制
 * 在java中，反射的含义就是编译/静态扫描阶段不知道哪类被加载，只有在调用的时候才被执行
 * IE不兼容
 */
/*
  13个静态方法
  Reflect.apply(target, thisArg, args)
  Reflect.construct(target, args)
  Reflect.get(target, name, receiver)
  Reflect.set(target, name, value, receiver)
  Reflect.defineProperty(target, name, desc)
  Reflect.deleteProperty(target, name)
  Reflect.has(target, name)
  Reflect.ownKeys(target)
  Reflect.isExtensible(target)
  Reflect.preventExtensions(target)
  Reflect.getOwnPropertyDescriptor(target, name)
  Reflect.getPrototypeOf(target)
  Reflect.setPrototypeOf(target, prototype)
*/

{
  // Reflect是一个内置类，不能被实例化，直接使用它的静态方法，我们以apply为例子，对一个数向下取整
  let price = 10.2
  // es5写法
  console.log(Math.floor.apply(null, [price]))
  // 使用Reflect
  console.log(Reflect.apply(Math.floor, null, [price]))
}
{
  // 上面那个例子看不出有啥实际作用，来看这个例子R
  //1. 还是用apply来举例子，假设price大于10我们就向下取整，如果小于10就向上取整
  let price = 12.3
  // es5写法
  if (price > 10) {
    console.log(Math.floor.apply(null, [price]))
  } else {
    console.log(Math.ceil.apply(null, [price]))
  }
  // 使用Reflect
  console.log(Reflect.apply(price > 10 ? Math.floor : Math.ceil, null, [price]))
}

{
  // 命令式 => 函数式
  let object = {}
  console.log('key' in object)
  Reflect.has(object, 'key')
}

{
  // 修改了某些返回值 defineProperty
  const student = {}
  const oRes = Object.defineProperty(student, 'name', { value: 'young' })  //=> return student对象
  const rRes = Reflect.defineProperty(student, 'age', { value: '18' }) //=> return true
  console.log(student, oRes, rRes)
}