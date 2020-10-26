<template>
  <div class="Grandpa">
    <h1>爷爷的资产：{{ money }}</h1>
    <father :money="money"
            @usermoney="usermoney"
            @notice="notice"></father>
  </div>
</template>

<script>
import Father from './Father'
export default {
  name: 'Grandpa',
  components: {
    Father
  },
  data () {
    return {
      money: 10000
    }
  },
  methods: {
    usermoney (money) {
      this.money -= money
      this.$eventBroadcast('notice')
    },
    notice () {
      console.log('我是爸爸，我用钱了')
    }
  },

}
</script>

<style></style>