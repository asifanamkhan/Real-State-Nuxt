<template>
  <div>
    <div class="page-title" style="background-image: url('https://i.im.ge/2022/07/27/Fi9Cj6.png')">
      <b-container>
        <b-row class="justify-content-center">
          <b-col md="12">
            <div class="full-search-2 eclip-search italian-search hero-search-radius shadow-hard">
              <div class="hero-search-content">
                <form @submit.prevent="searchStore" method="POST">
                  <b-row>
                    <b-col md="3">
                      <b-form-group label="Min Price" label-for="min_price">
                        <select v-model="form.min_price" class="form-control custom-input-control" id="min_price">
                          <option value="">No Min</option>
                          <option value="5000">5000</option>
                          <option value="10000">10000</option>
                          <option value="20000">20000</option>
                          <option value="50000">50000</option>
                          <option value="100000">100000</option>
                          <option value="1000000">1000000</option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Max Price" label-for="max_price">
                        <select v-model="form.max_price" class="form-control custom-input-control" id="max_price">
                          <option value="">No Max</option>
                          <option value="10000">10000</option>
                          <option value="20000">20000</option>
                          <option value="50000">50000</option>
                          <option value="100000">100000</option>
                          <option value="1000000">1000000</option>
                          <option value="2000000">2000000</option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Property Category" label-for="property_category">
                        <select v-model="form.property_category" class="form-control custom-input-control"
                          id="property_category">
                          <option value="1">Commercial</option>
                          <option value="2">Residential</option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Property Type" label-for="property_type">
                        <select v-model="form.property_type_id" class="form-control custom-input-control">
                          <option value="">Select</option>
                          <option v-for="(type, i) in propertyTypes" :key="i" :value="type.id">
                            {{ type.name }}
                          </option>
                        </select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="3">
                      <b-form-group label="Sale/Lease Type" label-for="sale_lease_type">
                        <select v-model="form.sale_type" class="form-control custom-input-control" id="sale_lease_type">
                          <option value="1">For Rent</option>
                          <option value="2">For Sale</option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Select divisions" label-for="division_id">
                        <select @change="getDistricts(form.division_id)" v-model="form.division_id" id=""
                          class="form-control custom-input-control">
                          <option value="">Select</option>
                          <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                            {{ division.name }}
                          </option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Select district" label-for="district_id">
                        <select @change="getThanas(form.district_id)" v-model="form.district_id" id=""
                          class="form-control custom-input-control">
                          <option value="">Select</option>
                          <option v-for="(district, i) in districts" :value="district.id" :key="i">
                            {{ district.name }}
                          </option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col md="3">
                      <b-form-group label="Select Thana" label-for="thana_id">
                        <select v-model="form.thana_id" class="form-control custom-input-control">
                          <option value="">Select</option>
                          <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                            {{ thana.name }}
                          </option>
                        </select>
                        <b-button type="submit" block variant="dark" class="text-center mt-2">Find</b-button>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </form>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <section v-if="propertiesAds.length > 0" id="searchSection">
      <b-container>
        <b-row>
          <b-col md="4" v-for="(propertiesAd, index) in propertiesAds" :key="index" id="search">
            <div class="gallery">
              <div class="place-layout-listing">
                <div class="place-layout-listing-img">
                  <div class="place-layout-listing-img-slide">
                    <div v-if="propertiesAd.property.media.length > 0">
                      <nuxt-link :to="{ name: 'property-id-show', params: { id: propertiesAd.id } }">
                        <b-img :src="propertiesAd.property.media[0].original_url" alt="Image 1">
                        </b-img>
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="place-layout-listing-img-action">
                    <b-link @click="wishlistStore(propertiesAd.id)" class="add-to-wishlist">
                      <font-awesome-icon icon="fa-solid fa-heart" />
                    </b-link>
                  </div>
                </div>
                <div class="place-layout-listing-detail">
                  <div class="place-layout-listing-detail-wrap">
                    <div class="place-layout-listing-detail-wrap-short">
                      <div class="list-price d-flex justify-content-between">
                        <!--<span class="sale-type rent" v-if="propertiesAd.property.sale_type == 1">Rent</span>-->
                        <span class="sale-type sale">Sale</span>
                        <h6 class="card-price">{{ propertiesAd.rent_amount }} Taka Only</h6>
                      </div>
                    </div>
                  </div>
                  <div class="place-layout-listing-detail-name">
                    <b-link href="#" title="6007 Applegate Lane">
                      {{ propertiesAd.property.name }}
                    </b-link>
                  </div>
                </div>
                <div class="place-layout-listing-features">
                  <div class="features-list">
                    <div class="features-list-icon">
                      <div class="fleat-icon">
                        <font-awesome-icon icon="fa-solid fa-bed" />
                      </div>
                      {{ propertiesAd.property.bed_rooms }}
                    </div>

                    <div class="features-list-icon">
                      <div class="fleat-icon">
                        <font-awesome-icon icon="fa-solid fa-bath" />
                      </div>
                      {{ propertiesAd.property.bath_rooms }}
                    </div>

                    <div class="features-list-icon">
                      <div class="fleat-icon">
                        <font-awesome-icon icon="fa-solid fa-arrows-up-down-left-right" />
                      </div>
                      {{ propertiesAd.property.area_size }}
                    </div>
                  </div>
                </div>
                <div class="place-layout-listing-footer">
                  <div class="footer-first">
                    <div class="footer-first-location d-flex">
                      <font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />
                      {{ propertiesAd.property.address }}
                    </div>
                  </div>
                  <div class="footer-flex">
                    <nuxt-link class="product-view" :to="{ name: 'property-id-show', params: { id: propertiesAd.id } }">
                      View
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- Start newsletter -->
    <Newsletter />
    <!-- End newsletter -->
  </div>
</template>

<script>
import Newsletter from "@/components/frontend/Newsletter";

export default {
  name: "index",
  auth: false,
  components: { Newsletter },
  data() {
    return {
      form: {
        min_price: '',
        sale_type: '',
        max_price: '',
        property_category: '',
        property_type_id: '',
        division_id: '',
        district_id: '',
        thana_id: '',
      },

      thanas: '',
      divisions: '',
      districts: '',
      propertyTypes: '',
      propertiesAds: []
    }
  },
  async created() {
    this.form = this.$store.getters['search/getSearch'];
    //console.log(this.form);
    const propertiesAds = await this.$axios.$post('property/ad/search', this.form);
    this.propertiesAds = propertiesAds.data;

    const propertyTypes = await this.$axios.$get('property/get-property-type');
    this.propertyTypes = propertyTypes.data;

    const divisions = await this.$axios.$get('settings/divisions');
    this.divisions = divisions.data;

  },
  methods: {
    async getDistricts(division_id) {
      this.thanas = '';
      let district = await this.$axios.$post('settings/districts', { divisionId: division_id });
      this.districts = district.data;
    },

    async getThanas(district_id) {
      let thanas = await this.$axios.$post('settings/thanas', { districtId: district_id });
      this.thanas = thanas.data;
    },

    async searchStore() {
      let propertiesAds = await this.$axios.$post('property/ad/search', this.form);
      this.propertiesAds = propertiesAds.data;
      console.log(this.propertiesAds);
    },

    async wishlistStore(propertyAdId) {

      if (this.$auth.loggedIn && this.$auth.user.tenant_id) {
        this.$axios.$post('wishlist/store', { propertyAdId: propertyAdId, tenantId: this.$auth.user.tenant_id })
          .then(response => {
            if (!response.data.status) {
              this.$izitoast.warning({
                title: 'Property already has on your wishlist.'
              });
            } else {
              this.$store.dispatch('wishlist/increaseWishlist');
              this.$izitoast.success({
                title: 'Property added successfully on your wishlist.',
              });

            }
          })
          .catch(error => {
            console.log(error);
          })
      } else {
        this.$izitoast.success({
          title: 'Login in first.'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
