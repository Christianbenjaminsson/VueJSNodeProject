<template>
  <div>
    <h1>Posts ()</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id" @click="selectPost(post)">
          <th></th>
          <td></td>
          <td>
            <button class="btn btn-danger" @click="deletePost(post)">X</button>
            <a class="btn btn-primary" v-bind:href="'/post-update/' + post.id">
              &#9998;
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { APIService } from "../APIService";
const API_URL = "http://localhost:4000";

const apiService = new APIService();

export default {
  name: "ListPost",
  components: {},
  data() {
    return {
      posts: [],
      numberOfPosts: 0,
    };
  },
  methods: {
    getPosts() {
      apiService.getPosts().then((data) => {
        this.posts = data.data;
        this.numberOfProducts = data.count;
      });
    },
    deletePost(post) {
      apiService.deletePost(post).then((r) => {
        if (r.status === 204) {
          alert("Post deleted");

          this.$router.go();
        }
      });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>

<style scoped>
.list-horizontal li {
  display: inline-block;
}

.list-horizontal li:before {
  content: "\00a0\2022\00a0\00a0";

  color: #999;

  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
}

.list-horizontal li:first-child:before {
  content: "";
}
</style>
