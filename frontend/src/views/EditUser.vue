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