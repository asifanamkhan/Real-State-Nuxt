<template>
  <div>
    <section id="place">
      <b-container>
        <b-row class="row justify-content-center">
          <b-col lg="7" md="10" class="text-center">
            <div class="section-heading center">
              <h2>Latest Properties</h2>
              <div class="latest-properties-radio">
                <b-row class="my-4">
                  <b-col lg="12" md="12" sm="12">
                    <b-form-radio-group @change="typeChange" id="btn-radios-2" v-model="sale_type" :options="options"
                      button-variant="outline-dark" size="lg" name="radio-btn-outline" buttons
                      class=""></b-form-radio-group>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row class="place-layout" v-if="propertiesAds.length > 0">
          <div class="gallery">
            <Slick ref="slick" :options="slickOptions" v-if="propertiesAds.length > 0">
              <div v-for="(propertiesAd, index) in propertiesAds" :key="index">
                <div class="place-layout-listing">
                  <div class="place-layout-listing-img">
                    <div class="place-layout-listing-img-slide">
                      <div v-if="propertiesAd.property.media.length > 0">
                        <nuxt-link :to="{ name: 'property-id-show', params: { id: propertiesAd.id } }">
                          <b-img :src="propertiesAd.property.media[0].original_url" :alt="propertiesAd.property.name">
                          </b-img>
                        </nuxt-link>
                      </div>
                      <div v-else>
                        <b-img :src="imageUrl + 'property/no-image.png'" alt="Image 1">
                        </b-img>
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
                          <span class="sale-type rent" v-if="propertiesAd.property.sale_type == 1">Rent</span>
                          <span class="sale-type sale" v-if="propertiesAd.property.sale_type == 2">Sale</span>
                          <h6 class="card-price">{{ propertiesAd.rent_amount }} Taka Only</h6>
                        </div>
                      </div>
                    </div>
                    <div class="place-layout-listing-detail-name">
                      <nuxt-link :title="propertiesAd.property.name"
                        :to="{ name: 'property-id-show', params: { id: propertiesAd.id } }">
                        {{ propertiesAd.property.name }}
                      </nuxt-link>
                    </div>
                    <!--                      <div class="rating-wrap">-->
                    <!--                        <div class="rating">-->
                    <!--                          <div class="product-rate" width="70%">-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-star"/>-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-star"/>-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-star"/>-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-star"/>-->
                    <!--                            <font-awesome-icon icon="fa-solid fa-star-half"/>-->
                    <!--                          </div>-->
                    <!--                        </div>-->
                    <!--                        <span class="reviews-text">(2 Reviews)</span>-->
                    <!--                      </div>-->
                  </div>
                  <div class="place-layout-listing-features">
                    <div class="features-list">
                      <div class="features-list-icon">
                        <div class="fleat-icon">
                          <font-awesome-icon icon="fa-solid fa-bed" />
                        </div>
                        {{ propertiesAd.property.bed_rooms }} Bed
                      </div>

                      <div class="features-list-icon">
                        <div class="fleat-icon">
                          <font-awesome-icon icon="fa-solid fa-bath" />
                        </div>
                        {{ propertiesAd.property.bath_rooms }} Bath
                      </div>

                      <div class="features-list-icon">
                        <div class="fleat-icon">
                          <font-awesome-icon icon="fa-solid fa-arrows-up-down-left-right" />
                        </div>
                        {{ propertiesAd.property.area_size }} m²
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
                      <nuxt-link class="product-view"
                        :to="{ name: 'property-id-show', params: { id: propertiesAd.id } }">
                        View
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </Slick>
          </div>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import Slick from 'vue-slick';

export default {
  name: "Place",
  props: ['propertyData'],
  components: { Slick },
  data() {
    return {
      slickOptions: {
        infinite: true,
        autoplay: true,
        lazyLoad: 'ondemand',
        slidesToShow: '',
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          },
        ]
      },
      options: [
        { text: 'To Rent', value: '1' },
        { text: 'For Sale', value: '2' }
      ],
      slide: 0,
      sale_type: '',
      propertiesAds: [],
    }
  },
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  async created() {
    const propertiesAds = await this.$axios.$post('property/ad/active-property/list');
    this.propertiesAds = propertiesAds.data;

    if (this.propertiesAds.length == 1) {
      this.slickOptions.slidesToShow = 1;
    } else if (this.propertiesAds.length == 2) {
      this.slickOptions.slidesToShow = 2;
    } else {
      this.slickOptions.slidesToShow = 3;
    }
  },

  methods: {
    async typeChange() {
      this.propertiesAds = '';
      const propertiesAds = await this.$axios.$post('property/ad/active-property/list-as-type', {
        type: this.sale_type
      });

      this.propertiesAds = propertiesAds.data;

      if (this.propertiesAds.length == 1) {
        this.slickOptions.slidesToShow = 1;
      } else if (this.propertiesAds.length == 2) {
        this.slickOptions.slidesToShow = 2;
      } else {
        this.slickOptions.slidesToShow = 3;
      }
    },

    async wishlistStore(propertyAdId) {
      if (this.$auth.loggedIn && this.$auth.user.tenant_id) {
        this.$axios.$post('wishlist/store', { propertyAdId: propertyAdId, tenantId: this.$auth.user.tenant_id })
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
      }
      else {
        this.$izitoast.warning({
          title: 'Warning !!',
          message: 'Please login as tenant !'
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
