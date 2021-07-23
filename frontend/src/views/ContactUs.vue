<template>
  <div class="container py-5 mt-5">
    <section class="my-5">
      <h2 class="h1-responsive font-weight-bold text-center my-5">
        Contact us
      </h2>
      <p class="text-center w-responsive mx-auto pb-5">
        Want to get in touch? We'd love to hear from you. Here's how you can
        reach us...
      </p>

      <div class="row">
        <div class="col-lg-5 mb-lg-0 mb-4">
          <div class="card">
            <div class="card-body">
              <div class="form-header">
                <h3 class="mt-2">
                  <i class="fas fa-envelope"></i> Talk to us:
                </h3>
              </div>
              <p class="dark-grey-text">
                We will get back to you as soon as we can :).
              </p>
              <div v-if="message" class="alert alert-success">{{message}}</div>
              <form
                method="POST"
                @submit.prevent="submitForm"
                enctype="multipart/form-data"
                class="form"
              >
                <div class="md-form">
                  <i class="fas fa-user"> </i>
                  <label for="form-name">Your full name</label>
                  <input
                    type="text"
                    id="form-name"
                    v-model="form.name"
                    class="form-control"
                  />
                </div>
                <div class="md-form">
                  <i class="fas fa-envelope"></i>
                  <label for="form-email"> Your email</label>
                  <input
                    type="text"
                    id="form-email"
                    v-model="form.email"
                    class="form-control"
                  />
                </div>
                <div class="md-form mt-2">
                  <i class="fas fa-phone"></i>
                  <label for="form-email">Your phone number</label>
                  <input
                    type="tel"
                    id="form-tel"
                    v-model="form.number"
                    class="form-control"
                  />
                </div>
                <div class="md-form mt-2">
                  <i class="fas fa-tag"></i>
                  <label for="form-Subject">Subject</label>
                  <input
                    type="text"
                    id="form-Subject"
                    v-model="form.subject"
                    class="form-control"
                  />
                </div>
                <div class="md-form mt-2">
                  <i class="fas fa-pencil-alt"></i>
                  <label for="form-text">Send message</label>
                  <textarea
                    id="form-text"
                    class="form-control md-textarea"
                    v-model="form.text"
                    rows="3"
                  ></textarea>
                </div>
                <div class="text-center mt-2">
                  <button class="btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div
            id="map-container-section"
            class="z-depth-1-half map-container-section mb-4"
            style="height: 400px"
          >
            <iframe
              src="https://maps.google.com/maps?q=Gjilan&t=&z=15&ie=UTF8&iwloc=&output=embed"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
          <div class="row text-center">
            <div class="col-md-4">
              <a class="btn-floating">
                <i class="fas fa-map-marker-alt"></i>
              </a>
              <p>Gjilan , 60000</p>
              <p class="mb-md-0">Kosovo</p>
            </div>
            <div class="col-md-4">
              <a class="btn-floating">
                <i class="fas fa-phone"></i>
              </a>
              <p>+ 383 44 444 444</p>
              <p class="mb-md-0">Mon - Fri, 8:00-22:00</p>
            </div>
            <div class="col-md-4">
              <a class="btn-floating">
                <i class="fas fa-envelope"></i>
              </a>
              <p>Express@info.com</p>
              <p class="mb-0">Express@sale.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mail } from "../api/mail";

export default {
  name: "Contact",
  data() {
    return {
      message: "",
      form: {
        to: "neuerm878@gmail.com",
        from: "neuerm878@gmail.com",
        subject: "",
        text: "",
        name: "",
        number: "",
        email: "",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await mail({ 
        to: this.form.to,
        from: this.form.from,
        subject: this.form.subject,
        name: this.form.name,
        phoneNumber: this.form.number,
        text: this.form.text,
        email: this.form.email
       });

       this.message = "Email Sent Successfully!";

       setTimeout(() => {
         this.$router.push({ name: "Home" });
       }, 1000);

      } catch (error) {
        console.log(error)
      }
      
    },
  },
};
</script>


<style>
.map-container-section {
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
}
.map-container-section iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>