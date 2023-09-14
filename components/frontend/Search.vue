<template>
  <div>
    <section id="search" class="page-title" style="background-image: url('https://i.im.ge/2022/07/27/Fi9Cj6.png')">
      <b-container fluid>
        <b-row class="justify-content-center">
          <b-col md="12">
            <div class="full-search-2 eclip-search italian-search hero-search-radius shadow-hard">
              <div class="hero-search-content">
                <form @submit.prevent="searchStore">
                  <b-row>
                    <b-col md="1">
                      <b-form-group class="mb-2">
                        <select v-model="form.sale_type" class="form-control" id="sale_lease_type" @change="search">
                          <option value="1">Rent</option>
                          <option value="2">Sale</option>
                        </select>
                      </b-form-group>
                    </b-col>

                    <b-col md="3">
                        <b-input-group class="mb-2">
                          <template #append>
                            <b-input-group-text class="height-fix">
                              <strong class="text-danger"><font-awesome-icon icon="fa-solid fa-location-dot" /></strong>
                            </b-input-group-text>
                          </template>
                          <select v-model="form.area_id" class="form-control mb-2" @change="search">
                            <option value="">Select</option>
                            <option v-for="(area, index) in areas" :key="index" :value="area.id">
                              {{ area.name }}
                            </option>
                          </select>
                        </b-input-group>
                    </b-col>

                    <b-col md="2">
                      <b-form-group>
                        <select v-model="form.property_type_id" class="form-control mb-2" @change="search">
                          <option value="">Select</option>
                          <option v-for="(type, i) in propertyTypes" :key="i" :value="type.id">
                            {{ type.name }}
                          </option>
                        </select>
                      </b-form-group>
                    </b-col>

                    <b-col md="2">
                      <b-form-group>
                        <select v-model="form.min_price" class="form-control mb-2" @change="search">
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

                    <b-col md="2">
                      <b-form-group class="mb-2">
                        <select v-model="form.max_price" class="form-control" @change="search">
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

                    <b-col md="2">
                      <b-button class="filter-btn" block>Filters</b-button>
                    </b-col>
                  </b-row>
                </form>
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
    emits: ['search'],
    data() {
      return {
        form: {
          area_id: '',
          sale_type: '',
          min_price: '',
          max_price: '',
          property_type_id: ''
        },
        propertyTypes: '',
        areas: '',
      }
    },
    async created() {
      this.areas = this.$store.getters['frontend-data/getAreas'];
      this.propertyTypes = this.$store.getters['frontend-data/getTypes'];
    },
    methods: {
      async searchStore() {
        let propertiesAds = await this.$axios.$post('property/ad/search', this.form);
        this.propertiesAds = propertiesAds.data;
      },
      search() {
        this.$emit('search', this.form);
      }
    }
  }
</script>

<style>
  .filter-btn {
    background: #08184b;
    border: none;
  }

  .filter-btn:hover,
  .filter-btn:focus {
    background: #1a2241;
  }

  .filter-btn:active {
    border: none;
  }

  .height-fix {
    height: 38px;
  }
</style>
