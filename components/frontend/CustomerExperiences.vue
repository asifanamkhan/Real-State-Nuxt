<template>
  <div>
    <section id="customer-experiences">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>Customer Experiences</h2>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores</p>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col v-for="(customerExperience, i) in customerExperiences" :key="i" lg="4" md="6" sm="12">
            <div class="customer-video">
              <iframe width="100%" height="220px" :src="customerExperience.video_link"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    name: "CustomerExperiences",
    data() {
      return {
        customerExperiences: ''
      }
    },
    async created() {
      const response = await this.$axios.$get('get-property-page-data');
      this.customerExperiences = response.data;
    },
  }
</script>

<style scoped>

</style>
