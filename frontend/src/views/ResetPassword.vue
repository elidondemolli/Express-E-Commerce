<template>
  <div
    class="container py-5 mt-5"
    style="padding-top: 190px !important; width: 60%"
  >
    <div class="row content">
      <div class="col-md-6 mb-3"></div>
      <div class="col-md-6">
        <h3 class="signin-text mb-3">Reset Password</h3>
        <form method="POST" @submit.prevent="forgot">
          <div v-if="message" class="alert alert-success">{{message}}</div>
          <div v-if="error" class="alert alert-danger">{{error}}</div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              type="password"
              v-model="password"
              name="password"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <input
              type="password"
              v-model="password2"
              name="password"
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
import { resetPassword } from "../api/user";
export default {
  data() {
    return {
      password: "",
      password2: "",
      error: "",
      message: "",
    };
  },
  methods: {
    async forgot() {
      try {
        if(this.password == this.password2){
          const res = await resetPassword(this.$route.params.token, {
            newPass: this.password,
          });

          this.message = "Passwrod has been Updated. We are redirecting you to the login page :).";
          this.error = "";

          setTimeout(() => {
              this.$router.push({ name: "Login" });
          }, 3000)
        } else {
          this.error = "Please type the same password on the two fields.";
        }
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