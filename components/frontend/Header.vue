<template>
  <div>
    <header class="header header-light head-shadow">
      <b-container>
        <b-navbar class="header-navber" toggleable="lg">
          <nuxt-link :to="{ name: 'index'}" class="navbar-brand-logo">
            <img :src="logo" alt="logo" width="150px" height="45px">
          </nuxt-link>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="custom-navbar">
              <li class="nav-item">
                <nuxt-link to="/" class="nav-link">
                  Home
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{ name: 'about-us'}" class="nav-link">
                  About us
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :to="{ name: 'contact-us'}" class="nav-link">
                  Contact us
                </nuxt-link>
              </li>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto navigation-right">
              <li class="nav-item navigation-right-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'property-your-property'}">
                  <font-awesome-icon class="mr-2" icon="fa-solid fa-upload"/>
                  Add Property
                </nuxt-link>
              </li>

              <nuxt-link v-if="!$auth.loggedIn"
                class="btn sign-in-button"
                :to="{ name: 'login'}">
                <font-awesome-icon icon="fa-solid fa-user"/>
                Sign In
              </nuxt-link>

              <nuxt-link v-else class="btn sign-in-button" :to=" { name: 'profile-dashboard'}">
                <font-awesome-icon icon="fa-solid fa-address-card" />
                Profile
              </nuxt-link>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-container>
    </header>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
          logo:'',
      }
    },
    created() {
      this.logo = this.$store.getters['frontend-data/getLogo'];
    }
  }
</script>

<style scoped>

</style>
