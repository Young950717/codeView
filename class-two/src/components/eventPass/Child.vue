<template>
  <div class="child">
    <h1>孩子继承爸爸的资产:{{ money }}</h1>
    <son :money="money"
         @notice="notice"></son>
  </div>
</template>

<script>
import Son from './Son'
export default {
  name: 'child',
  components: {
    Son
  },
  props: {
    money: Number
  },
  methods: {
    usermoney (money) {
      this.$emit('usermoney', money)
    },
    notice () {
      console.log('我是孙子，我用钱了')
    }
  },
}
</script>

<style>
</style>