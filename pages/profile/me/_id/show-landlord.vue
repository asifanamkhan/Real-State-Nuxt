<template>
  <div>
    <div class="page-search">
      <div>
        <div class="form-group">
          <h5>Landlord Details</h5>
        </div>
      </div>
    </div>
    <div>
      <b-row>
        <b-col md="8">
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
                <td>Mobile</td>
                <td>{{ landlord.mobile }}</td>
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
              <tr>
                <td>Description</td>
                <td>{{ landlord.description }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col md="4">
          <b-img thumbnail :src="imageUrl + landlord.image" alt="Lanloard image"
            style="object-fit: cover; height: 180px; width: 100%;"></b-img>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "show-landlord",
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
      image: ''
    }
  },
  async created() {
    const response = await this.$axios.$post('profile/show', {
      landlordId: this.$route.params.id,
    });
    this.landlord = response.data;
    this.division = this.landlord.division.name;
    this.district = this.landlord.district.name;
    this.thana = this.landlord.thana.name;
    this.image = response.data.media;
  },
}
</script>

<style scoped>

</style>
