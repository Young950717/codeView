/**
 * @description 冒泡排序，每个寻找最大/最小的排到最前面
 * @param {Array} array 需要排序的数组
 */
// 基础版
function bubblerSort (array) {
  let len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
}

// 优化版
function bubblerSort (array) {
  let len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
}