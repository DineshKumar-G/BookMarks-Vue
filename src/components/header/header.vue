<template>
<header id="header">
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://vuejs.org/images/logo.png">
          <span class="is-size-3 has-text-primary">ue-Bookmark</span>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/" class="button is-info" v-if="!loggedIn">Welcome Page</router-link>

              <router-link to="/signup" class="button is-primary" v-if="!loggedIn" >Sign Up</router-link>

               <router-link to="/signin" class="button is-danger"  v-if="!loggedIn">Sign In</router-link>

               <router-link to="/signin" class="button is-danger" v-if="loggedIn" ><a  @click="loggout()" style="all: unset">Logout</a></router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
</template>



<script>
import { EventBus } from '../../Events.js';
export default {
    data(){
      return{
        loggedIn:false
      }
    },
    created() {
        EventBus.$on('emittedEvent', data => {
        this.loggedIn = data;
        });
    }, 
    methods : {
      loggout(){
        console.log('logout')
        this.loggedIn=false;
      }
    }
    
  }
</script>

<style scoped>
 
 .navbar-item img {
  max-height: 4rem !important;
}
  
</style>