/**
 * @description 二叉搜索树类
 * @author Young
 */

class BinarySearchTree {
    constructor() {
        this.root = null
    }
    insert (data) {
        let node = new BinarySearchTree.InnerNodeClass(data)
        if (this.root === null) {
            // 为空直接插入
            this.root = node
        } else {
            this._insertNode(node, this.root)
        }
    }
    _insertNode (newNode, node) {
        if (newNode.data > node.data) { // 比要父节点大
            if (node.right === null) {
                node.right = newNode
            } else {
                this._insertNode(newNode, node.right)
            }
        } else {
            if (node.left === null) {
                node.left = newNode
            } else {
                this._insertNode(newNode, node.left)
            }

        }
    }
    search (data) {
        return this._search(data, this.root)
    }
    _search (data, node) {
        if (node === null) {
            return false
        }
        if (data > node.data) { // 值大往右找
            return this._search(data, node.right)
        } else if (data < node.data) {
            return this._search(data, node.left)
        } else {
            return node
        }
    }
    // 复杂
    remove (data) {
        // 寻找要删除的节点
        let current = this.root
        let parent = null
        let isLeftChild = true

        while (current.data !== data) {
            parent = current
            if (data < current.data) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }
            if (current === null) return false
        }

        // 1.删除叶子结点(没有子节点)
        if (current.left === null && current.right === null) {
            if (current === this.root) {
                this.root = null
            } else if (isLeftChild) {
                parent.left = null
            } else {
                parent.right = null
            }
        }
        // 2.删除只有一个子节点的节点
        // 2.1左子树为null 则将父节点与cuurrent的右子树连接即可
        else if (current.left === null) {
            if (current === this.root) { // 需考虑是是否为根节点
                this.root = current.right
            } else if (isLeftChild) {
                parent.left = current.right
            } else {
                parent.right = current.right
            }
        }
        // 2.2右子树为null 则将父节点与cuurrent的左子树连接即可
        else if (current.right === null) {
            if (current === this.root) { // 同理
                this.root = current.left
            } else if (isLeftChild) {
                parent.left = current.left
            } else {
                parent.right = current.left
            }
        }
        // 3.删除只有两个个子节点的节点
        else {
            // 获取后继节点
            let succssor = this.getSuccssor(current)
            // 是否为根节点
            if (current === this.root) {
                this.root = succssor
            } else if (isLeftChild) {
                parent.left = succssor
            } else {
                parent.right = succssor
            }
            succssor.left = current.left // 后继的左子树连接要删除的节点的左子树
        }
    }
    // 寻找后继节点
    getSuccssor (delNode) {
        let succssor = delNode
        let succssorParent = delNode
        let current = delNode.right
        // 循环查找后继
        while (current !== null) {
            succssorParent = succssor
            succssor = current
            current = current.left
        }
        // 判断寻找的后继节点是否直接就是delNode的right节点
        if (succssor !== delNode.right) {
            succssorParent.left = succssor.right
            succssor.right = delNode.right
        }
        return succssor
    }

    // 中序遍历 先左子树后根节点再右子树
    inOrderTraverse (callback) {
        this._inOrderTraverseNode(this.root, callback)
    }
    _inOrderTraverseNode (node, callback) {
        if (node !== null) {
            this._preOrderTraverseNode(node.left, callback)
            callback(node)
            this._preOrderTraverseNode(node.right, callback)
        }
    }
    // 先序遍历 先根节点再左子树再右子树
    preOrderTraverse (callback) {
        this._preOrderTraverseNode(this.root, callback)
    }
    _preOrderTraverseNode (node, callback) {
        if (node !== null) {
            callback(node)
            this._preOrderTraverseNode(node.left, callback)
            this._preOrderTraverseNode(node.right, callback)
        }
    }
    // 后序遍历 先左子树再右子树再根节点
    postOrderTraverse (callback) {
        this._postOrderTraverseNode(this.root, callback)
    }
    _postOrderTraverseNode (node, callback) {
        if (node !== null) {
            this._postOrderTraverseNode(node.left, callback)
            this._postOrderTraverseNode(node.right, callback)
            callback(node)
        }
    }
    getMin () {
        let node = this.root
        while (node.left !== null) {
            node = node.left
        }
        return node.data
    }
    getMax () {
        let node = this.root
        while (node.right !== null) {
            node = node.right
        }
        return node.data
    }
}

/**
 * @description 二叉树内部节点类
 */
BinarySearchTree.InnerNodeClass = class {
    constructor(data) {
        this.left = null
        this.right = null
        this.data = data
    }
}

let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

// console.log(bst.getMax());
// console.log(bst.getMin());
bst.remove(9)
bst.remove(7)
bst.remove(15)
let str = ''
bst.postOrderTraverse(node => {
    str += `${node.data}-`
})
console.log(str);
// console.log(bst.search(11));