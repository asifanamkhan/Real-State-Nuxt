<template>
  <div>
    <!-- Property Hero Section -->
    <TopBanner style="background-image: url('https://i.im.ge/2022/07/27/Fi9Cj6.png')">
      <b-container>
        <b-row class="align-items-center g-5">
          <div class="col-md-6 mb-3">
            <h1 class="display-5 fw-bold lh-1 mb-3 heading-title">
              Rent or Sell <br> Property Online
            </h1>
            <p class="lead">
              Looking to sell property online or are you in search of tenants?
              Do it with ease with the largest real estate marketplace in
              Bangladesh. Start your journey now!
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">

              <nuxt-link class="btn btn-success" v-if="$auth.loggedIn && $auth.user.landlord_id"
                :to="{ name: 'profile-property-create' }">
                Get Started
              </nuxt-link>

              <nuxt-link class="btn btn-success" v-else :to="{ name: 'login' }">
                Get Started
              </nuxt-link>
            </div>
          </div>

          <div class="col-md-6">
            <div class="embed-responsive embed-responsive-16by9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/TXHq199wEbg"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
          </div>
        </b-row>
      </b-container>
    </TopBanner>
    <!--End Property Hero Section -->

    <!-- Customer Experiences Section -->
    <CustomerExperiences />
    <!--End Customer Experiences Section -->

    <!-- FAQ -->
    <Faq />
    <!-- End FAQ -->

    <!-- About Property Section -->
    <AboutProperty />
    <!-- End About Property Section -->

    <!-- Start newsletter -->
    <Newsletter />
    <!-- End newsletter -->
  </div>
</template>

<script>
import TopBanner from "@/components/frontend/TopBanner";
import CustomerExperiences from "@/components/frontend/CustomerExperiences";
import Faq from "@/components/frontend/Faq";
import AboutProperty from "@/components/frontend/AboutProperty";
import Newsletter from "@/components/frontend/Newsletter";

export default {
  name: "your-property",
  auth: false,
  components: { Newsletter, AboutProperty, Faq, CustomerExperiences, TopBanner },
}
</script>

<style scoped></style>
