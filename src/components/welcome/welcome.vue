<template>
  <div id="welcome">
    <div class="container is-fluid has-text-centered" style="padding-top:5px;">
    <h1 class="title is-2 is-spaced ">Welcome to Vue Bookmarking page</h1>
        <h5 class="subtitle is-5">Firebase is used as DB server for authentication and storing the Bookmarks url</h5>
        <h5 class="subtitle is-5">Axios is used to perform HTTP opertaions</h5>
        <h5 class="subtitle is-5">Email is sent on Sign up using SMTP api</h5>
        <h5 class="subtitle is-5">Vuex is used with Store.js and Event Bus is used</h5>
        <h5 class="subtitle is-5">Vue Router is used for navigation between a total of 4 pages</h5>
        <h5 class="subtitle is-5">Bulma is used for Styling</h5>
        <h5 class="subtitle is-5">Buefy is used for Alerts</h5>
    <div class="buttons">
            <router-link to="/signup" class="button is-primary">Sign Up</router-link>

            <router-link to="/signin" class="button is-danger">Sign In</router-link>
          </div>
    <div class="footer is-family-monospace"><strong>- Dinesh Kumar G &copy; Vue-Bookmarks</strong></div>
  </div>
  </div>
</template>

<script>
import { EventBus } from '../../Events.js';


export default {
  
}
</script>

<style scoped>  
.buttons{
    padding-left: 533px;
}
nav{
    padding-bottom: 100px;
    padding-left: 550px;
}
 .navbar-item img {
  max-height: 4rem !important;
}
</style>