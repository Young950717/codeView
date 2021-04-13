/**
 * @description 希尔排序 定义一个初始的增量，根据增量分组，分组内进行插入排序，可以很大程度上避免小数字出现在最右侧
 * @param {Array} array 
 */

function shellSort(array) {
  let len = array.length
  // 初始化增量，采用原稿的length/2
  let gap = Math.floor(len / 2)
  // 根据增量分组进行插入排序
  while (gap >= 1) {
    // 与插入排序一致
    for (let i = gap; i < len; i++) {
      let current = array[i]
      let j = i
      while (current < array[j - gap] && j > 0) {
        array[j] = array[j - gap]
        j -= gap
      }
      array[j] = current
    }
    // 改变增量值，直到为1
    gap = Math.floor(gap / 2)
  }
}