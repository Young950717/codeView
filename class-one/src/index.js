import Vue from 'vue'

// opyions api
let vm = new Vue({
    el: '#app',
    data() {
        return {
            title: 'xxx',
            array: [1, 2, 3],
            obj: {
                a: 1,
                b: {
                    c: 3
                }
            }
        }
    }
})
console.log(vm)