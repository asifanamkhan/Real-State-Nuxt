<template>
  <div>
    <TopBanner class="d-flex align-items-center">
      <b-container class="d-flex flex-column align-items-center">
        <h1>Contact</h1>
      </b-container>
    </TopBanner>

    <!-- contact -->
    <section id="contact" class="contact">
      <b-container>
        <b-row class="gy-4">
          <div class="col-lg-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class='bx bx-map-alt'></i>
              <h3>Our Address</h3>
              <p>Mohammadpur, Dhaka - 1207</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class='bx bx-envelope'></i>
              <h3>Email Us</h3>
              <p>info@sheanch.com</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-item d-flex flex-column justify-content-center align-items-center">
              <i class='bx bx-phone'></i>
              <h3>Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div>
        </b-row>

        <b-row class="gy-4 mt-4">
          <div class="col-lg-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
              frameborder="0" style="border:0; width: 100%; height: 450px;" allowfullscreen=""></iframe>
          </div>

          <div class="col-lg-6">
            <form action="#" class="contact-form">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="name">Your name</label>
                  <input type="text" class="form-control" id="name" placeholder="Your name">
                </div>
                <div class="form-group col-md-6">
                  <label for="email">Your email</label>
                  <input type="email" class="form-control" id="email" placeholder="Your email">
                </div>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" id="subject" placeholder="Subject">
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea class="form-control" name="message" id="message" rows="5" placeholder="Message"></textarea>
              </div>

              <button type="submit" class="btn btn-sm btn-dark">Send message</button>
            </form>
          </div>
        </b-row>
      </b-container>
    </section>
    <!--./ contact -->

    <!-- Start newsletter -->
    <Newsletter />
    <!-- End newsletter -->
  </div>
</template>

<script>
import TopBanner from "@/components/frontend/TopBanner";
import Newsletter from "@/components/frontend/Newsletter";
export default {
  name: 'contact-us',
  auth: false,
  components: { TopBanner, Newsletter }
}
</script>

<style>
.contact .info-item {
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.08);
  padding: 20px 0 30px 0;
}

.contact .info-item i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  font-size: 24px;
  line-height: 0;
  color: #2d3954;
  border-radius: 50%;
  border: 2px dotted #2d3954;
}

.contact .info-item h3 {
  font-size: 20px;
  color: #6c757d;
  font-weight: 700;
  margin: 10px 0;
}

.contact .info-item p {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

.contact .contact-form {
  width: 100%;
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.08);
  padding: 30px;
}
</style>
