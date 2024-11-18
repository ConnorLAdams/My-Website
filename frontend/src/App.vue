<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MyHome />
  <MyProjects />
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <!-- <div id="app"> -->
  <!--     <MyHome /> -->
  <!-- </div> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MyHome from './components/MyHome.vue'
import MyProjects from './components/MyProjects.vue'

export default {
  name: 'App',
  components: {
    MyHome,
    MyProjects,
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
