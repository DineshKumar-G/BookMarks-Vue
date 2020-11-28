<template>
  <bookmarks>
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="field">
          <label class="label">Link</label>
          <div class="control has-icons-left has-icons-right">
            <input
              class="input"
              placeholder="Enter Your Link here"
              id="email"
              v-model="newLink"
            />
            <span class="icon is-small is-left">
              <icon name="link"></icon>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="field">
          <label class="label">Notes</label>
          <p class="control has-icons-left">
            <input
              class="input"
              placeholder="Enter the Notes here"
              id="password"
              v-model="newNotes"
            />
            <span class="icon is-small is-left">
              <icon name="bookmark"></icon>
            </span>
          </p>
        </div>
      </div>
      <div calss="columns is-2" style="padding-top: 43px">
        <a class="button is-success is-outlined has-icons-right">
          <span class="icon is-small is-right">
            <icon name="plus"></icon>
          </span>
          <span @click="AddBookMark()">Add</span>
        </a>
      </div>
    </div>
    <br />
    <br />
    <div class="list" style="padding: 0 100px 0 100px">
      <div class="columns">
        <div class="column is-6">
          <label class="label">
            <strong class="is-size-3">Links</strong>⤵
          </label>
        </div>
        <div class="column is-3">
          <label class="label">
            <strong class="is-size-3">Notes</strong>⤵
          </label>
        </div>
        <div class="column is-3">
          <label class="label">
            <strong class="is-size-3">Created At</strong>⤵
          </label>
        </div>
      </div>
      <div v-for="mark of data" :key="mark._id">
        <div class="columns">
          <div class="column is-6">
            <div class="box">
              <a v-bind:href="mark.link">{{ mark.link }}</a>
            </div>
          </div>
          <div class="column is-3">
            <div class="box">
              {{ mark.notes }}
            </div>
          </div>
          <div class="column is-3">
            <div class="box">
              {{ mark.timeStamp }}
            </div>
          </div>
          <span
            class="icon is-large is-right has-text-danger del"
            @click="remove(mark._id)"
          >
            <icon name="times-circle"></icon>
          </span>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
  </bookmarks>
</template>


<script>
import axios from "axios";
import { EventBus } from "../Events.js";
import uuid from "uuid/v4";

export default {
  props: ["corEmail"],
  data() {
    return {
      data: [],
      email: "",
      isLoading: false,
      bookMarks: [],
      newLink: "",
      newNotes: "",
    };
  },

  created() {
    this.email = this.$store.state.currentEmail;
    this.fetchBookMarks();
  },
  methods: {
    remove(id) {
      this.isLoading = true;
      axios
        .delete(
          `https://vue-bookmarks-29343.firebaseio.com/bookmarks/${id}.json`
        )
        .then(() => {
          this.$dialog.alert({
            title: "Success!",
            message: "<strong>Post is deleted!</strong>",
            type: "is-success",
          });
          this.isLoading = false;

          this.fetchBookMarks();
        })
        .catch((error) => console.log(error));
    },
    fetchBookMarks() {
      this.isLoading = true;
      this.data = [];
      axios
        .get("https://vue-bookmarks-29343.firebaseio.com/bookmarks.json")
        .then((res) => {
          for (let key in res.data) {
            let bm = res.data[key];
            if (res.data[key].email === this.email) {
              bm._id = key;
              this.data.push(bm);
            }
          }
        })
        .catch((err) => console.log(err));
      this.isLoading = false;
    },
    AddBookMark() {
      this.isLoading = true;
      if (this.newLink === "" || this.newNotes === "") {
        this.$dialog.alert({
          title: "Error",
          message: "<strong>Link or notes can not be empty</strong>",
          type: "is-danger",
        });
      } else {
        var currentdate = new Date();
        var datetime =
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " At " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();
        const BookMarkData = {
          email: this.email,
          link: this.newLink,
          timeStamp: datetime,
          notes: this.newNotes,
          curTime: new Date().getTime(),
          uuid: uuid(),
        };
        axios
          .post(
            "https://vue-bookmarks-29343.firebaseio.com/bookmarks.json",
            BookMarkData
          )
          .then(() => {
            this.$dialog.alert({
              title: "Success!",
              message: "<strong>Post is Added!</strong>",
              type: "is-success",
            });
            this.isLoading = false;

            this.fetchBookMarks();
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>




<style>
.navbar-item img {
  max-height: 4rem !important;
}
.del {
  padding-top: 40px;
  cursor: pointer;
}
.box {
  overflow: auto;
  max-height: 10vh !important;
  overflow-y: hidden;
  white-space: nowrap;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>