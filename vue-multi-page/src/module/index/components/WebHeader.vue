<template>
  <header>
    <div class="logo">餐源网</div>
    <nav class="navbar">
      <ul>
        <li :key="'nav-' + item" v-for="item in navItems">{{item}}</li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'web-header',
  data () {
    return {
      navItems: ['']
    }
  }
}
</script>


<style scoped>

</style>
