<template>
  <div>
    <div class="page-search">
      <div>
        <div class="form-group">
          <h5>Landlord Details</h5>
        </div>
      </div>

      <div>
        <div class="form-group">
          <nuxt-link class="btn btn-sm btn-info btn-simple" title="Review for landlord"
            :to="{ name: 'profile-property-id-landlord-review', params: { id: this.$route.params.id, landlordId: landlord.id } }">
            <b-icon icon="star-fill" aria-hidden="true" style="margin-bottom: 2px;"></b-icon>
            Review
          </nuxt-link>

          <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property' }">
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            Back to list
          </nuxt-link>
        </div>
      </div>
    </div>

    <b-row>
      <b-col md="9">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{{ landlord.name }}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ landlord.email }}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{{ landlord.mobile }}</td>
            </tr>
            <tr>
              <td>Nid</td>
              <td>{{ landlord.nid }}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{{ landlord.status ? 'Active' : 'Inactive' }}</td>
            </tr>
            <tr>
              <td>Division</td>
              <td>{{ division }}</td>
            </tr>
            <tr>
              <td>District</td>
              <td>{{ district }}</td>
            </tr>
            <tr>
              <td>Thana</td>
              <td>{{ thana }}</td>
            </tr>
            <tr>
              <td>Postal address</td>
              <td>{{ landlord.postal_address }}</td>
            </tr>
            <tr>
              <td>Residential address</td>
              <td>{{ landlord.residential_address }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>

      <b-col md="3">
        <b-img thumbnail :src="imageUrl + image" alt="Landlord Image"
          style="object-fit: cover; height: 150px; width: 100%;"></b-img>
        <div class="mt-5">
          <label for="rating-10">Rating</label>
          <b-form-rating v-model="rating" color="#ff9800" readonly></b-form-rating>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "landlord",
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  data() {
    return {
      landlord: '',
      division: '',
      district: '',
      thana: '',
      image: '',
      rating: ''
    }
  },
  async created() {
    await this.$axios.$get('property/landlord/details/' + this.$route.params.id)
      .then((response) => {
        this.landlord = response.data.landlord;
        this.division = response.data.landlord.division.name;
        this.district = response.data.landlord.district.name;
        this.thana = response.data.landlord.thana.name;
        this.image = response.data.landlord.image;
        this.rating = response.data.rating;
      })
  }
}
</script>

<style scoped>

</style>
