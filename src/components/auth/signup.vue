<template>
  <div id="signup">
    <div class="section is-small">
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
            <label class="label">Agee</label>
            <div class="control has-icons-left">
              <input
                class="input"
                type="number"
                id="age"
                placeholder="Optional"
                v-model.number="age"
              >
              <span class="icon is-small is-left">
                <icon name="paper-plane"></icon>
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
          <div class="field">
            <label class="label">Confirm Password</label>
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                id="confirm-password"
                v-model="confirmPassword"
              >
              <span class="icon is-small is-left">
                <icon name="lock"></icon>
              </span>
            </p>
          </div>
          <div class="field" style="padding-left:150px;">
            <label class="label" for="country">Country</label>
            <p class="control">
              <span class="select">
                <select id="country" v-model="country">
                  <option value="usa">USA</option>
                  <option value="india">India</option>
                  <option value="uk">UK</option>
                  <option value="germany">Germany</option>
                </select>
              </span>
            </p>
          </div>
          <div class="field submit">
            <p class="control has-text-centered">
              <a class="button is-link" @click="onSubmit()">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../Events.js";

import axios from "axios";
export default {
  data() {
    return {
      email: "",
      age: null,
      password: "",
      confirmPassword: "",
      country: "usa",
      terms: false,
      existingEmails: []
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
        });
      })
      .catch(error => console.log(error));
  },
  methods: {
    onSubmit() {
      if (!this.existingEmails.includes(this.email)) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.email).toLowerCase())) {
          this.$dialog.alert({
            title: "Error",
            message: "<strong>Please Enter valid Email id</strong>",
            type: "is-danger"
          });
        } else if (this.password.length < 8) {
          this.$dialog.alert({
            title: "Error",
            message: "<strong>Password has to be 8 characters long</strong>",
            type: "is-danger"
          });
        } else if (this.password !== this.confirmPassword) {
          this.$dialog.alert({
            title: "Error",
            message:
              "<strong>Type the same password in both the password fields</strong>",
            type: "is-danger"
          });
        } else {
          const formData = {
            email: this.email,
            age: this.age,
            password: this.password,
            confirmPassword: this.confirmPassword,
            country: this.country
          };
          axios
            .post(
              "https://vue-bookmarks-29343.firebaseio.com/users.json",
              formData
            )
            .then(res =>
              Email.send({
                Host: "smtp25.elasticemail.com",
                Username: "testttt220188@gmail.com",
                Password: "1016ba89-c158-45da-ad82-c9420860a2e8",
                To: this.email,
                From: "testttt220188@gmail.com",
                Subject: "Welcome to Vue Bookmarks by G Dinesh Kumar",
                Body: "You can add bookmarks now!!"
              }).then(message =>
                this.$dialog.alert({
                  title: "Success",
                  message:
                    "<strong>Mail has been sent to your email Id and you can Log in now!</strong>",
                  type: "is-success"
                })
              )
            )
            .catch(error => console.log(error));
        }
      } else {
        this.$dialog.alert({
          title: "Error",
          message: "<strong>Email Already Exists!!!</strong>",
          type: "is-danger"
        });
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