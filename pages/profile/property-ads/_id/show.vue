<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Property Ad Details">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property-ads' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <table class="table table-bordered table-hover">
        <tbody>
        <tr>
          <td>Property Name</td>
          <td>{{ property.name }}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>{{ (property.property_category == 1) ? 'Commercial' : 'Residential' }}</td>
        </tr>
        <tr>
          <td>Sale Type</td>
          <td>{{ (property.sale_type == 1) ? 'For Rent' : 'For Sale' }}</td>
        </tr>
        <tr>
          <td>Ad Start Date</td>
          <td>{{ property.start_date }}</td>
        </tr>
        <tr>
          <td>Ad End Date</td>
          <td>{{ property.end_date }}</td>
        </tr>
        <tr>
          <td>Rent/Sale Amount</td>
          <td>{{ property.rent_amount }}</td>
        </tr>
        <tr>
          <td>Rent/Sale Security money</td>
          <td>{{ property.security_money }}</td>
        </tr>
        <tr>
          <td>Descriptions</td>
          <td> {{ property.description }}</td>
        </tr>
        </tbody>
      </table>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
export default {
  layout: 'dashboard',
  name: "show",
  components: { MainCard },
  data() {
    return {
      isLoading: true,
      property: ''
    }
  },
  async created() {
    await this.$axios.$post('property/ad/get-ad-details', {id: this.$route.params.id})
      .then(response => {
        this.property = response.data.propertyAd;
        this.isLoading = false;
      }).catch(error => {
        alert(error);
      });
  }
}
</script>

<style scoped>

</style>
