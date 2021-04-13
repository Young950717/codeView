/**
 * @description 队列类 FIFO 采用数组结构来模拟队列，原生api有提供队列的方法
 * @author Young
 */

class Queue {
    constructor() {
        this.item = []
    }
    enqueue(data) {
        this.item.push(data)
        return this
    }
    dequeue() {
        return this.item.shift()
    }
    front() {
        return this.item[0]
    }
    size() {
        return this.item.length
    }
    isEmpty() {
        return this.item.length === 0
    }
    toString() {
        return this.item.toString()
    }
}


const passGame = function (list, num) {
    const queue = new Queue()
    list.forEach(item => {
        queue.enqueue(item)
    })

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }
    return queue.dequeue()
}
// console.log(passGame(['John', 'Jack', 'Camila', 'Ingrid', 'Carl'], 7))

module.exports = Queue
