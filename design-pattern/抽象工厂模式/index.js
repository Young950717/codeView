/**
 * @description 抽象工厂模式 还是下馆子，把菜品类抽象出来，饭馆也可以抽象。抽象类不能被实例化，里面的方法也必须重写
 * 抽象模式的优点：抽象产品类将产品的结构抽象出来，访问者不需要知道产品的具体实现，只需要面向产品的结构编程即可，从产品的具体实现中解耦
 * 抽象模式的缺点：
 * 扩展新类簇的产品类比较困难，因为需要创建新的抽象产品类，并且还要修改工厂类，违反开闭原则
 * 带来了系统复杂度，增加了新的类，和新的继承关系
 * @author Young
 */

// demo1
{
    class Restaurant {
        static orderDish (type) {
            switch (type) {
                case '鱼香肉丝':
                    return new YuXiangRouSi()
                case '宫保鸡丁':
                    return new GongBaoJiDin()
                default:
                    throw new Error('没有这个菜')
            }
        }
    }

    class AbstractDish {
        constructor() {
            if (new.target === AbstractDish) {
                throw new Error('抽象类不能被实例化')
            }
            this.kind = '菜'
        }
        eat () {
            throw new Error('抽象类的方法不能被调用')
        }
    }

    class YuXiangRouSi extends AbstractDish {
        constructor() {
            super()
            this.type = '鱼香肉丝'
        }
        eat () {
            console.log(`这个${this.type}好好吃`)
        }
    }
    class GongBaoJiDin extends AbstractDish {
        constructor() {
            super()
            this.type = '宫保鸡丁'
        }
        eat () {
            console.log(`这个${this.type}好好吃`)
        }
    }
    // const dish1 = Restaurant.orderDish('鱼香肉丝')
    // const dish2 = Restaurant.orderDish('宫保鸡丁')
    // const dish3 = Restaurant.orderDish('宫保鸡丁2')
    // dish1.eat()
    // dish2.eat()
    // dish3.eat()
    // const dish = new AbstractDish()
}

// demo2
{
    // 抽象饭馆类
    class AbstractRestaurant {
        constructor() {
            if (new.target === AbstractRestaurant) {
                throw new Error('抽象类不能被实例化')
            }
        }
        // 抽象方法 创建菜品
        createDish () {
            throw new Error('抽象方法不能被直接调用')
        }
        // 抽象方法 创建汤
        createSoup () {
            throw new Error('抽象方法不能被直接调用')
        }
    }
    class Restaurant extends AbstractRestaurant {
        constructor() {
            super()
        }
        // 重写抽象方法
        createDish (type) {
            switch (type) {
                case '香煎小黄鱼':
                    return new XiangJianXiaoHuangYu(type)
                case '三杯鸡':
                    return new SanBeiJi(type)
                case '炸鸡翅':
                    return new ZhaJiChi(type)
                default:
                    return new EmptyFood(type)
            }
        }
        // 重写抽象方法
        createSoup (type) {
            switch (type) {
                case '忌廉汤':
                    return new JiLianTang(type)
                case '紫菜蛋花汤':
                    return new ZiCaiDanHuaTang(type)
                default:
                    return new EmptyFood(type)
            }
        }
    }
    // 抽象菜类
    class AbstractDish {
        constructor() {
            if (new.target === AbstractDish) {
                throw new Error('抽象类不能被实例化')
            }
        }
        eat () {
            throw new Error('抽象方法不能被调用')
        }
    }
    class XiangJianXiaoHuangYu extends AbstractDish {
        constructor(type) {
            super()
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}好好吃`)
        }
    }
    class SanBeiJi extends AbstractDish {
        constructor(type) {
            super()
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}好好吃`)
        }
    }
    class ZhaJiChi extends AbstractDish {
        constructor(type) {
            super()
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}好好吃`)
        }
    }
    class JiLianTang extends AbstractDish {
        constructor(type) {
            super()
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}好好喝`)
        }
    }
    class ZiCaiDanHuaTang extends AbstractDish {
        constructor(type) {
            super()
            this.type = type
        }
        eat () {
            console.log(`这个${this.type}好好喝`)
        }
    }
    class EmptyFood {
        constructor(type) {
            this.type = type
        }
        eat () {
            console.log(`这里没有你要的${this.type}，走吧`)
        }
    }


    const restaurant = new Restaurant()
    const dish1 = restaurant.createDish('香煎小黄鱼')
    dish1.eat()
    const dish2 = restaurant.createDish('三杯鸡')
    dish2.eat()
    const dish3 = restaurant.createDish('炸鸡翅')
    dish3.eat()
    const dish4 = restaurant.createDish('爆米花')
    dish4.eat()
    const suop1 = restaurant.createSoup('忌廉汤')
    suop1.eat()
    const suop2 = restaurant.createSoup('紫菜蛋花汤')
    suop2.eat()
}