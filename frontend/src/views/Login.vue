<template>
  <div class="container py-5 mt-5">
    <h1>LOGIN</h1>
    <form method="POST" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="email" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
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