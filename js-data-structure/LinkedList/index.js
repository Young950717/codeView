/**
 * @description 单项链表类 使用伪指针来模拟单向链表
 * @author Young
 */

class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }
    append (data) {
        let node = new Node(data)
        // 若长度为0 直接让头指针指向该节点
        if (this.length === 0) {
            this.head = node
        } else {
            // 链式查找到最后一个
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
        return this
    }
    insert (position, data) {
        if (position < 0 || position > this.length) return 'invalid parameter'
        let node = new Node(data)
        // 排除首尾
        if (position === 0) {
            node.next = this.head
            this.head = node
            return true
        }
        if (position === this.length) {
            this.append(data)
            return true
        }
        // 双指针
        let prev = this.head
        let current = prev.next
        let index = 1
        while (index++ < position) {
            current = current.next
            prev = prev.next
        }
        prev.next = node
        node.next = current
        return true

    }
    get (position) {
        if (position < 0 || position > this.length - 1) return 'invalid parameter'
        let current = this.head
        let count = 0
        while (position > count++) {
            current = current.next
        }
        return current
    }
    set (position, data) {
        let node = this.get(position)
        node.data = data
        return true
    }
    indexOf (data) {
        if (this.head === null) return -1
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
        if (position < 0 || position > this.length - 1) return 'invalid parameter'
        this.length--
        if (position === 0) {
            this.head = this.head.next
            return true
        } else {
            let prev = this.get(position - 1)
            prev.next = prev.next.next
            return true
        }

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
// let t = new LinkedList()
// t.append(1).append(2).append(3).append(4).append(5)
// t.set('333', 1)
// t.insert(4, 6)
// console.log(t.toString())
module.exports = LinkedList