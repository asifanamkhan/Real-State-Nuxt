<template>
  <footer class="dark-footer">
    <div class="pt-5 pb-1">
      <b-container>
        <b-row>
          <b-col md="3">
            <div class="footer-widget">
              <b-img :src="logo" class="footer-widget-img"></b-img>
              <div class="footer-widget-address">
                <p>
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                  {{ data.address }}
                </p>
                <p>
                  <font-awesome-icon icon="fa-solid fa-square-phone-flip" />
                  {{ data.phone }}
                </p>
                <p>
                  <font-awesome-icon icon="fa-solid fa-envelope" />
                  {{ data.email }}
                </p>
              </div>
            </div>
          </b-col>

          <b-col md="6">
            <b-row>
              <b-col sm="4">
                <div class="footer-widget">
                  <h4 class="footer-widget-title">About</h4>
                  <ul>
                    <li>
                      <b-link href="#">About us</b-link>
                    </li>
                    <li>
                      <b-link href="#">Contact us</b-link>
                    </li>
                    <li>
                      <b-link href="#">Terms & Conditions</b-link>
                    </li>
                  </ul>
                </div>
              </b-col>

              <b-col sm="4">
                <div class="footer-widget">
                  <h4 class="footer-widget-title">More Information</h4>
                  <ul>
                    <li>
                      <b-link href="#">All properties</b-link>
                    </li>
                    <li>
                      <b-link href="#">Houses for sale</b-link>
                    </li>
                    <li>
                      <b-link href="#">Houses for rent</b-link>
                    </li>
                  </ul>
                </div>
              </b-col>

              <b-col sm="4">
                <div class="footer-widget">
                  <h4 class="footer-widget-title">News</h4>
                  <ul>
                    <li>
                      <b-link href="#">Latest news</b-link>
                    </li>
                    <li>
                      <b-link href="#">House architecture</b-link>
                    </li>
                    <li>
                      <b-link href="#">House design</b-link>
                    </li>
                    <li>
                      <b-link href="#">Building materials</b-link>
                    </li>
                  </ul>
                </div>
              </b-col>
            </b-row>
          </b-col>

          <b-col md="3">
            <div class="widget-shortcode">
              <div>
                <div class="footer-widget">
                  <h4 class="footer-widget-title">Download Apps</h4>
                  <b-link href="#" class="other-store-link">
                    <div class="other-store-app">
                      <div class="app-icon" title="Download google play store">
                        <b-img width="40" src="../../assets/frontend/images/icons/google-play.png"
                          alt="Google play"></b-img>
                      </div>
                      <!--<div class="app-text">-->
                      <!--Google Play-->
                      <!--<span>Get It Now</span>-->
                      <!--</div>-->
                    </div>
                  </b-link>
                  <b-link href="#" class="other-store-link">
                    <div class="other-store-app">
                      <div class="app-icon" title="Download apple store">
                        <b-img width="40" src="../../assets/frontend/images/icons/app-store.png"
                          alt="Apple store"></b-img>
                      </div>
                      <!--<div class="app-text">-->
                      <!--App Store-->
                      <!--<span>Now it Available</span>-->
                      <!--</div>-->
                    </div>
                  </b-link>
                </div>
              </div>
            </div>

            <div class="footer-widget">
              <h4 class="footer-widget-title">Subscribe</h4>
              <form @submit.prevent="handleSubscriptionStore" method="post">
                <div class="form-group d-flex">
                  <b-form-input v-model="email" name="email" type="email" placeholder="Enter your email"></b-form-input>
                  <b-button class="bg-dark text-white" type="submit">Subscribe</b-button>
                </div>
              </form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <!-- Start Footer Bottom -->
    <div class="footer-bottom">
      <b-container>
        <b-row class="align-items-center">
          <b-col lg="6" md="6">
            <p class="mb-0 footer-text">&copy; 2022 Sheanch. All rights reserved by wardan</p>
          </b-col>

          <b-col lg="6" md="6">
            <ul class="footer-bottom-social">
              <li>
                <b-link href="#" title="facebook">
                  <b-img src="../../assets/frontend/images/icons/facebook.png" alt="facebook" width="15"></b-img>
                </b-link>
              </li>
              <li>
                <b-link href="#" title="twitter">
                  <b-img src="../../assets/frontend/images/icons/twitter.png" alt="facebook" width="15"></b-img>
                </b-link>
              </li>
              <li>
                <b-link href="#" title="instagram">
                  <b-img src="../../assets/frontend/images/icons/instagram.png" alt="facebook" width="15"></b-img>
                </b-link>
              </li>
              <li>
                <b-link href="#" title="linkedin">
                  <b-img src="../../assets/frontend/images/icons/linkedin.png" alt="facebook" width="15"></b-img>
                </b-link>
              </li>
              <li>
                <b-link href="#" title="pinterest">
                  <b-img src="../../assets/frontend/images/icons/pinterest.png" alt="facebook" width="15"></b-img>
                </b-link>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <!-- End Footer Bottom -->
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      email: '',
      logo: '',
      data: ''
    }
  },
  mounted() {
    this.logo = this.$store.getters['frontend-data/getFooterLogo'];
    const footerData = this.$store.getters['frontend-data/getFrontend'];
    this.data = footerData;
  },
  methods: {
    async handleSubscriptionStore() {
      if (this.email === '') {
        this.$izitoast.success({
          title: 'Error',
          message: 'Please enter your valiable email address!'
        })
        return;
      }

      await this.$axios.$post('subscription', { email: this.email })
        .then((response) => {
          this.email = '';
          this.$izitoast.success({
            title: 'Success!',
            message: response.message
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$izitoast.success({
              title: 'Worning!',
              message: error.response.data.errors.email[0]
            })
          }
        })
    }
  }
}
</script>

<style scoped></style>
