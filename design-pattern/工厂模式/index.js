
/**
 * @description 工厂模式
 * 工厂模式将对象的创建和实现分离，这带来了优点
 * 良好的封装，代码结构清晰，访问者无需知道对象的创建流程，特别是创建比较复杂的情况下
 * 扩展性优良，通过工厂方法隔离了用户和创建流程隔离，符合开放封闭原则
 * 解耦了高层逻辑和底层产品类，符合最少知识原则，不需要的就不要去交流
 * 工厂模式的缺点：带来了额外的系统复杂度，增加了抽象性
 * @author Young
 */

// 简单工厂模式 违反了开闭原则，也导致这个工厂方法变得臃肿、高耦合 es5
{
    function Restaurant (menu) {
        switch (menu) {
            case '鱼香肉丝':
                return new YuXiangRouSi()
            case '宫保鸡丁':
                return new GongBaoJiDing()
            default:
                throw new Error('没有这个菜')
        }
    }
    function YuXiangRouSi () {
        this.type = '鱼香肉丝'
        console.log('鱼香肉丝制作中...')
    }
    YuXiangRouSi.prototype.eat = function () {
        console.log(this.type + '好吃')
    }
    function GongBaoJiDing () {
        this.type = '宫保鸡丁'
        console.log('宫保鸡丁制作中...')
    }
    GongBaoJiDing.prototype.eat = function () {
        console.log(this.type + '很好吃啊')
    }
    // const dish = new Restaurant('鱼香肉丝')
    // dish.eat()
    // const dish2 = new Restaurant('宫保鸡丁')
    // dish2.eat()
    // const dish3 = new Restaurant('地三鲜')
    // dish3.eat()
}
// 简单工厂模式es6改造
{
    class Restaurant {
        static getMenu (menu) {
            switch (menu) {
                case '鱼香肉丝':
                    return new YuXiangRouSi()
                case '宫保鸡丁':
                    return new GongBaoJiDing()
                default:
                    throw new Error('没有这个菜')
            }
        }
    }
    class YuXiangRouSi {
        constructor() {
            this.type = '鱼香肉丝'
            console.log('鱼香肉丝制作中...')
        }
        eat () {
            console.log(this.type + '好吃')
        }

    }
    class GongBaoJiDing {
        constructor() {
            this.type = '宫保鸡丁'
            console.log('宫保鸡丁制作中...')
        }
        eat () {
            console.log(this.type + '很好吃啊')
        }
    }
    // const dish = Restaurant.getMenu('鱼香肉丝')
    // dish.eat()
    // const dish2 = Restaurant.getMenu('宫保鸡丁')
    // dish2.eat()
    // const dish3 = Restaurant.getMenu('地三鲜')
    // dish3.eat()
}

// 优化简单工厂模式，把菜品抽出来
{
    class Restaurant {
        constructor() {
            this.menuData = {}
        }
        // 添加菜品
        addMenu (menu, type) {
            if (this.menuData[menu]) {
                console.log('已经有这个菜了')
                return
            }
            this.menuData[type] = menu
        }
        //做菜
        getMenu (menu) {
            if (!this.menuData[menu]) {
                throw new Error('没有这个菜')
            }
            return new Menu(menu)
        }
        // 移出某个菜
        removeMenu (menu) {
            if (!this.menuData[menu]) return
            delete this.menuData[menu]
        }
    }
    // 菜品功能类
    class Menu {
        constructor(type) {
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}真好吃啊`)
        }
    }
    // const restaurant = new Restaurant()
    // restaurant.addMenu('YuXiangRouSi', '鱼香肉丝')	// 注册菜品
    // restaurant.addMenu('GongBaoJiDin', '宫保鸡丁')
    // // console.log(restaurant)
    // const dish = restaurant.getMenu('鱼香肉丝')
    // dish.eat()
    // const dish2 = restaurant.getMenu('宫保鸡丁')
    // dish2.eat()
    // restaurant.addMenu('KaoYu', '烤鱼')
    // restaurant.removeMenu('宫保鸡丁')
    // const dish3 = restaurant.getMenu('烤鱼')
    // dish3.eat()
    // const dish4 = restaurant.getMenu('宫保鸡丁')
    // dish4.eat()
}