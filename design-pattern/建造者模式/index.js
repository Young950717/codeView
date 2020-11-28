/**
 * @description 建造者模式
 * 对比与工厂模式，建造者模式更关注的是制作的过程
 * 建造者模式将产品装配的算法和具体部件的实现分离
 * @author Young
 */
// es6+链式调用。过程更加一目了然
{
    class CarBuilder {
        constructor({ color = 'white', weight = 0 }) {
            this.color = color
            this.weight = weight
        }
        // 生产部件，轮胎 
        buildTyre (type) {
            const tyre = {}
            switch (type) {
                case 'small':
                    tyre.tyreType = '小号轮胎'
                    tyre.tyreIntro = '正在使用小号轮胎'
                    break
                case 'normal':
                    tyre.tyreType = '中号轮胎'
                    tyre.tyreIntro = '正在使用中号轮胎'
                    break
                case 'big':
                    tyre.tyreType = '大号轮胎'
                    tyre.tyreIntro = '正在使用大号轮胎'
                    break
            }
            this.tyre = tyre
            return this
        }
        // 生产部件，发动机
        buildEngine (type) {
            const engine = {}
            switch (type) {
                case 'small':
                    engine.engineType = '小马力发动机'
                    engine.engineIntro = '正在使用小马力发动机'
                    break
                case 'normal':
                    engine.engineType = '中马力发动机'
                    engine.engineIntro = '正在使用中马力发动机'
                    break
                case 'big':
                    engine.engineType = '大马力发动机'
                    engine.engineIntro = '正在使用大马力发动机'
                    break
            }
            this.engine = engine
            return this
        }
    }
    // 汽车装配，获得产品实例
    const benZ = new CarBuilder({ color: 'black', weight: '3200kg' })
        .buildTyre('small')
        .buildEngine('big')
    console.log(benZ)
}
// 通用实现方法
{
    // 建造者，部件生产
    class ProductBuilder {
        constructor(param) {
            this.param = param
        }

        // 生产部件，part1 
        buildPart1 () {
            // ... Part1 生产过程
            this.part1 = 'part1'

        }

        // 生产部件，part2 
        buildPart2 () {
            // ... Part2 生产过程
            this.part2 = 'part2'
        }
    }

    // 指挥者，负责最终产品的装配 
    class Director {
        constructor(param) {
            const _product = new ProductBuilder(param)
            _product.buildPart1()
            _product.buildPart2()
            return _product
        }
    }
}