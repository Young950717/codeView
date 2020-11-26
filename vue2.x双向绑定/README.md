# 前言
开启项目npm run dev 默认端口3333，可在rollup.config.js文件修改
# 源代码展示
## HTML
```html 
<body>
    <div id="app">
        <h1>{{ song }}</h1>
        <p>《{{ album.name }}》是{{ singer }}2003年7月发行的专辑</p>
        <p>
            《{{ songObj.wp }}》是一首很好听的歌哦
            <span>《{{ songObj.zzzs }}》也不错</span>
        </p>
        <p>主打歌为{{ album.theme }}</p>
        <p>作词人为{{ singer }}等等{{ singer3 }}。</p>
        <p>作词人为{{ singer2 }}等等。</p>
        我们给个人都有罪，犯着不同的罪
        <div>
            <input v-model="testModel" type="text">
        </div>
    </div>
    <!--实现的mvvm-->
    <script src="dist/md/mvvm.js"></script>
    <script>
        // 写法和Vue一样
        let mvvm = new Mvvm({
            el: '#app',
            data: {
                song: '同一种调调',
                album: {
                    name: '叶惠美',
                    theme: '以父之名'
                },
                songObj: {
                    wp: '外婆',
                    zzzs: '止战之殇'
                },
                singer: '周杰伦',
                singer2: 'jay',
                singer3: '小公举',
                testModel: '我靠'

            }
        })
        // mvvm.singer = 123
        // console.log(mvvm.singer)
    </script>
</body>
```
## js
**入口**
```javascript
function Mvvm (options = {}) {
    const vm = this
    vm.$options = options
    const data = vm._data = vm.$options.data
    // 将new Vue()里面的值都放到vm中,操作vm,不要操作传进来的对象
    Observe(data) // 劫持vm中的所有数据
    for (const key in data) { // 这一步是让取值的时候直接可以this.a能拿到this._data.a的值
        Object.defineProperty(vm, key, {
            configurable: true,
            get () {
                return vm._data[key]
            },
            set (newVal) {
                vm._data[key] = newVal
            }
        })
    }
    new Compile(options.el, vm)
}

```
**观察者**
```javascript
// 观察者构造函数
function Observe (data) {
    let dep = new Dep()
    for (const key in data) {
        let val = data[key]
        observe(val)
        Object.defineProperty(data, key, {
            configurable: true,
            get () {
                Dep.target && dep.addSub(Dep.target) // 将观察者加入dep池中
                return val
            },
            set (newVal) {
                if (newVal === val) return
                val = newVal
                observe(newVal)
                dep.notify() // 响应
            }
        })
    }
}
// 外部
function observe (data) {
    if (!data || typeof data !== 'object') return
    return new Observe(data)
}
```
**编译**
```javascript
function Compile (el, vm) {
    // 将元素挂在到vm上
    vm.$el = document.querySelector(el)
    // console.log(vm);
    // 创建文本随便，方便传输
    let fragment = document.createDocumentFragment()
    let child
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child)  // 将el中的内容放入内存中
    }
    render(fragment)  // 替换内容
    // 模板替换
    function render (frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent
            // console.log(txt);
            // 正则匹配{{ }}
            let reg = /\{\{(.*?)\}\}/g
            // console.log(node);
            // debugger
            if (node.nodeType === 3 && reg.test(txt)) {
                // 即是文本节点，也有大括号的情况
                (function replaceTxt () {
                    node.textContent = txt.replace(reg, (matched, placeholder) => {
                        // console.log(placeholder)
                        // 添加监听事件
                        new Watcher(vm, placeholder, replaceTxt => {
                            node.textContent = txt.replace(reg, replaceTxt).trim()
                        })
                        return placeholder.split('.').reduce((val, key) => {
                            key = key.trim()
                            return val[key]
                        }, vm)
                    })
                })()
            }
            if (node.nodeType === 1) { // 为元素节点
                let attrs = node.attributes
                Array.from(attrs).forEach(attr => {
                    // console.log(attr)
                    let name = attr.name
                    let exp = attr.value // testModel
                    // console.log(name + '=====', exp);
                    if (name.includes('v-model')) {
                        node.value = vm[exp]
                    }
                    new Watcher(vm, exp, newVal => {
                        node.value = newVal
                    })
                    node.addEventListener('input', (e) => {
                        let newVal = e.target.value
                        console.log(newVal)
                        vm[exp] = newVal
                    })
                })
            }
            // 如果有子节点，继续replace
            if (node.childNodes && node.childNodes.length) {
                render(node)
            }
        })
    }

    vm.$el.appendChild(fragment)   // 再将文档碎片放入el中
}
```
**订阅池 存储池**
```javascript
class Dep {
    constructor() {
        this.subs = [] // 存储订阅人
    }
    addSub (sub) {
        this.subs.push(sub)
    }
    notify () {
        // 让每个订阅者都绑定一个通知的事件
        this.subs.forEach(sub => sub.update())
    }
}
```
**观察者**
```javascript
class Watcher {
    // 传入更新的方法
    constructor(vm, exp, fn) {
        this.fn = fn
        this.vm = vm
        this.exp = exp
        Dep.target = this
        let arr = exp.split('.')
        let val = vm
        arr.forEach(key => {
            key = key.trim()
            val = val[key]
        })
        Dep.target = null
    }
    // 执行更新方法
    update () {
        // notify的时候值已经更改了
        // 再通过vm, exp来获取新的值
        let arr = this.exp.split('.')
        let val = this.vm
        arr.forEach(key => {
            key = key.trim()
            val = val[key]
        })
        this.fn(val)
    }
}
```