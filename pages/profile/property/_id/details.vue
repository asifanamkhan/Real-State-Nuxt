<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Property Details">
      <template v-slot:actions>
        <!--<div v-if="isTenant" class="mx-2">-->
          <!--<nuxt-link class="btn btn-sm btn-info btn-simple" title="Review for property"-->
                     <!--:to="{ name: 'profile-property-id-property-review', params: { id: this.$route.params.id } }">-->
            <!--<b-icon icon="star-fill" aria-hidden="true" style="margin-bottom: 2px;"></b-icon>-->
            <!--Review-->
          <!--</nuxt-link>-->

          <!--<nuxt-link class="btn btn-sm btn-primary btn-simple" title="Show landlord details"-->
                     <!--:to="{ name: 'profile-property-id-landlord', params: { id: this.$route.params.id } }">-->
            <!--<b-icon icon="person-circle" aria-hidden="true" style="margin-bottom: 2px;"></b-icon>-->
            <!--Landlord-->
          <!--</nuxt-link>-->
        <!--</div>-->

        <!--<div v-if="isLandlord">-->
          <!--<nuxt-link class="btn btn-sm btn-success btn-simple"-->
                     <!--:to="{ name: 'profile-property-id-edit', params: { id: this.$route.params.id } }">-->
            <!--<font-awesome-icon icon="fa-solid fa-edit" />-->
            <!--Edit-->
          <!--</nuxt-link>-->
        <!--</div>-->

        <div class="ml-2">
          <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property' }">
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            Back to list
          </nuxt-link>
        </div>
      </template>

      <div>
        <table class="table table-bordered table-hover">
          <tbody>
          <tr>
            <td>Landlord Name</td>
            <td>{{ landlord_name }}</td>
          </tr>
          <tr>
            <td>Thana</td>
            <td>{{ thana_name }}</td>
          </tr>
          <tr>
            <td>District</td>
            <td>{{ district_name }}</td>
          </tr>
          <tr>
            <td>Division</td>
            <td>{{ division_name }}</td>
          </tr>
          <tr>
            <td>Property Type</td>
            <td>{{ property_type_name }}</td>
          </tr>
          <tr>
            <td>Lease Type</td>
            <td>{{ (property.lease_type == 1) ? 'Commercial' : 'Residential' }}</td>
          </tr>
          <tr>
            <td>Sale Type</td>
            <td>{{ (property.sale_type == 1) ? 'For Rent' : 'For Sale' }}</td>
          </tr>
          <tr>
            <td>House No</td>
            <td>{{ property.house_no }}</td>
          </tr>
          <tr>
            <td>ZIP Code</td>
            <td>{{ property.zip_code }}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{{ property.address }}</td>
          </tr>
          <tr>
            <td>Bed Rooms</td>
            <td>{{ property.bed_rooms }}</td>
          </tr>
          <tr>
            <td>Bath Rooms</td>
            <td>{{ property.bath_rooms }}</td>
          </tr>
          <tr>
            <td>Units</td>
            <td>{{ property.units }}</td>
          </tr>
          <tr>
            <td>Area Size</td>
            <td>{{ property.area_size }}</td>
          </tr>
          <tr>
            <td>Rent amount</td>
            <td>৳ {{ property.rent_amount }}</td>
          </tr>
          <tr>
            <td>Security Money</td>
            <td>৳ {{ property.security_money }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td> {{ (property.status == 1) ? 'Active' : 'Inactive' }}</td>
          </tr>
          <tr>
            <td>Descriptions</td>
            <td> {{ property.description }}</td>
          </tr>
          </tbody>
        </table>

        <b-row>
          <b-col md="4" lg="3" sm="12" v-for="(img, i) in images" :key="i">
            <b-img thumbnail fluid :src="img.original_url" :alt="property.name"></b-img>
          </b-col>
        </b-row>

      </div>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
export default {
  layout: 'dashboard',
  name: "details",
  components: { MainCard },
  data() {
    return {
      isLoading: true,
      property: '',
      thana_name: '',
      district_name: '',
      division_name: '',
      property_type_name: '',
      landlord_name: '',
      images: '',
      isLandlord: this.$auth.user.landlord_id ? true : false,
      isTenant: this.$auth.user.tenant_id ? true : false,
    }
  },
  async created() {
    await this.$axios.$get('property/details/' + this.$route.params.id)
      .then(response => {
        this.property = response.data;

        this.images = response.data.media;
        this.thana_name = this.property.thana.name;
        this.district_name = this.property.district.name;
        this.division_name = this.property.division.name;
        this.property_type_name = this.property.property_type.name;
        this.landlord_name = this.property.landlord.name;
        this.isLoading = false;
      }).catch(error => {
        alert(error);
      });
  },
}
</script>

<style scoped>

</style>
