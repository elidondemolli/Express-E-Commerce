<template>
  <div>
    <section class="wrapper container">
      <div class="title">Edit User Role</div>
      <form
        method="POST"
        enctype="multipart/form-data"
        class="form"
        @submit.prevent="updateForm"
      >
        <div class="input_field">
          <label>User</label>
          <input
            disabled
            type="text"
            v-model="user.name"
            class="input"
            name="user"
          />
        </div>
        <div class="input_field">
          <label>Role</label>
          <div class="costum_select">
            <select v-model="user.role" name="role">
              <option disabled value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </select>
          </div>
        </div>
        <div class="input_field">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { getUserById, updateUser } from "../api/user";
export default {
  name: "Edit-post",
  data() {
    return {
        user: {}
    };
  },
  async created() {
    this.user = await getUserById(this.$route.params.id);
  },
  methods: {
    async updateForm() {
      const response = await updateUser(this.$route.params.id, { role: this.user.role });

      this.$swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      this.$router.push({
        name: "Dashboard",
      });
    },
  },
};
</script>


<style>
body > div > div > section > form > div:nth-child(3) > img {
  min-height:100%;
  min-width: 100%;
  object-fit: cover;
}

.wrapper {
  margin-top: 140px;
  max-width: 800px !important;
  width: 100%;
  background: #eeeded;
  padding: 30px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.125);
}

.wrapper .title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #313131;
  text-transform: uppercase;
  text-align: center;
}

.wrapper .form {
  width: 100%;
}

.wrapper .form .input_field {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.wrapper .form .input_field label {
  width: 100px;
  color: #757575;
  margin-right: 10px;
  font-size: 14px;
}

.wrapper .form .input_field .input {
  width: 100%;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 3s ease;
}

.wrapper .form .input_field .costum_select {
  position: relative;
  width: 100%;
  height: 37px;
}

.wrapper .form .input_field .costum_select select {
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #d5dbd9;
  width: 100%;
  height: 100%;
  padding: 8px 10px;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .input_field .costum_select select:before {
  content: "";
  position: absolute;
  top: 12;
  right: 10;
  border: 8px solid;
  border-color: black;
}

.wrapper .form .input_field:focus,
.wrapper .form .input_field .input:focus,
.wrapper .form .input_field select:focus {
  border: 1px solid #181817;
}

.wrapper .form .input_field .btn {
  width: 100%;
  padding: 8px 10px;
  font-size: 15px;
  border: 0;
  background: #b6b5b5;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .input_field:last-child {
  margin-bottom: 0;
}

.wrapper .form .input_field .btn:hover {
  background: #9e9e9e;
}

@media (max-width: 420px) {
  .wrapper .form .input_field {
    flex-direction: column;
    align-items: flex-start;
  }

  .wrapper .form .input_field label {
    margin-bottom: 5px;
  }
}
</style>