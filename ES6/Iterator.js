/**
 * @description 自定义可遍历的结构
 * @author Young
 */

// 场景1 优雅的输出自己想要的数据结构
const ajaxData = {
  allGames: {
    moba: ['lol', '梦三国', 'dota', '风暴英雄'],
    fps: ['csgo', 'pubg', '堡垒之夜'],
    role: ['梦幻西游', '大话西游', '水浒q传']
  },
  allSingers: 'none of my bussiness'
}
// 想要遍历出allGames里面的数据
// 方法1 强撸
// let res = []
// res = res.concat(ajaxData.allGames.moba).concat(ajaxData.allGames.fps).concat(ajaxData.allGames.role)
// console.log(res)
// 方法2 往对象里面添加可迭代协议
// ajaxData[Symbol.iterator] = function () {
//   let allGames = this.allGames
//   let keys = Reflect.ownKeys(allGames)
//   let values = []
//   return {
//     next () {
//       if (!values.length) {
//         if (keys.length) {
//           values = allGames[keys[0]]
//           keys.shift()
//         }
//       }
//       return {
//         done: !values.length,
//         value: values.shift()
//       }
//     }
//   }
// }

// 使用Generator改写
ajaxData[Symbol.iterator] = function* () {
  let allGames = this.allGames
  let keys = Reflect.ownKeys(allGames)
  let values = []
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allGames[keys[0]]
        keys.shift()
        yield values.shift()
      } else {
        return false
      }
    } else {
      yield values.shift()
    }
  }
}

let res = []
for (let v of ajaxData) {
  res.push(v)
}
console.log(res)