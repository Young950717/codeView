/**
 * @description 双向链表类
 * @author Young
 */

class Node {
    constructor(data) {
        this.data = data
        this.next = null
        this.prev = null
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    append (data) {
        let node = new Node(data)
        if (this.length === 0) {
            this.head = node
            this.tail = node
            this.length++
            return this
        }
        this.tail.next = node
        node.prev = this.tail
        this.tail = node
        this.length++
        return this

    }
    insert (position, data) {
        if (position < 0 || position > this.length - 1) return 'position is a invalid parameter'
        let node = new Node(data)
        let directionKey
        let current
        let prev
        let index
        if (position > this.length / 2) {
            index = 0
            position = this.length - 1 - position
            prev = this.tail
            current = prev.prev
            directionKey = 'prev'
        } else {
            index = 0
            prev = this.head
            current = prev.next
            directionKey = 'next'
        }
        while (index++ < position) {
            current = current[directionKey]
            prev = prev[directionKey]
        }
        if (directionKey === 'prev') {
            prev.prev = node
            node.next = prev
            current.next = node
            node.prev = current
        } else {
            prev.next = node
            node.prev = prev
            current.prev = node
            node.next = current
        }
        this.length++
        return this
    }
    get (position) {
        if (position < 0 || position > this.length - 1) return 'position is a invalid parameter'
        let directionKey
        let current
        let index = 0
        if (position > this.length / 2) {
            position = this.length - 1 - position
            current = this.tail
            directionKey = 'prev'
        } else {
            current = this.head
            directionKey = 'next'
        }
        while (index++ < position) {
            current = current[directionKey]
        }
        return current
    }
    set (position, data) {
        if (position === this.length) {
            this.append(data)
        }
        let node = this.get(position)
        node.data = data
        return true
    }
    indexOf (data) {
        let current = this.head
        let index = 0
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }
    remove (data) {
        let index = this.indexOf(data)
        return this.removeAt(index)
    }
    removeAt (position) {
        if (position < 0 || position > this.length - 1) return 'position is a invalid parameter'
        let directionKey
        let current
        let prev
        let index = 0
        if (position > this.length / 2) {
            directionKey = 'prev'
            position = this.length - 1 - position
            current = this.tail
            prev = current[directionKey]

        } else {
            directionKey = 'next'
            prev = this.head
            current = prev[directionKey]
        }
        while (index++ < position) {
            current = current[directionKey]
            prev = prev[directionKey]
        }
        return current
    }
    toString () {
        let str = 'head=>'
        let current = this.head
        while (current) {
            str = str + current.data + '=>'
            current = current.next
        }
        return str
    }
}

let dl = new DoublyLinkedList()
dl.append(1).append(2).append(3).append(4).append(5).append(6).append(7).append(8).append(9).append(10)
// dl.set(5, 999)
dl.insert(8, 'xxx')
console.log(dl.toString())

module.exports = DoublyLinkedList