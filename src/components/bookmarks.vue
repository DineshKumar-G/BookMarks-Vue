<template>
  <bookmarks>
    <div class="columns is-centered">
      <div class="column is-6">
        <div class="field">
          <label class="label">Link</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" placeholder="Enter Your Link here" id="email" v-model="newLink">
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
            <input class="input" placeholder="Enter the Notes here" id="password" v-model="newNotes">
            <span class="icon is-small is-left">
              <icon name="bookmark"></icon>
            </span>
          </p>
        </div>
      </div>
      <div calss="columns is-2" style="padding-top:43px;">
        <a class="button is-success is-outlined has-icons-right">
          <span class="icon is-small is-right">
            <icon name="plus"></icon>
          </span>
          <span @click="AddBookMark()">Add</span>
        </a>
      </div>
    </div>
    <br>
    <br>
    <div class="list" style="padding:0 100px 0 100px;">
      <div class="columns" >
        <div class="column is-6">
          <label class="label"><strong class="is-size-3">Links</strong>⤵</label>
          <div v-for="links in this.dispLinks" class="box" ><a v-bind:href="links">{{ links }}</a></div>
        </div>
        <div class="column is-3">
          <label class="label"><strong class="is-size-3">Notes</strong>⤵</label>
          <div v-for="notes in this.dispNotes" class="box">{{notes}}</div>
        </div>
        <div class="column is-3">
          <label class="label"><strong class="is-size-3">Created At</strong>⤵</label>
          <div v-for="timestampp in this.dispTime" :key="timestampp" class="box">{{timestampp}}</div>
        </div>
      </div>
    </div>
  </bookmarks>
</template>


<script>
import axios from "axios";
import { EventBus } from "../Events.js";
export default {
  props: ["corEmail"],
  data() {
    return {
      email: "",
      bookMarks: [],
      bm:[],
      newLink: "",
      newNotes: "",
      dispLinks: [],
      dispNotes: [],
      dispTime: []
    };
  },

created(){
    this.email = this.$store.state.currentEmail;
    axios
      .get("https://vue-bookmarks-29343.firebaseio.com/bookmarks.json")
      .then(res => {
        this.dispLinks = [];
        this.dispNotes = [];
        this.dispTime = [];
        for (let key in res.data) {
          this.bm = res.data[key];
          if (res.data[key].email === this.email) {
            this.dispLinks.push(this.bm.link);
            this.dispNotes.push(this.bm.notes);
            this.dispTime.push(this.bm.timeStamp);
          }
        }
      })
      .catch(err => console.log(err));
  },
  methods: {
    AddBookMark() {
      if (this.newLink === ""|| this.newNotes==="") { 
        this.$dialog.alert({
                    title: 'Error',
                    message: '<strong>Link or notes can not be empty</strong>',
                    type: 'is-danger',
                })  
      }
      else {
        this.dispLinks.push(this.newLink);
      this.dispNotes.push(this.newNotes);
      this.email = this.$store.state.currentEmail;      
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
          curTime: new Date().getTime()
        };
        console.log(BookMarkData);
        axios
          .post("https://vue-bookmarks-29343.firebaseio.com/bookmarks.json",BookMarkData)
          .then(
          this.$dialog.alert({
                    title: 'Success!',
                    message: '<strong>Post is Added!</strong>',
                    type: 'is-success',
                })  )
          .catch(error => console.log(error));
      }
    }
  }
};
</script>




<style>
.navbar-item img {
  max-height: 4rem !important;
}
</style>