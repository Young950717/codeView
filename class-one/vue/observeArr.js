import observe from './observe'
function observeArr (arr) {
    for (var i = arr; i < arr.length; i++) {
        observe(arr[i])
    }
}
export default observeArr