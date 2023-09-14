<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Profile">
      <template v-slot:actions>
        <nuxt-link class="btn btn-success btn-sm"
                   :to="{ name: 'profile-me-id-change-password', params: { id: $auth.user.id } }">
          <font-awesome-icon icon="fa-solid fa-key" />
          Change password
        </nuxt-link>

        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-dashboard' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to dashboard
        </nuxt-link>
      </template>

      <b-row>
        <b-col md="8">
          <b-form @submit.prevent="update">
            <b-row>
              <b-col lg="6" md="6" sm="12">
                <b-form-group label="Name">
                  <b-form-input class="custom-input-control" v-model="form.name" type="text"
                                placeholder="Name"></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                    errors.name[0]
                    }}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6" sm="12">
                <b-form-group label="Mobile">
                  <b-form-input class="custom-input-control" type="text" v-model="form.mobile"
                                placeholder="Mobile"></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile">{{
                    errors.mobile[0]
                    }}</strong>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="6" md="6" sm="12">
                <b-form-group label="NID">
                  <b-form-input class="custom-input-control" type="text" v-model="form.nid"
                                placeholder="National ID"></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{
                    errors.nid[0]
                    }}</strong>
                </b-form-group>
              </b-col>

              <b-col lg="6" md="6" sm="12">
                <b-form-group label="Email">
                  <b-form-input class="custom-input-control" v-model="form.email" type="email"
                                placeholder="Email"></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                    errors.email[0]
                    }}</strong>
                </b-form-group>
              </b-col>

              <b-col lg="6" md="6" sm="12">
                <b-form-group label="Division">
                  <select @change="getDistricts(form.division_id)" v-model="form.division_id" id="division_id"
                          class="form-control custom-input-control">
                    <option value="">Select</option>
                    <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                      {{ division.name }}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.division_id">{{
                    errors.division_id[0]
                    }}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6" sm="12">
                <b-form-group label="District">
                  <select @change="getThanas(form.district_id)" v-model="form.district_id" id="district_id"
                          class="form-control custom-input-control">
                    <option value="">Select</option>
                    <option v-for="(district, i) in districts" :value="district.id" :key="i">
                      {{ district.name }}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.district_id">{{
                    errors.district_id[0]
                    }}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12" sm="12">
                <b-form-group label="Thana">
                  <select v-model="form.thana_id" id="thana_id" class="form-control custom-input-control">
                    <option value="">Select</option>
                    <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                      {{ thana.name }}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.thana_id">{{
                    errors.thana_id[0]
                    }}</strong>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Postal Address">
              <b-form-textarea class="custom-input-control" id="postal" placeholder="Postal Address..." rows="3"
                               v-model="form.postal_address"></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.postal_address">{{
                errors.postal_address[0]
                }}</strong>
            </b-form-group>

            <b-form-group label="Residential Address">
              <b-form-textarea class="custom-input-control" id="residential" placeholder="Residential Address..."
                               rows="3" v-model="form.residential_address"></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.residential_address">{{
                errors.residential_address[0]
                }}</strong>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" size="sm" variant="dark" :disabled="isDisable">Update</b-button>
            </b-form-group>

          </b-form>
        </b-col>
        <b-col md="4">
          <b-form-group label="Image upload">
            <Dropzone id="foo" ref="el" :options="options" :destroyDropzone="false">
            </Dropzone>
          </b-form-group>
        </b-col>
      </b-row>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';

export default {
  layout: 'dashboard',
  name: "profile",
  components: { Dropzone, MainCard },
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  data() {
    return {
      options: {
        url: "url",
        addRemoveLinks: true,
        headers: { "Authorization": this.$auth.strategy.token.get() },
        maxFiles: 1,
        autoProcessQueue: false,
        acceptedFiles: ".jpeg,.jpg,.png"
      },
      form: {
        name: '',
        mobile: '',
        nid: '',
        email: '',
        image: '',
        oldImage: '',
        thana_id: '',
        district_id: '',
        division_id: '',
        postal_address: '',
        residential_address: ''
      },
      isDisable: false,
      isLoading: true,
      previewImage: null,
      landlord: '',
      divisions: '',
      districts: '',
      thanas: '',
      errors: {}
    }
  },
  async created() {
    await this.$axios.$post('profile', { id: this.$auth.user.id })
      .then(response => {
        this.form = response.data.user;
        this.divisions = response.data.divisions;
        this.districts = response.data.districts;
        this.thanas = response.data.thanas;
        this.isLoading = false;
      }).catch(err => {
        alert(err);
      });
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
    async update() {
      this.isDisable = true;
      await this.$axios.$post('profile/update/' + this.$auth.user.id, this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'user updated successfully!'
          });
          this.isDisable = false;
          this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'profile/image-upload/' + response.data.id;
          this.$refs.el.dropzone.processQueue();
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        })
    },
  }
}
</script>

<style scoped></style>
