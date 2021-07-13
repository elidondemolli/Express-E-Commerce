<template>
  <div class="container py-5 mt-5">
    <h1>LOGIN</h1>
    <form method="POST" @submit.prevent="login">
      <input v-model="username" placeholder="username" />
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
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const res = login({
          username: this.username,
          password: this.password,
      });
      
      const { user, token } = res;
      this.setUser(user);
      this.setToken(token);

      this.$router.push({
        name: "Home"
      });
    },
  },
};
</script>