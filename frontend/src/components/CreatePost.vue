<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError" >
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Error!</strong>
        </div>
        <h1>Create a Post</h1>
        <div class="info-form">
          <form>
            <div class="form-group">
              <label for="name">Post Name</label>
              <input v-model="post.name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name">
              <small id="nameHelp" class="form-text text-muted">Enter your posts's name</small>
            </div>
          </form>
          <button class="btn btn-primary" v-if="!this.post.id" @click="createPost()" ><span>Create</span>
          <button class="btn btn-primary" v-if="this.post.id" @click="updatePost()" ><span>Update</span></button>
          <button class="btn btn-primary" @click="newPost()" >New..</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {APIService} from '../APIService';

const apiService = new APIService();

export default {

name: 'CreatePost',

components: {
},

data() {
    return {
        showError: false,
        post: {}
    };

},

methods: {
createPost(){
  apiService.createPost(this.post).then((result)=>{
  console.log(result);
    if(result.status === 201){
      this.post = result.data;
    }
  }, (error)=> {
    this.showError = true;
});
},
updatePost(){
  apiService.updatePost(this.post).then((result)=>{
  console.log(result);
  }, (error)=> {
    this.showError = true;
});
},
newPost(){
  this.post = {};
}
},
mounted() {
  if(this.$route.params.pk){
    apiService.getPost(this.$route.params.pk).then((post)=>{
    this.post = post;
  })
}
},
}
</script>
<style scoped>
.aform{
margin-left: auto;
width: 60%;
}
</style>