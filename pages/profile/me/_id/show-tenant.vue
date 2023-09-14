<template>
  <div>
    <div class="page-search">
      <div>
        <div class="form-group">
          <h5>Tenant Details</h5>
        </div>
      </div>

      <div>
        <div class="form-group d-flex">
          <div class="mx-2">
            <nuxt-link class="btn btn-sm btn-info btn-simple" title="Review for tenant"
              :to="{ name: 'profile-me-id-tenant-review', params: { id: this.$route.params.id } }">
              <b-icon icon="star-fill" aria-hidden="true" style="margin-bottom: 2px;"></b-icon>
              Review
            </nuxt-link>
          </div>
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
                <td>{{ tenant.name }}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{{ tenant.email }}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{{ tenant.mobile }}</td>
              </tr>
              <tr>
                <td>NID</td>
                <td>{{ tenant.nid }}</td>
              </tr>
              <tr>
                <td>Passport</td>
                <td>{{ tenant.passport_no }}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td v-if="tenant.gender === 1">Male</td>
                <td v-if="tenant.gender === 2">Female</td>
                <td v-if="tenant.gender === 2">Others</td>
              </tr>
              <tr>
                <td>Date of birth</td>
                <td>{{ tenant.dob }}</td>
              </tr>
              <tr>
                <td>Marital Status</td>
                <td v-if="tenant.marital_status === 1">Married</td>
                <td v-if="tenant.marital_status === 2">Unmarried</td>
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
                <td>Physical Address</td>
                <td>{{ tenant.physical_address }}</td>
              </tr>
              <tr>
                <td>Postal Address</td>
                <td>{{ tenant.postal_address }}</td>
              </tr>
              <tr>
                <td>Postal Code</td>
                <td>{{ tenant.postal_code }}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col md="4">
          <b-img thumbnail :src="imageUrl + image" alt="Tenant image"
            style="object-fit: cover; height: 180px; width: 100%;"></b-img>
          <div class="mt-5">
            <label for="rating-10">Rating</label>
            <b-form-rating v-model="rating" color="#ff9800" readonly></b-form-rating>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "show-tenant",
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  data() {
    return {
      'tenant': '',
      'division': '',
      'district': '',
      'thana': '',
      'image': '',
      'rating': ''
    }
  },
  async created() {
    const response = await this.$axios.$post('profile/tenant/show', {
      tenantId: this.$route.params.id,
    });

    this.tenant = response.data.tenant;
    this.division = response.data.tenant.division.name;
    this.district = response.data.tenant.district.name;
    this.thana = response.data.tenant.thana.name;
    this.image = response.data.tenant.image;
    this.rating = response.data.rating;
  },
}
</script>

<style scoped>

</style>
