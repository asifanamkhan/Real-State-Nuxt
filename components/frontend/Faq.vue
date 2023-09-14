<template>
  <div>
    <section id="faq">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>Frequently Asked Questions</h2>
            </div>
          </b-col>
        </b-row>

        <div class="accordion" role="tablist">
          <b-card v-for="(faq, i) in faqs" :key="i" no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle="'accordion-'+faq.id" variant="info">
                {{ faq.title }}
              </b-button>
            </b-card-header>
            <b-collapse :id="'accordion-'+faq.id" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{ faq.description }}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    name: "Faq",
    data() {
      return {
        faqs: ''
      }
    },
    async created() {
      const response = await this.$axios.$get('get-property-faq-data');
      this.faqs = response.data;
    },
  }
</script>

<style scoped>

</style>
