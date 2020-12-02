/**
 * @description 快速排序 分而治之 二分法 选择一个合适的枢纽
 */

// 交换函数
function change (array, left, right) {
  let temp = array[left]
  array[left] = array[right]
  array[right] = temp
}
// 获取合适的枢纽
function getMedium (array) {
  // 取出中间的位置
  let center = Math.floor(array.length / 2)
  let left = 0
  let right = array.length - 1
  // 判断后交换位置
  if (array[left] > array[center]) {
    change(array, left, center)
  }
  if (array[center] > array[right]) {
    change(array, center, right)
  }
  if (array[left] > array[right]) {
    change(array, left, right)
  }
  // 返回中间的index
  return center
}
// 递归调用
function quickSort (array) {
  if (array.length === 0) return []
  let left = []
  let right = []
  let cidx = getMedium(array)
  let base = array.splice(cidx, 1)
  array.forEach(num => {
    if (num < base) {
      left.push(num)
    } else {
      right.push(num)
    }
  })
  return quickSort(left).concat(base, quickSort(right))
}