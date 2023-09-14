<template>
  <div>
    <section id="about-property">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>Learn More About Property Selling</h2>
              <p>Read the articles to expand your knowledge about how to sell your flat quickly, find tenants, a
                seller’s
                journey and more</p>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col v-for="(about, i) in aboutPropertySelling" :key="i" lg="4" md="4" class="mb-3">
            <b-card class="y-property-card" :title="about.title"
                    :img-src="imageUrl+about.image" img-alt="Image" img-top>
              <b-card-text>{{ about.description }}</b-card-text>
              <template #footer>
                <small class="text-muted">September 2, 2020</small>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    name: "AboutProperty",
    computed:{
      imageUrl(){
        return `${process.env.APP_ROOT_IMG_URL}`
      }
    },
    data() {
      return {
        aboutPropertySelling: ''
      }
    },
    async created() {
      const response = await this.$axios.$get('get-about-property-selling-data');
      this.aboutPropertySelling = response.data;
    },
  }
</script>

<style scoped>

</style>
