<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Edit Property Ads">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="update">
        <b-row>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="Property">
              <select @change="setRent" v-model="form.property_id" id="" class="form-control custom-input-control">
                <option value="">Select</option>
                <option v-for="(property, i) in properties" :sale_type="property.sale_type"
                        :property_category="property.property_category" :security_money="property.security_money"
                        :rent_amount="property.rent_amount" :division_id="property.division_id"
                        :district_id="property.district_id" :thana_id="property.thana_id"
                        :property_type_id="property.property_type_id" :value="property.id" :key="i">
                  {{ property.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_id">{{ errors.property_id[0]
                }}</strong>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="Property category">
              <b-form-input class="custom-input-control" v-model="form.property_category" type="text"
                            placeholder="Property category" readonly>
              </b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_category">{{
                errors.property_category[0]
                }}</strong>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="Rent amount">
              <b-form-input class="custom-input-control" v-model="form.rent_amount" type="text"
                            placeholder="Rent amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.rent_amount">{{ errors.rent_amount[0]
                }}</strong>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="Security money">
              <b-form-input class="custom-input-control" v-model="form.security_money" type="text"
                            placeholder="Rent amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">{{
                errors.security_money[0]
                }}</strong>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="Start date">
              <b-form-input class="custom-input-control" v-model="form.start_date" type="date"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.start_date">{{ errors.start_date[0]
                }}</strong>
            </b-form-group>
          </b-col>

          <b-col lg="6" md="6" sm="12">
            <b-form-group label="End date">
              <b-form-input class="custom-input-control" v-model="form.end_date" type="date"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.start_date">{{ errors.start_date[0]
                }}</strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-form-group label="Description">
              <b-form-textarea class="custom-input-control" v-model="form.description" placeholder="Say something..."
                               rows="3"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group class="mt-3">
          <b-button type="submit" class="btn-browse-more btn-height" variant="info" size="sm" :disabled="isDisable">Update</b-button>
        </b-form-group>
      </form>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
export default {
  layout: 'dashboard',
  name: "edit",
  components: { MainCard },
  data() {
    return {
      form: {
        landlord_name: this.$auth.user.name,
        user_id: this.$auth.user.id,
        sale_type: '',
        property_id: '',
        property_category: '',
        property_category_id: '',
        property_type_id: '',
        division_id: '',
        district_id: '',
        thana_id: '',
        rent_amount: '',
        security_money: '',
        status: '',
        start_date: '',
        end_date: '',
        description: '',
      },
      isDisable: false,
      isLoading: true,
      properties: '',
      errors: {},
    }
  },
  async created() {
    const propertyAdData = await this.$axios.$post('property/ad/get-edit-data', {
      id: this.$route.params.id,
      userId: this.form.user_id
    });
    this.properties = propertyAdData.data.properties;
    this.form = propertyAdData.data.propertyAd;
    this.form.property_category_id = propertyAdData.data.propertyAd.property_category;

    propertyAdData.data.propertyAd.property_category == 1
      ? this.form.property_category = 'Commercial'
      : this.form.property_category = 'Residential';

    this.isLoading = false;
  },
  methods: {
    setRent(event) {
      var options = event.target.options
      if (options.selectedIndex > -1) {
        this.form.rent_amount = options[options.selectedIndex].getAttribute('rent_amount');
        this.form.security_money = options[options.selectedIndex].getAttribute('security_money');
        this.form.sale_type = options[options.selectedIndex].getAttribute('sale_type');

        options[options.selectedIndex].getAttribute('property_category') == 1
          ? this.form.property_category = 'Commercial'
          : this.form.property_category = 'Residential';

        console.log(options[options.selectedIndex].getAttribute('property_category'))

        this.form.division_id = options[options.selectedIndex].getAttribute('division_id');
        this.form.district_id = options[options.selectedIndex].getAttribute('district_id');
        this.form.thana_id = options[options.selectedIndex].getAttribute('thana_id');
        this.form.property_category_id = options[options.selectedIndex].getAttribute('property_category');
        this.form.property_type_id = options[options.selectedIndex].getAttribute('property_type_id');
      }
    },
    async update() {
      this.isDisable = true;
      await this.$axios.$post('property/ad/update/' + this.$route.params.id, this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property ads create successfully!'
          });

          this.$router.push({ name: 'profile-property-ads' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        });
    }
  }
}
</script>

<style scoped>

</style>
