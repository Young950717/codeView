/**
 * @description 单例模式的几种实现方式,单例就是只有一个实例对象，就像游戏的存档
 * @author Young
 */

// 1.简单的单例模式 es5
function Game () {
    // 判断是否有实例
    if (Game._schedule) {
        return Game._schedule
    }
    Game._schedule = this
}
Game.getInstance = function () {
    if (Game._schedule) {
        return Game._schedule
    }
    return Game._schedule = new Game()
}

// const game1 = new Game()
// const game2 = Game.getInstance()
// console.log(game1 === game2)  // true

// 1.1 简单的单例模式 es6改造 缺点在于维护的实例作为静态属性直接暴露，外部可以直接修改
class singleGame {
    static _schedule = null
    constructor() {
        if (singleGame._schedule) {
            return singleGame._schedule
        }
        singleGame._schedule = this
    }
    static getInstance () {
        if (singleGame._schedule) {
            return singleGame._schedule
        }
        return singleGame._schedule = new singleGame()
    }
}

// const game3 = new singleGame()
// const game4 = singleGame.getInstance()
// console.log(game3 === game4) // true


/**
 *  2 单例模式的通用实现
 * Singleton ：特定类，这是我们需要访问的类，访问者要拿到的是它的实例
 * instance ：单例，是特定类的实例，特定类一般会提供 getInstance 方法来获取该单例
 * getInstance ：获取单例的方法，或者直接由 new 操作符获取
 **/
// 使用立即执行函数和闭包来写
const Singleton = (function () {
    let _instance = null
    const Singleton = function () {
        if (_instance) return _instance
        _instance = this
        this.init() // 初始化操作
        return _instance
    }
    Singleton.prototype.init = function () {
        console.log('init')
    }
    Singleton.getInstance = function () {
        if (_instance) return _instance
        _instance = new Singleton()
        return _instance
    }
    return Singleton
})()

// const game5 = new Singleton()
// const game6 = new Singleton()
// console.log(game5 === game6) // true

// 3.1单例模式赋能 由于上一个写法在创建单例的时候调用了init方法，耦合了，需要拆解

{
    // 功能类
    class FunClass {
        constructor(name) {
            this.name = name
            this.init()
        }
        init () {
            this.age = 18
            console.log(`my name is ${this.name}, i am ${this.age} years old`)

        }
    }
    const Singleton = (function () {
        let _instance = null
        const proxySingleton = function (name) {
            if (_instance) return _instance
            _instance = new FunClass(name)
            return _instance
        }
        proxySingleton.getInstance = function (name) {
            if (_instance) return _instance
            _instance = new Singleton(name)
            return _instance
        }
        return proxySingleton
    })()

    // const game1 = new Singleton('young')
    // const game2 = new Singleton('young2')
    // const game3 = Singleton.getInstance('young3')
    // console.log(game1 === game2) // true
    // console.log(game2 === game3) // true
    // console.log(game1 === game3) // true
}

// 3.2 es6-proxy改写
{
    // 功能类
    class FunClass {
        constructor(name) {
            this.name = name
            this.init()
        }
        init () {
            this.age = 18
            console.log(`my name is ${this.name}, i am ${this.age} years old`)

        }
    }
    function Singleton (FunClass) {
        let _instance
        return new Proxy(FunClass, {
            construct (target, args) {
                return _instance || (_instance = new FunClass(...args))
            }
        })
    }
    const PersonInstance = Singleton(FunClass)

    // const person1 = new PersonInstance('young')
    // const person2 = new PersonInstance('young2')
    // console.log(person1 === person2) // true
}

{
    /**
     * @description 惰性单例
     * 需求前提，网页打开一个新的弹窗，始终是那一个div
     * <html>
     *     <button id="btn">点击</button>
     * </html>
     */
    // 1.初始做法，页面加载时候就创建了
    {
        let createDiv = (function () {
            let div = document.createElement('div')
            div.innerHTML = '弹窗'
            div.style.display = 'none'
            document.appendChild(div)
            return div
        })()
        document.getElementById('btn').onclick = function () {
            createDiv.style.display = 'block'
        }
    }

    // 2.改进做法，点击时候div才创建
    {
        let createDiv = function () {
            let div = document.createElement('div')
            div.innerHTML = '弹窗'
            div.style.display = 'none'
            document.appendChild(div)
            return div
        }
        document.getElementById('btn').onclick = function () {
            let loginPage = createDiv()
            loginPage.style.display = 'block'
        }
    }
    {
        // 1和2的缺点是并不能实现单例，引入单例
        const getSingle = function (fn) {
            let result
            return function () {
                result || (result = fn.apply(this, arguments))
            }
        }
        let createDiv = function () {
            let div = document.createElement('div')
            div.innerHTML = '弹窗'
            div.style.display = 'none'
            document.appendChild(div)
            return div
        }
        let createSingleDiv = getSingle(createDiv)
        document.getElementById('btn').onclick = function () {
            let loginPage = createSingleDiv()
            loginPage.style.display = 'block'
        }
    }
}


