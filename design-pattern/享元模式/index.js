/**
 * @description 享元模式 （Flyweight Pattern）运用共享技术来有效地支持大量细粒度对象的复用，以减少创建的对象的数量
 * 享元模式的优点：
 *   由于减少了系统中的对象数量，提高了程序运行效率和性能，精简了内存占用，加快运行速度；
 *   外部状态相对独立，不会影响到内部状态，所以享元对象能够在不同的环境被共享；
 * 享元模式的缺点：
 *   引入了共享对象，使对象结构变得复杂；
 *   共享对象的创建、销毁等需要维护，带来额外的复杂度（如果需要把共享对象维护起来的话）；
 * @author Young
 */

// demo1 模拟考驾照的情况
{
    let candidateNum = 100 // 考生数量
    let examCarNum = 0 // 考试车数量

    function ExamCar (carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '手动挡' : '自动挡'
    }
    ExamCar.prototype.exam = function (candidateId) {
        console.log('考生' + candidateId + '在' + this.carType + '驾考车' + this.carId + '上考试')
    }
    // for (let candidateId = 1; candidateId <= candidateNum; candidateId++) {
    //     const examCar = new ExamCar(candidateId % 2)
    //     examCar.exam(candidateId)
    // }
    // console.log('考试车一共' + examCarNum + '部')
}

/* 
  demo2 上面的例子，如果有多少考生就要准备多少部车的话，要是有一万个考生一百万个考生，考场早就炸了
  改进:
*/
{
    let candidateNum = 100 // 考生数量
    let examCarNum = 0 // 考试车数量

    function ExamCar (carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '手动挡' : '自动挡'
    }
    ExamCar.prototype.exam = function (candidateId) {
        console.log('考生' + candidateId + '在' + this.carType + '驾考车' + this.carId + '上考试')
    }
    const manualExamCar = new ExamCar(1)
    const autoExamCar = new ExamCar(0)
    // for (let candidateId = 1; candidateId <= candidateNum; candidateId++) {
    //     const examCar = candidateId % 2 ? manualExamCar : autoExamCar
    //     examCar.exam(candidateId)
    // }
    // console.log('考试车一共' + examCarNum + '部')
    // 改进后总共的考车只有两部，大大缩减内存
}

// demo3 改进版的考驾照，新增车的占用事件，以及每个考生的考试时间
{
    let examCarNum = 0 // 考试车数量
    class ExamCar {
        constructor(carType) {
            examCarNum++
            this.carId = examCarNum
            this.carType = carType ? '手动挡' : '自动挡'
            this.usingState = false // 是否正在使用
        }
        exam (candidateId) {
            return new Promise(reslove => {
                this.usingState = true // 车被占用
                console.log('考生' + candidateId + '在' + this.carType + '驾考车' + this.carId + '上考试')
                setTimeout(() => {
                    this.usingState = false // 用完车了
                    console.log(`%c考生${candidateId}在${this.carType}驾考车${this.carId}上考试完毕`, 'color:#f40')
                    reslove()
                }, Math.random() * 2000) // 设定0-2秒内考完试，就把车腾出来
            })
        }
    }
    // 资源池
    class ExamCarPool {
        constructor() {
            this._pool = [] //考试的车辆
            this._candidateQueue = [] // 考试学生队列
        }
        // 注册考试的车
        initExamCar (carNum) {
            let count = 1
            while (count++ <= carNum) {
                this._pool.push(new ExamCar(count % 2))
            }
        }
        // 注册考生
        registCandidates (candidateList) {
            candidateList.forEach(candidateId => this.registCandidate(candidateId))
        }
        registCandidate (candidateId) {
            // 找一部没有被使用的车
            const examCar = this.getexamCar()
            if (examCar) { // 有就考试
                examCar.exam(candidateId).then(() => {
                    const nextCandidateId = this._candidateQueue.length && this._candidateQueue.shift()
                    nextCandidateId && this.registCandidate(nextCandidateId)
                })
            } else {
                // 无则进队列等待
                this._candidateQueue.push(candidateId)
            }

        }
        getexamCar () {
            return this._pool.find(car => !car.usingState)
        }
    }
    let examCarPool = new ExamCarPool()
    examCarPool.initExamCar(3)
    examCarPool.registCandidates([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
}
