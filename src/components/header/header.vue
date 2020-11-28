<template>
  <header id="header">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" router-link to="/">
          <img src="https://vuejs.org/images/logo.png">
          <span class="is-size-3 has-text-primary">ue-Bookmark</span>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/" class="button is-info" v-if="!loggedIn">Welcome Page</router-link>

              <router-link to="/signup" class="button is-primary" v-if="!loggedIn">Sign Up</router-link>

              <router-link to="/signin" class="button is-danger" v-if="!loggedIn">Sign In</router-link>
              <router-link to="/bookmarks" class="button is-primary" v-if="showGoBack">Go Back To App</router-link>
              <router-link to="/signin" class="button is-danger" v-if="loggedIn">
                <a @click="loggout()" style="all: unset">Logout</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>



<script>
import { EventBus } from "../../Events.js";
export default {
  data() {
    return {
      loggedIn: false
    };
  },
  created() {
    this.loggedIn = this.$store.state.isLoggedIn;
    EventBus.$on("emittedEvent", data => {
      this.loggedIn = this.$store.state.isLoggedIn;
    });
  },
  computed: {
    showGoBack() {
      return this.$store.state.isLoggedIn && this.$route.name !== 'bookmarks'
    }
  },
  methods: {
    loggout() {
      this.loggedIn = false;
      this.$store.commit('setCurrentEmail', '')
    }
  }
};
</script>

<style scoped>
.navbar-item img {
  max-height: 4rem !important;
}
a {
  color: white !important;
}
</style>