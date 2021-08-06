<template>
  <div class="container py-5 mt-5" style="
    padding-top: 190px !important;
    width: 60%;">
  <div class="row content">
    <div class="col-md-6 mb-3">
    </div>
    <div class="col-md-6">
      <h3 class="signin-text mb-3"> Sign Up</h3>
      <div v-if="message" class="alert alert-success">{{message}}</div>
      <!-- <div v-if="error.length > 0">
        <div v-for="e in error" v-bind:key="e" class="alert alert-danger">{{e}}</div>
      </div> -->
      <p v-if="error.length" class="alert alert-danger">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="e in error" v-bind:key="e" >{{ e }}</li>
        </ul>
      </p>
      <form method="POST" @submit.prevent="login">
        <div class="form-group">
          <label for="email">Name</label>
          <input type="text" v-model="name" name="name" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" name="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" name="password" class="form-control">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" name="checkbox" class="form-check-input" id="checkbox">
          <label class="form-check-label" for="checkbox">Remember Me</label>
        </div>
        <button type="submit" class="btn btn-class">Login</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { register } from "../api/user";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: "",
      error: [],
    };
  },
  methods: {
    async login(e) {
      try {
        if(this.checkForm()){
          const res = await register({
            name: this.name,
            email: this.email,
            password: this.password,
          });

          this.error = []
       
          this.message = "Great! We are going to redirect you to the login page.";

          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
          
        }
      } catch (error) {
        console.log(error)
      }
    },
    checkForm(){
        if(this.name && this.email && this.password.length > 6){
          return true;
        }

        this.error = []
        if(!this.name){
          this.error.push("Name required");
        }

        if(!this.email){
          this.error.push("Email required");
        }

        if(this.password.length <= 6){
          this.error.push("Password must be longer than 6 characters!");
        }
      }
  },
};
</script>