<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { EventBus } from "./Events.js";

import Header from "./components/header/header.vue";
import Bookmarks from "./components/bookmarks.vue";
import Signin from "./components/auth/signin.vue";
export default {
  name: "app",
  data() {
    return {
      loggedIn: false,
    };
  },
  components: {
    "app-header": Header,
    bookmarks: Bookmarks,
    signin: Signin,
  },
  created() {
    this.isLoggedIn = this.$store.state.isLoggedIn;
    if(this.$route.path === '/'){
      this.$router.push({path: '/'})
      return;
    }
    if (!this.isLoggedIn) {
      this.$dialog.alert({
        title: "Error",
        message: "<strong>You need to Log in to access this page</strong>",
        type: "is-danger",
      });
      this.$router.push({ name: "signin" });
    }
    EventBus.$on("emittedEvent", (data) => {
      this.loggedIn = this.$store.state.isLoggedIn;
    });
  },
};
</script>

<style>
body,
html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>