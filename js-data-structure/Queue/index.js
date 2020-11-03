/**
 * @description 数组模仿队列类
 * @author Young
 */

class Queue {
    constructor() {
        this.item = []
        this.size = this.item.length
    }
    enqueue (data) {
        this.item.push(data)
        return this
    }
    dequeue () {
        return this.item.shift()
    }
    front () {
        return this.item[0]
    }
    isEmpty () {
        return this.size === 0
    }
    toString () {
        return this.item.toString()
    }
}
module.exports = Queue
