<template>
  <div>
    <section>
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="6">
            <div class="auth-content">
              <div class="auth-content-body">
                <h2 class="text-center">Login</h2>
                <br>
                <div class="login-form">
                  <p v-if="active" class="text-danger">
                    Your account is not activated yet. please contact with admin
                  </p>
                  <p v-if="validation" class="text-danger">
                    Credentials does not match. Please register or contact with admin
                  </p>
                  <b-form class="simple-form">
                    <b-form-group label="Mobile">
                      <div class="input-with-icon">
                        <b-form-input type="text" v-model="form.mobile" placeholder="Mobile"></b-form-input>
                        <b-icon icon="person"></b-icon>
                      </div>
                      <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile">
                        {{ errors.mobile[0] }}
                      </strong>
                    </b-form-group>

                    <b-form-group label="Password">
                      <div class="input-with-icon">
                        <b-form-input type="password" v-model="form.password" placeholder="Password"></b-form-input>
                        <b-icon icon="unlock"></b-icon>
                      </div>
                      <strong class="text-danger" style="font-size: 12px" v-if="errors.password">
                        {{ errors.password[0] }}
                      </strong>
                    </b-form-group>

                    <b-form-group>
                      <b-row>
                        <b-col md="6">
                          <b-form-checkbox>
                            Remember Me
                          </b-form-checkbox>
                        </b-col>
                        <b-col md="6" class="text-md-center">
                          <b-link class="text-danger">Forgot Your Password?</b-link>
                        </b-col>
                      </b-row>
                    </b-form-group>

                    <b-form-group>
                      <b-button @click="userLogin" block class="btn btn-browse-more">Login</b-button>
                    </b-form-group>

                    <b-form-group class="text-center">
                      <p>
                        Don't have an account?
                        <nuxt-link class="text-danger" :to="{ name: 'auth-register' }">
                          Register a new account
                        </nuxt-link>
                      </p>
                    </b-form-group>

                    <!-- <div class="text-center">
                      <div class="auth-divider">
                        <span>Or login via</span>
                      </div>
                      <div class="social-button">
                        <b-button class="btn social-button-login facebook" @click="socialLogin('facebook')">
                          <i class='bx bxl-facebook'></i>
                        </b-button>
                        <b-button @click="socialLogin('google')" class="btn social-button-login gmail">
                          <img src="../assets/frontend/images/gmail_Icon.png" alt="Gmail icon" width="55">
                        </b-button>
                      </div>
                    </div> -->
                  </b-form>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  auth: false,
  validation: false,
  created() {
    if (this.$auth.loggedIn) {
      this.$nuxt.$options.router.push({ name: 'profile-dashboard' })
    }
  },
  data() {
    return {
      active: false,
      validation: false,
      form: {
        mobile: '01611992112',
        password: '123456',
      },
      errors: {}
    }
  },

  methods: {
    async userLogin() {
      await this.$auth.loginWith('local', { data: this.form })
        .then(response => {
          if (response.data.status == false) {
            this.validation = false;
            this.active = true;

            this.$izitoast.success({
              title: 'Error',
              message: 'Credentials does not matched'
            })
          } else {
            this.$izitoast.success({
              title: 'Success',
              message: 'successfully logged in'
            })
            const path = this.$nuxt.context.from;

            if (path && path.name == 'property-id-show') {
              this.$nuxt.$options.router.push({ name: 'property-id-show', params: { id: path.params.id } });
            } else {
              this.$nuxt.$options.router.push({ name: 'profile-dashboard' });
            }
          }
        }).catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            this.active = false;
            this.validation = true;
          }
        });
    }
  }
}
</script>

<style scoped></style>
