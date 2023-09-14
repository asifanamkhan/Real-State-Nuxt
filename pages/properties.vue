<template>
  <div>
    <!-- Search -->
    <Search @search="searchProperties" />
    <!-- /. Search -->

    <b-container>
      <div v-if="isLoading" class="d-flex justify-content-center mt-5 mb-3">
        <p>Loading...</p>
      </div>

      <div v-else class="mt-5">
        <b-row class="place-layout" v-if="propertiesLoaded.length > 0">
          <b-col md="4" class="gallery" v-for="(property, index) in propertiesLoaded" :key="index">
            <div class="place-layout-listing">
              <div class="place-layout-listing-img">
                <div class="place-layout-listing-img-slide">
                  <nuxt-link :to="{ name: 'property-id-show', params: { id: property.id } }">
                    <b-img v-for="(image, i) in property.property_image" :key="i" :src="image.original_url"
                      :alt="property.property_name">
                    </b-img>
                  </nuxt-link>
                </div>
                <div class="place-layout-listing-img-action">
                  <b-link @click="wishlistStore(property.id)" class="add-to-wishlist">
                    <font-awesome-icon icon="fa-solid fa-heart" />
                  </b-link>
                </div>
              </div>
              <div class="place-layout-listing-detail">
                <div class="place-layout-listing-detail-wrap">
                  <div class="place-layout-listing-detail-wrap-short">
                    <div class="list-price d-flex justify-content-between">
                      <span class="sale-type rent" v-if="property.sale_type == 1">Rent</span>
                      <span class="sale-type sale" v-if="property.sale_type == 2">Sale</span>
                      <h6 class="card-price">৳{{ property.rent_amount }}</h6>
                    </div>
                  </div>
                </div>
                <div class="place-layout-listing-detail-name">
                  <nuxt-link :title="property.name" :to="{ name: 'property-id-show', params: { id: property.id } }">
                    {{ property.name }}
                  </nuxt-link>
                </div>
                <div class="rating-wrap">
                  <div class="rating">
                    <div class="product-rate" width="70%">
                      <font-awesome-icon icon="fa-solid fa-star" />
                      <font-awesome-icon icon="fa-solid fa-star" />
                      <font-awesome-icon icon="fa-solid fa-star" />
                      <font-awesome-icon icon="fa-solid fa-star" />
                      <font-awesome-icon icon="fa-solid fa-star-half" />
                    </div>
                  </div>
                  <span class="reviews-text">(2 Reviews)</span>
                </div>
              </div>
              <div class="place-layout-listing-features">
                <div class="features-list">
                  <div class="features-list-icon">
                    <div class="fleat-icon">
                      <font-awesome-icon icon="fa-solid fa-bed" />
                    </div>
                    {{ property.bed_rooms }} Bed
                  </div>
                  <div class="features-list-icon">
                    <div class="fleat-icon">
                      <font-awesome-icon icon="fa-solid fa-bath" />
                    </div>
                    {{ property.bath_rooms }} Bath
                  </div>
                  <div class="features-list-icon">
                    <div class="fleat-icon">
                      <font-awesome-icon icon="fa-solid fa-arrows-up-down-left-right" />
                    </div>
                    {{ property.area_size }} m²
                  </div>
                </div>
              </div>
              <div class="place-layout-listing-footer">
                <div class="footer-first">
                  <div class="footer-first-location d-flex">
                    <font-awesome-icon class="mr-1" icon="fa-solid fa-location-dot" />
                    {{ property.address }}
                  </div>
                </div>
                <div class="footer-flex">
                  <nuxt-link class="product-view" :to="{ name: 'property-id-show', params: { id: property.id } }">
                    View
                  </nuxt-link>
                </div>
              </div>
            </div>
          </b-col>

          <b-col v-show="showLoadMore" v-if="propertiesLoaded.length >= 6" md="12" class="d-flex justify-content-center items-center mb-5 mt-3">
            <b-link class="btn btn-sm btn-browse-more" @click="loadMore">Load More</b-link>
          </b-col>
        </b-row>

        <b-row v-else class="mb-5">
          <b-col md="12">
            <b-alert show variant="warning">Property Not Found!</b-alert>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import Search from "@/components/frontend/Search";
export default {
  name: 'properties-all',
  auth: false,
  components: { Search },
  data() {
    return {
      isLoading: true,
      showLoadMore: true,
      properties: [],
      length: 6,
    }
  },
  async created() {
    await this.$axios.post('properties')
      .then(response => {
        this.properties = response.data.data.properties;
        this.isLoading = false;
      }).catch(error => {
        alert(error);
      });
  },
  methods: {
    async searchProperties(data) {
      this.isLoading = true;
      await this.$axios.post('properties', data)
        .then(response => {
          this.properties = response.data.data.properties;
          this.isLoading = false;
        }).catch(error => {
          alert(error);
        });
    },
    loadMore() {
      if (this.length > this.properties.length) {
        this.showLoadMore = false;
      };
      this.length = this.length + 3;
    },
  },
  computed: {
    propertiesLoaded() {
      return this.properties.slice(0, this.length);
    },
  },
}
</script>

<style>
.properties-title {
  font-size: 1.5rem;
}
</style>
