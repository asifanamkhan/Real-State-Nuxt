<template>
  <div>
    <section>
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6" v-if="otp_area">
            <div class="auth-content">
              <div class="auth-content-body">
                <h2 class="text-center">OTP Verification</h2>
                <br>
                <div class="login-form">
                  <b-form class="simple-form" @submit.prevent="register">
                    <div v-if="mobile_area">
                      <b-row>
                        <b-col sm="12">
                          <b-form-group>
                            <div class="input-with-icon">
                              <b-form-input v-model="form.mobile" type="text" placeholder="Phone"></b-form-input>
                              <b-icon icon="telephone"></b-icon>
                            </div>
                            <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile">{{
                                errors.mobile[0]
                              }}</strong>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-form-group>
                        <b-button block @click="sendOTP" class="btn btn-browse-more">Send Code</b-button>
                      </b-form-group>

                      <b-form-group class="text-center mt-2">
                        <p>
                          Have an account already?
                          <nuxt-link
                            class="text-danger"
                            :to="{ name: 'login'}">
                            Login
                          </nuxt-link>
                        </p>
                      </b-form-group>

                      <!-- <div class="text-center">
                        <div class="auth-divider">
                          <span>Or register via</span>
                        </div>
                        <div class="social-button">
                          <b-button @click="socialRegistration('facebook')" class="btn social-button-login facebook">
                            <i class='bx bxl-facebook'></i>
                          </b-button>
                          <b-button @click="socialRegistration('google')" class="btn social-button-login gmail">
                            <img src="../../assets/frontend/images/gmail_Icon.png" alt="Gmail icon" width="55">
                          </b-button>
                        </div>
                      </div> -->
                    </div>

                    <div v-if="otp_code_area">
                      <b-row>
                        <b-col sm="12">
                          <b-form-group>
                            <div class="input-with-icon">
                              <b-form-input type="text" v-model="otp_code" placeholder="Enter OTP Code"></b-form-input>
                              <b-icon icon="telephone"></b-icon>
                            </div>
                            <strong class="text-danger" style="font-size: 12px"
                                    v-if="errors.otp_code">{{ errors.otp_code[0] }}</strong>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-form-group>
                        <b-button block @click="otpVerification" class="btn btn-browse-more">Verify</b-button>
                      </b-form-group>
                      <b-form-group class="text-center">
                        <p @click="resendOTP" class="text-danger" style="cursor: pointer">
                          Resend OTP
                        </p>
                      </b-form-group>
                    </div>
                  </b-form>
                </div>
              </div>
            </div>
          </b-col>

          <b-col md="9" v-if="register_area">
            <div class="auth-content">
              <div class="auth-content-body">
                <h2 class="text-center">Register</h2>
                <br>
                <div class="login-form">
                  <b-form class="simple-form">
                    <b-row>
                      <b-col sm="12" md=12>
                        <b-form-group>
                          <div class="input-with-icon">
                            <b-form-input v-model="form.name" type="text" placeholder="Name"></b-form-input>
                            <b-icon icon="person"></b-icon>
                          </div>
                          <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                              errors.name[0]
                            }}</strong>
                        </b-form-group>
                      </b-col>
                    </b-row>


                    <b-row>
                      <b-col md="6" sm="12">
                        <b-form-group label="Password">
                          <div class="input-with-icon">
                            <b-form-input v-model="form.password" type="password" placeholder="Password"></b-form-input>
                            <b-icon icon="unlock"></b-icon>
                          </div>
                          <strong class="text-danger" style="font-size: 12px" v-if="errors.password">{{
                              errors.password[0]
                            }}</strong>
                        </b-form-group>
                      </b-col>

                      <b-col md="6" sm="12">
                        <b-form-group label="Password">
                          <div class="input-with-icon">
                            <b-form-input v-model="form.password_confirmation" type="password"
                                          placeholder="Confirm Password"></b-form-input>
                            <b-icon icon="unlock"></b-icon>
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>


                    <b-form-group>
                      <b-button @click="register" block class="btn btn-browse-more">Register</b-button>
                    </b-form-group>

                    <b-form-group class="text-center">
                      <p>
                        Have an account already?
                        <nuxt-link
                          class="text-danger"
                          :to="{ name: 'login'}">
                          Login
                        </nuxt-link>
                      </p>
                    </b-form-group>
                  </b-form>
                </div>
              </div>
            </div>
          </b-col>

          <b-col md="6" v-if="register_complete_area">
            <RegCompleteMessage/>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import RegCompleteMessage from "@/components/frontend/registration/RegCompleteMessage";
export default {
  name: "register",
  components: {RegCompleteMessage},
  auth: false,
  data() {
    return {
      join_as_area: true,
      register_area: false,
      register_complete_area: false,
      otp_area: true,
      otp_code_area: false,
      mobile_area: true,
      response_otp_code: '',
      otp_code: '',
      errors: {},
      form: {
        mobile: '',
        name: '',
        otp_code: '',
        email: '',
        password: '',
        type:'2',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async sendOTP() {
      this.form.otp_code =  Math.floor((Math.random() * 9999) + 1000);

      await this.$axios.$post('send-otp', {
        mobile: this.form.mobile,
        otp_code: this.form.otp_code,
      }).then(response => {
          if (response.success == true) {
            this.mobile_area = false
            this.otp_code_area = true
            this.join_as_area = false
            this.response_otp_code = response.data.otp

            this.$izitoast.success({
              title: 'Success !!',
              message: 'An OTP is successfully sent to your mobile'
            })
          }
        }).catch(error => {
          if (error.response.status == 422) {
            this.$izitoast.warning({
              message: 'Please enter a valid mobile number'
            })
            this.errors = error.response.data.errors
          } else {
            this.$izitoast.error({
              title: 'Error !!',
              message: 'Something Error happen. Please Contact with admin'
            })
          }
        })
    },

    async resendOTP() {
      await this.$axios.$post('send-otp', {mobile: this.form.mobile})
        .then(response => {
          if (response.success == true) {
            this.response_otp_code = response.data.otp
            this.$izitoast.success({
              title: 'Success !!',
              message: 'An OTP is successfully sent to your mobile'
            })
          }
        }).catch(error => {
          this.$izitoast.error({
            title: 'Error !!',
            message: 'Something Error happen. Please Contact with admin'
          })
        })
    },

    otpVerification() {
      if (this.form.otp_code == this.otp_code) {
        this.otp_area = false
        this.register_area = true

        this.$swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'OTP code matched successfully. click ok for next step',
        })

      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'OTP code is not matched. please check again or contact with admin',
        })
      }
    },
    async register() {
      await this.$axios.$post('register', this.form)
        .then(response => {
          console.log(response);
          this.register_area = false;
          this.register_complete_area = true;
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }
        })
    },
    // socialRegistration(service){
    //   window.location.href = process.env.APP_SOCIAL_LOGIN_URL+service+'/'+this.form.type
    // }
  }
}
</script>

<style scoped>

</style>
