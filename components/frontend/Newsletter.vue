<template>
  <div>
    <section id="newsletter">
      <b-container>
        <b-row>
          <b-col lg="12">
            <div class="newsletter-body">
              <div class="newsletter-body-head">
                <h3>Want to Become a Real Estate Agent?</h3>
                <span>We'll help you to grow your career and growth.</span>
              </div>
              <nuxt-link v-if="!$auth.loggedIn" class="btn newsletter-btn" :to="{ name: 'auth-register' }">
                Sign Up Today
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Newsletter"
  }
</script>

<style scoped>

</style>
