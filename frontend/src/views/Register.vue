<template>
  <div class="container py-5 mt-5">
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