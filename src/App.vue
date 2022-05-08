<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>
  import Home from './pages/Home.vue';
  import Login from './pages/Login.vue';
  import Manage from './pages/Manage.vue';
  export default {
    name: 'App',
    components:{
      Home,
      Login,
      Manage
    }
    
  }
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html{
  background-image: linear-gradient(to right, #8a2387 , #e94057, #f27121);
  height: 100vh;
}
</style>