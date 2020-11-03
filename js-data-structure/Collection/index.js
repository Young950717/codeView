/**
 * @description 集合类
 * @author Young
 */

class Collcetion {
    constructor() {
        this.item = {}
    }
    set (data) {
        if (!this.has(data)) {
            this.item[data] = data
            return this
        }
        // 不允许重复
        return false
    }
    remove (data) {
        if (!this.has(data)) {
            return false
        }
        let _data = this.item[data]
        delete this.item[data]
        return _data
    }
    has (data) {
        return Reflect.has(this.item, data)
    }
    clear () {
        this.item = {}
    }
    getSize () {
        return Object.keys(this.item).length
    }
    getValues () {
        return Object.values(this.item)
    }
    _typeCheck (target) {
        if (!(target instanceof Collcetion)) throw ('typeof error')
    }
    // 并集
    union (otherCollection) {
        this._typeCheck(otherCollection)
        let newCollcetion = new Collcetion()
        this.getValues().concat(otherCollection.getValues()).forEach(data => {
            newCollcetion.set(data)
        })
        return newCollcetion

    }
    // 交集
    intersection (otherCollection) {
        this._typeCheck(otherCollection)
        let newCollcetion = new Collcetion()
        this.getValues().concat(otherCollection.getValues()).forEach(data => {
            if (this.has(data) && otherCollection.has(data))
                newCollcetion.set(data)
        })
        return newCollcetion
    }

    // 差集
    difference (otherCollection) {
        this._typeCheck(otherCollection)
        let newCollcetion = new Collcetion()
        this.getValues().concat(otherCollection.getValues()).forEach(data => {
            if (this.has(data) && !otherCollection.has(data))
                newCollcetion.set(data)
        })
        return newCollcetion
    }
    // 子集
    isSubCollection (otherCollection) {
        this._typeCheck(otherCollection)
        if (this.getSize() > otherCollection.getSize()) return false
        let arr = otherCollection.getValues()
        for (let i = 0; i < arr.length; i++) {
            if (!otherCollection.has(arr[i])) {
                return false
            }
        }
        return true

    }
}

let c1 = new Collcetion()
let c2 = new Collcetion()
c1
    .set(1)
    .set(2)
    .set(3)
    .set(4)
c2.set(4)
    .set(3)
    .set(2)
    .set(1)
    .set(5)
console.log(c1.isSubCollection(c2));