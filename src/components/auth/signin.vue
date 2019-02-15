<template>
  <div id="signin">
    <div class="section is-medium">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="Email input"
                id="email"
                v-model="email"
              >
              <span class="icon is-small is-left">
                <icon name="envelope"></icon>
              </span>
              <span class="icon is-small is-right">
                <icon name="check"></icon>
              </span>
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                id="password"
                v-model="password"
              >
              <span class="icon is-small is-left">
                <icon name="lock"></icon>
              </span>
            </p>
          </div>
          <div class="field submit">
            <p class="control has-text-centered">
              <a class="button is-link" @click="onSubmit()">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../Events.js';


import axios from "axios";
export default {
  data() {
    return {
      loggedIn: false,
      email: "",
      password: "",
      existingEmails: [],
      checkpassword: []
    };
  },
  created() {
    axios
      .get("https://vue-bookmarks-29343.firebaseio.com/users.json")
      .then(res => {
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        const len = users.length;
        users.forEach(us => {
          this.existingEmails.push(us.email);
          this.checkpassword.push(us.password);
        });
      })
      .catch(error => console.log("Email ID"));
  },
  methods: {
    onSubmit() {
      if (this.email === "" || this.password === "") {
        this.$dialog.alert({
                    title: 'Error',
                    message: '<strong>Email or password cannot be empty</strong>',
                    type: 'is-danger',
                })
      } else {
        if (this.existingEmails.includes(this.email)) {
          var pos = this.existingEmails.indexOf(this.email);
          if (this.password === this.checkpassword[pos]) {
            this.$dialog.alert({
                    title: 'Welcome!',
                    message: '<strong>Logged in</strong>',
                    type: 'is-success',
                })
            this.loggedIn = true;
            EventBus.$emit('emittedEvent', this.loggedIn);
            this.$store.state.currentEmail=this.email;

            this.$router.push({ name: "bookmarks", });

          } else {
            this.$dialog.alert({
                    title: 'Error',
                    message: '<strong>Password Wrong</strong>',
                    type: 'is-danger',
                })
          }
        } else {
          this.$dialog.alert({
                    title: 'Error',
                    message: '<strong>email id is invalid</strong>',
                    type: 'is-danger',
                })
          
        }
      }   
    }
  }
};
</script>

<style scoped>
.navbar-item img {
  max-height: 4rem !important;
}
</style>