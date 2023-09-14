<template>
  <div>
    <section id="how_work">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>HOW DOES IT WORK?</h2>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores</p>
            </div>
          </b-col>
        </b-row>

        <b-row v-if="howToworks.length > 0">
          <b-col v-for="(work, i) in howToworks" :key="i" lg="4" md="4">
            <div class="how-work-icon">
              <div class="how-work-icon-wrap">
                <div class="how-work-icon-wrap-box icon-success">
                  <font-awesome-icon :icon="work.icon" />
                </div>
              </div>
              <div class="how-work-icon-wrap-content">
                <h4>{{ work.title }}</h4>
                <p>{{ work.description }}</p>
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
  name: "Work",
  data() {
    return {
      howToworks: ''
    }
  },
  async created() {
    this.howToworks = this.$store.getters['frontend-data/getWorksWidgets'];
  },
}
</script>
