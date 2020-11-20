/**
 * @description 字典类
 * @author Young
 */

class Dictionay {
    constructor() {
        this.item = {} //使用对象来模拟字典类
    }
    // 常用方法
    set (key, value) {
        this.item[key] = value
    }
    remove (key) {
        if (this.has(key)) {
            delete this.item[key]
            return true
        } else {
            return false
        }

    }
    has (key) {
        return this.item.hasOwnProperty(key)
    }
    get (key) {
        return this.item[key]
    }
    clear () {
        this.item = {}
    }
    size () {
        return Object.keys(this.item).length
    }
    keys () {
        return Object.keys(this.item)
    }
    values () {
        return Object.values(this.item)
    }
}

// 创建字典对象
// const dict = new Dictionay()

// dict.set("age", 18)
// dict.set("name", "Young")
// dict.set("height", 2.14)
// dict.set("address", "深圳")

// console.log(dict.keys())
// console.log(dict.values())
// console.log(dict.size())
// console.log(dict.get("name"))

// dict.remove("height")
// console.log(dict.keys())

// dict.clear()
module.exports = Dictionay
