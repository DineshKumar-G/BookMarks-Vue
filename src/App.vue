<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <bookmarks v-if="false"></bookmarks> 
  </div>
</template>

<script>
  
import { EventBus } from './Events.js';

  import Header from './components/header/header.vue'
  import Bookmarks from './components/bookmarks.vue'
  import Signin from './components/auth/signin.vue'
  export default {
    name: 'app',
    data () {
      return{
       loggedIn:false}
    },
     components: {
      'app-header': Header,
      'bookmarks':Bookmarks,
      'signin':Signin
    },
    created() {
        EventBus.$on('emittedEvent', data => {
        this.loggedIn = data;
        });
    }, 
}


</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>