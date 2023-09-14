<template>
  <div>
    <MainCard title="Edit Property">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="update">
        <b-row>
          <b-col md="4">
            <b-form-group label="Property Category">
              <select v-model="form.property_category" class="form-control custom-input-control">
                <option value="">Select</option>
                <option value="1">Commercial</option>
                <option value="2">Residential</option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_category">
                {{ errors.property_category[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Property Types">
              <select v-model="form.property_type_id" class="form-control custom-input-control">
                <option value="">Select</option>
                <option v-for="(type, i) in propertyTypes" :key="i" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_type_id">
                {{ errors.property_type_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Sale/Lease Type">
              <select v-model="form.sale_type" class="form-control custom-input-control">
                <option value="">Select</option>
                <option value="1">For Rent</option>
                <option value="2">For Sale</option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.sale_type">
                {{ errors.sale_type[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Property name">
              <b-form-input v-model="form.name" class="custom-input-control" type="text"
                            placeholder="Property name"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.name">
                {{ errors.name[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Area Size">
              <b-form-input min="1" v-model="form.area_size" class="custom-input-control" type="number"
                            placeholder="Area Size"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.area_size">
                {{ errors.area_size[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Bedroom Quantity (Qty)">
              <b-form-input min="1" v-model="form.bed_rooms" class="custom-input-control" type="number"
                            placeholder="Enter Bedroom Quantity (Qty)"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.bed_rooms">
                {{ errors.bed_rooms[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Bath Rooms (Qty)">
              <b-form-input min="1" v-model="form.bath_rooms" class="custom-input-control" type="number"
                            placeholder="Bath Rooms (Qty)"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.bath_rooms">
                {{ errors.bath_rooms[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Balcony (Qty)">
              <b-form-input min="1" v-model="form.balcony" class="custom-input-control" type="number"
                            placeholder="Balcony (Qty)"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.balcony">
                {{ errors.balcony[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Floor">
              <b-form-input min="1" v-model="form.floor" class="custom-input-control" type="number"
                            placeholder="Enter floor"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.floor">
                {{ errors.floor[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Select division">
              <select @change="getDistricts(form.division_id)" v-model="form.division_id" id=""
                      class="form-control custom-input-control">
                <option value="">Select division</option>
                <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                  {{ division.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.division_id">
                {{ errors.division_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Select district">
              <select @change="getThanas(form.district_id)" v-model="form.district_id" id=""
                      class="form-control custom-input-control">
                <option value="">Select district</option>
                <option v-for="(district, i) in districts" :value="district.id" :key="i">
                  {{ district.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.district_id">
                {{ errors.district_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Select Thana">
              <select v-model="form.thana_id" class="form-control custom-input-control">
                <option value="">Select Thana</option>
                <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                  {{ thana.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.thana_id">
                {{ errors.thana_id[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Rent Amount">
              <b-form-input min="0" v-model="form.rent_amount" class="custom-input-control" type="number"
                            placeholder="Rent Amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.rent_amount">
                {{ errors.rent_amount[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Security money">
              <b-form-input v-model="form.security_money" class="custom-input-control" type="number"
                            placeholder="Security money"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">
                {{ errors.security_money[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Road Number">
              <b-form-input v-model="form.road_number" class="custom-input-control" type="text"
                            placeholder="Road Number"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.road_number">
                {{ errors.road_number[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Zip Code">
              <b-form-input v-model="form.zip_code" class="custom-input-control" type="text"
                            placeholder="Zip Code"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.zip_code">
                {{ errors.zip_code[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group :label="propertyCategory">
              <b-form-input min="1" v-model="form.holding_number" class="custom-input-control" type="text"
                            :placeholder="propertyCategory"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.holding_number">
                {{ errors.holding_number[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Select Area">
              <select v-model="form.area_id" class="form-control custom-input-control">
                <option value="">Select Area</option>
                <option v-for="(area, i) in areas" :key="i" :value="area.id">{{ area.name }}</option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.area_id">
                {{ errors.area_id[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-form-group label="Video Link">
              <b-form-input min="1" v-model="form.video_link" class="custom-input-control" type="text"
                            placeholder="Enter video link"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.video_link">
                {{ errors.video_link[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group label="Google pam location">
              <b-form-input min="1" v-model="form.google_map_location" class="custom-input-control" type="text"
                            placeholder="Enter google map location"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.google_map_location">
                {{ errors.google_map_location[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-form-group label="Address">
              <b-form-textarea id="address" placeholder="Address" rows="3" v-model="form.address"
                               class="custom-input-control"></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.address">
                {{ errors.address[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-form-group label="Description">
              <b-form-textarea id="description" placeholder="Description..." rows="3" v-model="form.description"
                               class="custom-input-control"></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.description">
                {{ errors.description[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Add Utilities -->
        <b-row>
          <b-col md="4">
            <b-form-group label="Utilities">
              <select v-model="utility" class="form-control custom-select-form-control" name="" id="">
                <option value="">select</option>
                <option v-for="(utility, n) in utilities" :value="utility" :key="n">
                  {{ utility.name }}
                </option>
              </select>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <div class="button-t-m" style="margin-top: 30px">
              <b-button variant="success" @click="addUtilityRow(utility)">Add utility</b-button>
            </div>
          </b-col>
        </b-row>

        <b-row class="align-items-center" v-for="(utility, n) in form.utilities" :key="utility">
          <b-col md="4">
            <b-form-group label="Utility Name">
              <b-form-input readonly v-model="utility.utility_name" :id="'utility_name' + n" min="1"
                            class="custom-input-control" type="text" placeholder="Area Size">
              </b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">
                {{ errors.security_money[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Paid By">
              <select @click="utilityPaidBy(n, utility)" name="" :id="'utility_paid_by' + n"
                      class="form-control custom-input-control">
                <option :selected="utility.utility_paid_by == 1" value="1">Landlord</option>
                <option :selected="utility.utility_paid_by == 2" value="2">Tenant</option>
              </select>
            </b-form-group>
          </b-col>

          <b-col md="3">
            <b-form-group label="Amount">
              <b-form-input @input="utilityAmount(n, utility)" :id="'utility_amount' + n"
                            v-model="utility.utility_amount" min="1" class="custom-input-control" type="text"
                            placeholder="Amount"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="1" @click="deleteUtilityRow(n, utility)">
            <div class="button-t-m" style="margin-top: 16px;">
              <b-button variant="danger">-</b-button>
            </div>
          </b-col>
        </b-row>
        <!-- End Add Utilities -->

        <!-- Add Facility -->
        <b-row>
          <b-col md="12">
            <b-form-group label="Facilities" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="form.facilitie_ids"
                :options="facilities"
                :aria-describedby="ariaDescribedby"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- End Add Facility -->

        <b-row>
          <b-col md="12">
            <b-form-group label="Image Upload">
              <dropzone id="foo" ref="el" :options="options" @vdropzone-files-added="processFile"
                        @vdropzone-removed-file="fileRemoved" :destroyDropzone="false">
              </dropzone>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group class="mt-3">
          <b-button type="submit" class="btn-browse-more btn-height" variant="info" :disabled="isDisable">Update</b-button>
        </b-form-group>
      </form>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  layout: 'dashboard',
  name: "edit",
  components: { Dropzone, MainCard },
  data() {
    return {
      options: {
        url: "url",
        addRemoveLinks: true,
        headers: { "Authorization": this.$auth.strategy.token.get() },
        // maxFiles: 1,
        autoProcessQueue: false,
        acceptedFiles: ".jpeg,.jpg,.png",
        parallelUploads: 20,
        maxFilesize: 2,
        maxFiles: 20, // Test
      },
      form: {
        status: '',
        name: '',
        user_id: this.$auth.user.id,
        property_category: '',
        property_type_id: '',
        sale_type: '',
        area_size: '',
        bed_rooms: '',
        bath_rooms: '',
        balcony: '',
        floor: '',
        video_link: '',
        rent_amount: '',
        security_money: '',
        holding_number: '',
        zip_code: '',
        thana_id: '',
        district_id: '',
        division_id: '',
        area_id: '',
        address: '',
        google_map_location: '',
        description: '',
        images: [],
        facilitie_ids: [],
        utilities: [],
        oldImages: []
      },
      areas: '',
      isDisable: false,
      propertyTypes: '',
      landlords: '',
      utilities: '',
      utility: '',
      selected: [],
      facilities: [],
      divisions: '',
      districts: '',
      thanas: '',
      errors: {},
    }
  },
  async created() {
    await this.$axios.$post('property/edit', { id: this.$route.params.id })
      .then(res => {
        this.form = res.data.property;
        this.propertyTypes = res.data.propertyTypes;
        this.divisions = res.data.divisions;
        this.districts = res.data.districts;
        this.thanas = res.data.thanas;
        this.utilities = res.data.utilities;
        this.form.utilities = JSON.parse(res.data.property.utilities);
        this.facilities = res.data.facilities;
        this.areas = res.data.areas;
        this.form.facilitie_ids = JSON.parse(res.data.property.facilitie_ids);

        let images = res.data.propertyImages;
        this.form.oldImages = [];

        if (images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            var file = {
              size: images[i].size,
              name: images[i].name,
              url: images[i].url,
              data: images[i].data,
            };
            this.$refs.el.manuallyAddFile(file, images[i].url);
            this.form.oldImages.push(file)
          }
        }
      }).catch(err => {
        alert(err);
      });
  },
  computed: {
    propertyCategory() {
      return this.form.property_category == 1 ? 'Shop Number' : 'Holding Number';
    }
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
    processFile(file) {
      this.form.images = [];
      let image = Array.from(file)
      image.forEach(element => {
        const reader = new FileReader()
        reader.readAsDataURL(element)

        reader.onload = event => {
          const fileObj = {}
          fileObj.name = element.name
          fileObj.description = ''
          fileObj.data = event.target.result
          fileObj.size = (element.size / (1024 * 1024)).toFixed(2)
          fileObj.type = element.type

          this.form.images.push(fileObj)
        }
      })
    },
    fileRemoved(file) {
      if (file.hasOwnProperty('manuallyAdded')) {
        this.form.oldImages = this.form.oldImages.filter(element => element.url !== file.url)
      } else {
        if (file.dataURL) {
          this.form.images = this.form.images.filter(element => element.data !== file.dataURL)
        } else {
          this.form.images = this.form.images.filter(element => element.name !== file.name)
        }
      }
    },
    addUtilityRow(data) {
      if (data) {
        let dataCheck = this.form.utilities.find(element => element.utility_id == data.id);
        if (!dataCheck) {
          this.form.utilities.push({
            'utility_id': data.id,
            'utility_name': data.name,
            'utility_paid_by': '',
            'utility_amount': '',
          })
        }
        else {
          this.$izitoast.warning({
            title: 'Warning !!',
            message: data.name + ' Already added!'
          });
        }
      }
      else {
        this.$izitoast.error({
          title: 'Warning !!',
          message: 'Please select utility first!'
        });
      }
    },
    deleteUtilityRow(index, utility) {
      let idx = this.form.utilities.indexOf(utility);
      if (idx > -1) {
        this.form.utilities.splice(idx, 1);
      }
    },
    utilityPaidBy(n, utility) {
      let paid_by = document.getElementById('utility_paid_by' + n).value
      this.form.utilities[n].utility_paid_by = paid_by;
    },
    utilityAmount(n, utility) {
      let amount = document.getElementById('utility_amount' + n).value
      this.form.utilities[n].utility_amount = amount;
    },
    async update() {
      this.isDisable = true;
      await this.$axios.$post('property/update/' + this.$route.params.id, this.form)
        .then(response => {
          console.log(response);
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property updated successfully!'
          });
          this.isDisable = false;
          this.$router.push({ name: 'profile-property' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }
        })
    }

  }
}
</script>

<style scoped>

</style>
