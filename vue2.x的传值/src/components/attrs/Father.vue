<template>
  <div>
    <!-- <son :name="name"
         :age="age"
         :hobby="hobby"
         :homeTown="homeTown"></son> -->
    <son v-bind="$attrs"
         v-on="$listeners"></son>
  </div>
</template>

<script>
import Son from './Son'
export default {
  name: 'Father1',
  components: {
    Son
  },
  //   props: {
  //     name: String,
  //     age: Number,
  //     hobby: String,
  //     homeTown: String
  //   },
  mounted () {
    // console.log(this)
  }
}
</script>

<style>
</style>