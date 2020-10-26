<template>
  <div class="son">
    <h1>孙子继承了孩子的资产：{{ money }}</h1>
    <button @click="usermoney"
            @notice="notice">花钱</button>
  </div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    money: Number
  },
  methods: {
    usermoney () {
      this.$eventDispatch('usermoney', 100)
    },
    notice () {
      console.log('我是孙子，我用钱了')
    }
  },
}
</script>

<style>
</style>