<template>
  <div>
    <section class="wrapper container">
      <div class="title">Contact Us</div>
      <form method="POST"  @submit.prevent="submitForm" enctype="multipart/form-data" class="form">
        <div class="input_field">
          <label>Name</label>
          <input type="text" class="input" name="name" v-model="form.name" />
        </div>
        <div class="input_field">
          <label>Phone Number</label>
          <input type="number" class="input" name="number" v-model="form.number" />
        </div>
        <div class="input_field">
          <label>Title</label>
          <input type="text" class="input" name="name" v-model="form.subject"/>
        </div>
        <div class="input_field">
          <label>Subject</label>
          <textarea class="form-control" rows="10" v-model="form.text"></textarea>
        </div>
        <div class="input_field">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mail } from "../api/mail";

export default {
  name: "Contact",
  data() {
    return {
      form: {
        to: "neuerm878@gmail.com",
        from: "robertlewa878@gmail.com",
        subject: "",
        text: "",
        name: "",
        number: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const response = await mail({ 
        to: this.form.to,
        from: this.form.from,
        subject: this.form.subject,
        name: this.form.name,
        phoneNumber: this.form.number,
        text: this.form.text
       });

      this.$router.push({ name: "Home" });
    },
  },
};
</script>


<style>
</style>