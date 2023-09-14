<template>
  <div>
    <!-- Start Banner -->
    <Banner :banner="banner"/>
    <!-- End Banner -->

    <!-- Search -->
    <!-- <Search /> -->
    <!-- /. Search -->

    <!-- Start place section -->
    <Property v-if="banner.is_properties"/>
    <!-- End place section -->

    <!-- Start how work section -->
    <Work v-if="banner.is_work"/>
    <!-- End how work section -->

    <!-- Start Location -->
    <!-- <Location/> -->
    <!-- End Location -->

    <!-- Start newsletter -->
    <Newsletter v-if="banner.is_newslater" />
    <!-- End newsletter -->
  </div>
</template>

<script>
import Banner from "@/components/frontend/Banner";
import Work from "@/components/frontend/Work";
import Property from "@/components/frontend/Property";
import Newsletter from "@/components/frontend/Newsletter";
import Search from "@/components/frontend/Search";

export default {
  name: 'IndexPage',
  auth: false,
  components: { Newsletter, Property, Work, Banner, Search },
  data() {
    return {
      banner: {}
    }
  },
  async created() {
    await this.$axios.$post('get-home-page')
      .then(response => {
        this.banner = response.homeData;
      })
      .catch(error => {
        console.error(error);
      });
  },
}
</script>
