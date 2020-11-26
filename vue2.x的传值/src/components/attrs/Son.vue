<template>
  <div>
    <!-- <h1>孙子的名字：{{ name }} </h1>
    <h1>孙子的年龄：{{ age }} </h1>
    <h1>孙子的爱好：{{ hobby }} </h1>
    <h1>孙子的家乡：{{ homeTown }} </h1> -->
    <h1>孙子的名字：{{ this.$attrs.name }} </h1>
    <h1>孙子的年龄：{{ this.$attrs.age }} </h1>
    <h1>孙子的爱好：{{ this.$attrs.hobby }} </h1>
    <h1>孙子的家乡：{{ this.$attrs.homeTown }} </h1>

  </div>

</template>

<script>
export default {
  name: 'son1',
  //   props: {
  //     name: String,
  //     age: Number,
  //     hobby: String,
  //     homeTown: String
  //   },
  mounted () {
    this.$listeners.notice()
  },
}
</script>

<style>
</style>