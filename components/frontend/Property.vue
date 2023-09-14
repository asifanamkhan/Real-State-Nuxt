<template>
  <div>
    <section id="place">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>PROPERTIES</h2>
            </div>
          </b-col>
        </b-row>

        <b-row class="place-layout" v-if="properties.length > 0">
          <b-col md="4" class="gallery" v-for="(property, index) in properties" :key="index">
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
        </b-row>

        <div class="d-flex justify-content-end">
          <nuxt-link class="btn btn-sm btn-outline-primary" :to="{ name: 'properties' }">
            View all
            <font-awesome-icon icon="ml-2 fa-solid fa-arrow-right" />
          </nuxt-link>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "Place",
  data() {
    return {
      properties: []
    }
  },
  async created() {
    this.properties = this.$store.getters['frontend-data/getProperties'];
  },
  methods: {
    wishlistStore(id) {
      if (this.$auth.loggedIn) {
        this.$axios.$post('wishlist/store', { property_ad_id: id, user_id: this.$auth.user.id })
          .then(response => {
            if (!response.data.status) {
              this.$izitoast.warning({
                title: 'Warning !!',
                message: 'Property already has on your wishlist.'
              });
            } else {
              this.$store.dispatch('wishlist/increaseWishlist');
              this.$izitoast.success({
                title: 'Success !!',
                message: 'Property added successfully on your wishlist.',
              });
            }
          }).catch(error => {
            alert(error);
          })
      }else {
        this.$izitoast.warning({
          title: 'Warning !!',
          message: 'Please login first!'
        });
      }
    }
  }
}
</script>

<style>

</style>
