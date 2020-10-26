<template>
  <div class="father">
    <h1>爸爸继承爷爷的资产:{{ money }}</h1>
    <child :money="money"
           @notice="notice"></child>
  </div>
</template>

<script>
import Child from './Child'
export default {
  name: 'Father',
  components: {
    Child
  },
  props: {
    money: Number
  },
  methods: {
    usermoney (money) {
      this.$emit('usermoney', money)
    },
    notice () {
      console.log('我是孩子，我用钱了')
    }
  },
}
</script>

<style>
</style>