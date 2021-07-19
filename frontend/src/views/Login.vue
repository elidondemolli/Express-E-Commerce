<template>
  <div class="container py-5 mt-5" style="
    padding-top: 190px !important;
    width: 60%;">
  <div class="row content">
    <div class="col-md-6 mb-3">
    </div>
    <div class="col-md-6">
      <h3 class="signin-text mb-3"> Sign In</h3>
      <form method="POST" @submit.prevent="login">
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
import { login } from "../api/posts";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const res = await login({
          email: this.email,
          password: this.password,
      });
      
      localStorage.setItem('token', res.jwtToken);
      localStorage.setItem('name', res.user.name)
      this.$store.dispatch('user', res.user);

      this.$router.push({
        name: "Home"
      });
    },
  },
};
</script>

<style>

body > div > div > div > div.col-md-6.mb-3{
  background: url("../../img/login.jpg") no-repeat;
  background-size: cover;
  background-size: cover;
}

.content{
    margin: 8%;
    background-color: #fff;
    padding: 4rem 1rem 4rem 1rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0, .05);
}
.signin-text{
    font-style: normal;
    font-weight: 600 !important;

}

.form-control{
    display: block;
    width:100%;
    font-size: 1rem;
    font-weight: 400;
    line-height:1.5;
    border-color: #00ac96 !important;
    border-style: solid !important;
    border-width: 0 0 1px 0 !important;
    padding: 0px !important;
    color:#495057;
    height: auto;
    border-radius: 0;
    background-color: #fff;
    background-clip: padding-box;
}


.form-control:focus{
    color: #495057;
    background-color: #fff;
    border-color: #fff;
    outline: 0;
    box-shadow: none;
}
.birthday-section{
    padding: 15px;
}
.btn-class{
    border-color: #00ac96;
    color: #00ac96;
}
.btn-class:hover{
    background-color:  #00ac96;
    color: #fff;
}
</style>