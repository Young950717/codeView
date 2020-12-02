function myNew (ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new Error('ctor is not a function')
  }
  let obj = {} //1. 创建一个对象
  obj.__proto__ = Object.create(ctor.prototype)
  ctor.apply(obj, args) // 调用父类构造函数
  return obj
}

function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.eat = function () {
  console.log('eat')
}

// class Person {
//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
//   eat () {
//     console.log('eat')
//   }
// }
let person = new Person('young', 18)
let person2 = myNew(Person, 'young2', 19)
console.log(person)
console.log(person2)