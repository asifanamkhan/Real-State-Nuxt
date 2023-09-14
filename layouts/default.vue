<template>
  <div>
    <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <b-spinner style="width: 4rem; height: 4rem;"></b-spinner>
    </div>
    <div v-else id="wrapper">
      <!-- Start Top Bar -->
      <Topbar />
      <!-- End Top Bar -->

      <!-- Start Navigation -->

      <Header />

      <!-- End Navigation -->

      <Nuxt />

      <!-- Start Footer -->
      <Footer />
      <!-- End Footer -->
    </div>
  </div>
</template>

<script>

import Topbar from "@/components/frontend/Topbar";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

export default {
  name: "default",
  components: { Footer, Header, Topbar },
  data() {
    return {
      foo: '',
      footerData: {},
      user_id: '',
      loading: true
    }
  },
  async created() {
    await this.$axios.post('home', { userId: this.user_id })
      .then(response => {
        this.loading = false;
        this.$store.dispatch('frontend-data/getData', response.data.data);
      }).catch(error=> {
        alert(error);
      })
  },
  methods: {
    // async fetch() {
    //   if (this.$auth.loggedIn && this.$auth.user.tenant_id) {
    //     this.user_id = this.$auth.user.id;
    //   }
    //   await this.$axios.post('get-frontend-data', { userId: this.user_id })
    //     .then(res => {
    //       this.$store.dispatch('frontend-data/storeFrontend', res.data.data.frontendData);

    //       this.$store.dispatch('wishlist/storeWishlist',
    //         res.data.data.wishlistCount ? res.data.data.wishlistCount : 0
    //       );

    //       if (res.data.data.frontendData.media.length > 0) {
    //         for (const element of res.data.data.frontendData.media) {
    //           if (element.collection_name == "logo") {
    //             this.$store.dispatch('frontend-data/storeLogo', element.original_url);
    //           }
    //           if (element.collection_name == "footerLogo") {
    //             this.$store.dispatch('frontend-data/storeFooterLogo', element.original_url);
    //           }

    //           if (element.collection_name == "banner") {
    //             this.$store.dispatch('frontend-data/storeBanner', element.original_url);
    //           }
    //         }
    //       }
    //     })
    //     .then(() => {
    //       this.loading = false;
    //     });
    // }
  }
}
</script>

<style scoped>

</style>
