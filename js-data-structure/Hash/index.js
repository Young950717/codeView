
/**
 * @description 哈希表类
 * @author Young
 */
const EXPANSION_PROPORTION = 0.75 // 扩容比例
const DECREASE_PROPORTION = 0.25 // 减容比例
const CARDINAL_NUMBER = 2 //扩/减容基数

class HashMap {
    constructor() {
        this.storage = [] // 容器
        this.size = 0 // 数量
        this.limit = 7 //默认7
        this.isEmpty = this.size === 0
    }
    /**
     * 哈希函数
     * @param {string} str 要转化成比较大的数组的字符串
     * @param {number} size 将大的数字hashCode压缩到数组大小范围内
     */
    hashFunc(str, size) {
        let hashCode = 0
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode % size
    }
    insert(key, value) {
        // 取下标
        let index = this.hashFunc(key, this.limit)
        // 寻找有没有这个桶数组
        let bucket = this.storage[index]
        if (!bucket) {
            // 为空开辟新的桶数组
            bucket = []
            this.storage[index] = bucket
        }
        // 判断是新增还是修改原来的值.
        let override = false
        // 遍历里面的值是否需要被修改
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value
                override = true
                break
            }
        }
        if (!override) {
            bucket.push([key, value])
            this.size++
        }
        this.isEmpty = this.size === 0
        // 自动扩容
        if (this.size / this.limit > EXPANSION_PROPORTION) {
            this._resize(this.getPrime(this.limit * CARDINAL_NUMBER)) //两倍扩容
        }
    }
    get(key) {
        // 下标
        let index = this.hashFunc(key, this.limit)
        // 取桶
        let bucket = this.storage[index]
        if (!bucket) return 'key不存在'
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1]
            }
        }
    }
    remove(key) {
        // 下标
        let index = this.hashFunc(key, this.limit)
        // 取桶
        let bucket = this.storage[index]
        if (!bucket) return 'key不存在'
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                let temp = bucket[i][1]
                bucket.splice(i, 1)
                this.size--
                this.isEmpty = this.size === 0
                // 自动减容
                if (this.limit > 7 && this.size / this.limit < DECREASE_PROPORTION) {
                    this._resize(this.getPrime(this.limit / CARDINAL_NUMBER))
                }
                return temp[1] //返回删除的value
            }
        }
    }
    _resize(newLimit) {
        // 保存一份旧数据
        let oldStorage = this.storage
        // reset
        this.storage = []
        this.size = 0
        this.limit = newLimit

        // 遍历 重新塞数据进去
        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i]
            if (!bucket) continue
            for (let j = 0; j < bucket.length; j++) {
                this.insert(bucket[j][0], bucket[j][1])
            }
        }
    }
    _isPrime(num) {
        let temp = Math.ceil(Math.sqrt(num))
        for (let i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }
    // limit尽量是质数
    getPrime(num) {
        while (!this._isPrime(num)) {
            num++
        }
        return num
    }
}
let hash = new HashMap()
hash.insert('key0', 1)
hash.insert('key1', 2)
hash.insert('key1', 6)
hash.insert('key0', 999)
// hash.insert('key2', 3)
hash.insert('key3', 4)
// hash.insert('key4', 5)
// hash.insert('key5', 6)
// hash.insert('key6', 7)
// hash.insert('key7', 8)
// hash.insert('key8', 9)
// hash.insert('key9', 10)
// hash.insert('key10', 11)
// hash.insert('key11', 12)
// hash.insert('key12', 12)
// hash.remove('key9')
console.log(hash)
