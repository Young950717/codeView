/**
 * @description 选择排序 选择第一个元素为最小值，进行一轮对比，选择最小的放在第一个，第二次选择第二个元素为最小值，在进行一轮对比，选择最小的放在第二个，以此类推
 * @param {Array} array 
 */

function selectSort(array) {
  let len = array.length
  for (let i = 0; i < len - 1; i++) {
    let min = i //从0开始
    for (let j = min + 1; j < len; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    // 找到最小的
    let temp = array[min]
    array[min] = array[i]
    array[i] = temp
  }
}