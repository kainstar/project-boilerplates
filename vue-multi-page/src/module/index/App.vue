<template>
  <div id="app">
    <web-header></web-web-header>
    <router-view></router-view>
  </div>
</template>

<script>
import {AJAX_URL} from './plugins'
import WebHeader from './components/WebHeader';

export default {
  name: 'app',
  data () {
    return {
      
    }
  },
  components: {
    WebHeader
  },
  created () {
    this.axios.get(AJAX_URL.user).then(res => {
      console.log(res.data)
    })
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
