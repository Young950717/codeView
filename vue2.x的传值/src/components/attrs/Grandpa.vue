<template>
  <div>
    <father :name="name"
            :age="age"
            :hobby="hobby"
            :homeTown="homeTown"
            @notice="notice"></father>
  </div>
</template>

<script>
import Father from './Father'
export default {
  name: 'Grandpa1',
  components: {
    Father
  },
  data () {
    return {
      name: '张三',
      age: 18,
      hobby: '打球',
      homeTown: 'Earth'
    }
  },
  methods: {
    notice () {
      console.log('回家吃饭了')
    }
  },
}
</script>

<style>
</style>