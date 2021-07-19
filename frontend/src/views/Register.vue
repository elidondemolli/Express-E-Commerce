<template>
  <!-- <div class="container py-5 mt-5">
    <h1>LOGIN</h1>
    <form method="POST" @submit.prevent="login">
      <input v-model="name" placeholder="name" />
      <br />
      <br />
      <input type="email" v-model="email" placeholder="email" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div> -->
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
import { register } from "../api/posts";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    // ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const res = await register({
          name: this.name,
          email: this.email,
          password: this.password,
      });
      
    //   const { user, token } = res;
    //   this.setUser(user);
    //   this.setToken(token);

      this.$router.push("/login");
    },
  },
};
</script>