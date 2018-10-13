<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <a href="#" @click="test('/mock/success')">Success Request</a>
    <a href="#" @click="test('/mock/failed')">Failed Request</a>
    <a href="#" @click="test('/mock/cookie')">Cookie Request</a>
    <a href="#" @click="test('/mock/serverError')">ServerError Request</a>
    <div>{{ errMsg }}</div>
    <router-link to="/hello2">To Hello2</router-link>
  </div>
</template>

<script>
import axios from '@/axios'
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState(['errMsg'])
  },
  methods: {
    test (path) {
      axios.get(path).then(data => {
        // 经过拦截器,可以直接获取需要处理的数据
        console.log(data)
      }).catch(err => {
        this.$store.commit('setErrMsg', err.message)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
