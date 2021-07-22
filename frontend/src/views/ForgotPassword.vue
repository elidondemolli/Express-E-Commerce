<template>
  <div
    class="container py-5 mt-5"
    style="padding-top: 190px !important; width: 60%"
  >
    <div class="row content">
      <div class="col-md-6 mb-3"></div>
      <div class="col-md-6">
        <h3 class="signin-text mb-3">Sign In</h3>
        <form method="POST" @submit.prevent="forgot">
          <div v-if="error" class="alert alert-success">{{error}}</div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              name="email"
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-class">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { forgotPassword } from "../api/posts";
export default {
  data() {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    async forgot() {
      try {
        const res = await forgotPassword({
          email: this.email,
        });

        this.error = "Email has been sent. Please check your inbox."
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style>
body > div > div > div > div.col-md-6.mb-3 {
  background: url("../../img/login.jpg") no-repeat;
  background-size: cover;
}

.content {
  margin: 8%;
  background-color: #fff;
  padding: 4rem 1rem 4rem 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
}
.signin-text {
  font-style: normal;
  font-weight: 600 !important;
}

.form-control {
}

.form-control:focus {
}
.birthday-section {
  padding: 15px;
}
.btn-class {
  border-color: #00ac96;
  color: #00ac96;
}
.btn-class:hover {
  background-color: #00ac96;
  color: #fff;
}
</style>