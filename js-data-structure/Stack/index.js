/**
 * @description 数组模拟栈
 * @author Young
 */

class Stack {
    constructor() {
        this.item = []
        this.size = 0
    }
    push (data) {
        this.item.push(data)
        this.size++
        return this
    }
    pop () {
        this.size--
        return this.item.pop()
    }
    peek () {
        return this.item[this.item.length - 1]
    }
    isEmpty () {
        return this.item.length === 0
    }
    toString () {
        return this.item.toString()
    }
}

module.exports = Stack