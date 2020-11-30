/**
 * @description 常见的代理模式 以es5 defineProperty和es6 proxy举例
 * @author Young
 */

// demo1 请明星拍广告
{
    const SuperStar = {
        name: 'jayChou',
        playAdvertisement (ad) {
            console.log(ad)
        }
    }
    const ProxyAssistant = {
        name: '大妮',
        playAdvertisement (reward, ad) {
            if (reward > 100) {
                console.log(`我们家${SuperStar.name}最喜欢拍奶茶广告了`)
                SuperStar.playAdvertisement(ad)
            } else {
                console.log('他很忙，你不配')
            }
        }
    }
    // ProxyAssistant.playAdvertisement(50, '酸酸甜甜就是我')
    // ProxyAssistant.playAdvertisement(101, '奶茶真好喝！ 吨吨吨')
}
// demo2 promise添加异步操作
{
    const SuperStar = {
        name: 'jayChou',
        playAdvertisement (ad) {
            console.log(ad)
        }
    }
    const ProxyAssistant = {
        name: '大妮',
        scheduleTime () {
            return new Promise((reslove, reject) => {
                setTimeout(() => {
                    reslove()
                }, 2000)
            })
        },
        playAdvertisement (reward, ad) {
            if (reward > 100) {
                console.log(`我们家${SuperStar.name}最喜欢拍奶茶广告了，但是他现在没档期，等会`)
                ProxyAssistant.scheduleTime().then(() => {
                    console.log('现在有空了')
                    SuperStar.playAdvertisement(ad)
                })
            } else {
                console.log('他很忙，你不配')
            }
        }
    }
    // ProxyAssistant.playAdvertisement(50, '酸酸甜甜就是我')
    // ProxyAssistant.playAdvertisement(101, '奶茶真好喝！ 吨吨吨')
}

// demo3 es5 Object.defineProperty
{
    const SuperStar = {
        name: 'jayChou',
        scheduleFlagActually: false, //档期标识符
        playAdvertisement (ad) {
            console.log(ad)
        }
    }
    const ProxyAssistant = {
        name: '大妮',
        scheduleTime (ad) {
            Object.defineProperty(SuperStar, 'scheduleFlag', {
                get () {
                    return SuperStar.scheduleFlagActually
                },
                set (val) {
                    if (!SuperStar.scheduleFlagActually && val) {
                        SuperStar.scheduleFlagActually = true
                        SuperStar.playAdvertisement(ad)
                    }
                }
            })
            setTimeout(() => {
                console.log('有空了')
                SuperStar.scheduleFlag = true  // 修改档期
            }, 2000)
        },
        playAdvertisement (reward, ad) {
            if (reward > 100) {
                console.log(`我们家${SuperStar.name}最喜欢拍奶茶广告了，但是他现在没档期，等会`)
                ProxyAssistant.scheduleTime(ad)
            } else {
                console.log('他很忙，你不配')
            }
        }
    }
    // ProxyAssistant.playAdvertisement(50, '酸酸甜甜就是我')
    // ProxyAssistant.playAdvertisement(101, '奶茶真好喝！ 吨吨吨')
}

// demo4 改用proxy
{
    const SuperStar = {
        name: 'jayChou',
        scheduleFlagActually: false, //档期标识符
        playAdvertisement (ad) {
            console.log(ad)
        }
    }
    const ProxyAssistant = {
        name: '大妮',
        scheduleTime (ad) {
            const schedule = new Proxy(SuperStar, {
                set (target, prop, val) {
                    if (prop !== 'scheduleFlag') return
                    if (!target.scheduleFlagActually && val) {
                        target.scheduleFlagActually = true
                        target.playAdvertisement(ad)
                    }
                }
            })
            setTimeout(() => {
                console.log('有空了')
                schedule.scheduleFlag = true  // 修改档期
            }, 2000)
        },
        playAdvertisement (reward, ad) {
            if (reward > 100) {
                console.log(`我们家${SuperStar.name}最喜欢拍奶茶广告了，但是他现在没档期，等会`)
                ProxyAssistant.scheduleTime(ad)
            } else {
                console.log('他很忙，你不配')
            }
        }
    }
    ProxyAssistant.playAdvertisement(50, '酸酸甜甜就是我')
    ProxyAssistant.playAdvertisement(101, '奶茶真好喝！ 吨吨吨')
}