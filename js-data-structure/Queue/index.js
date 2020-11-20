/**
 * @description 队列类 FIFO 采用数组结构来模拟队列，原生api有提供队列的方法
 * @author Young
 */

class Queue {
    constructor() {
        this.item = []
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
    size () {
        return this.item.length
    }
    isEmpty () {
        return this.item.length === 0
    }
    toString () {
        return this.item.toString()
    }
}
module.exports = Queue
