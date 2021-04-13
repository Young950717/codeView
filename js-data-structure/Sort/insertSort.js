/**
 * @description 插入排序 局部有序。依次将被标记的元素插入局部有序的队列
 * @param {Array} array 
 */

function insertSort(array) {
  let len = array.length
  // 外层循环，从第一个位置开始获取数据，向前面局部有序进行插入
  for (let i = 1; i < len; i++) {
    let current = array[i]
    let j = i
    // 内部循环，获取i的位置，和面前的局部有序数据进行比较
    while (current < array[j - 1] && j > 0) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = current
  }
}