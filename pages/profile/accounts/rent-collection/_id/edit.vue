<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Edit Rent Collection.">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-accounts-rent-collection' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="update">
        <b-row>
          <b-col md="6">
            <b-form-group label="Select Property">
              <select v-model="form.property_id" class="form-control custom-input-control" @change="propertyInfo">
                <option v-for="(deed, index) in deeds" :value="deed.property.id" :key="index">
                  {{ deed.property.name }} - ( {{ deed.tenant.name }} )
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_id">
                {{ errors.property_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Paid amount">
              <b-form-input v-model="form.cash_in" class="custom-input-control" type="number" min="0"
                placeholder="Enter amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.cash_in">
                {{ errors.cash_in[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Select Date">
              <b-form-datepicker id="example-datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.date">
                {{ errors.date[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Select Method">
              <select v-model="form.payment_method" class="form-control custom-input-control" @change="paymentMethod">
                <option value="">Select</option>
                <option value="1">Cash</option>
                <option value="2">Bank</option>
                <option value="3">Mobile Bank</option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.payment_method">
                {{ errors.payment_method[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col v-if="isPaymentMethod == 2" md="6">
            <b-form-group label="Banks">
              <select v-model="form.bank_account_id" class="form-control custom-input-control">
                <option v-for="(account, index) in accounts" :value="account.id" :key="index">
                  {{ account.name }} - {{ account.account_no }} - {{ account.amount }}
                </option>
              </select>
            </b-form-group>
          </b-col>

          <b-col v-if="isPaymentMethod == 3" md="6">
            <b-form-group label="Mobile Bank">
              <select v-model="form.mobile_bank_account_id" class="form-control custom-input-control">
                <option v-for="(account, index) in accounts" :value="account.id" :key="index">
                  {{ account.name }} - {{ account.account_no }} - {{ account.amount }}
                </option>
              </select>
            </b-form-group>
          </b-col>

          <b-col v-if="isPaymentMethod == 3" md="6">
            <b-form-group label="Transaction id">
              <b-form-input v-model="form.transaction_id" class="custom-input-control" type="number"
                placeholder="Transaction id"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.transaction_id">
                {{ errors.transaction_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group label="Description">
              <b-form-textarea id="description" placeholder="Description..." rows="3" v-model="form.remark"
                class="custom-input-control"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="button-t-m" style="margin-top: 30px">
              <b-button type="submit" variant="success" size="sm" :disabled="loading">Update Payment</b-button>
            </div>
          </b-col>
        </b-row>
      </form>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
import { helpersMixin } from '../../../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: 'rent-collection-edit',
  components: { MainCard },
  mixins: [helpersMixin],
  data() {
    return {
      rent: '',
      deeds: '',
      errors: {},
      tenantId: '',
      accounts: [],
      loading: false,
      isLoading: true,
      isPaymentMethod: '',
      form: {
        date: '',
        remark: '',
        user_id: '',
        cash_in: '',
        due_amount: '',
        created_by: '',
        property_id: '',
        payment_method: '',
        transaction_id: '',
        bank_account_id: '',
        property_deed_id: '',
        mobile_bank_account_id: ''
      }
    }
  },
  async created() {
    const data = {
      userId: this.$auth.user.id,
      transactionId: this.$route.params.id
    };
    await this.$axios.$post('property/deed/rent-property/edit', data)
      .then(res => {
        this.deeds = res.data.deeds;
        this.form = res.data.transaction;
        this.propertyInfo();
        this.paymentMethod();
        this.isLoading = false;
      }).catch(err => {
        alert(err);
      });
  },
  methods: {
    async propertyInfo(event) {
      let propertyId = this.form.property_id;

      if (event) {
        propertyId = event.target.value;
      }

      await this.$axios.$post('property/deed/get-property-info', { propertyId: propertyId })
        .then(res => {
          this.rent = res.data.property.total_amount;
          this.tenantId = res.data.property.deed[0].tenant_id;

          // Form
          this.form.user_id = this.$auth.user.id;
          this.form.updated_by = this.$auth.user.id;
          this.form.property_deed_id = res.data.property.deed[0].id;
        })
        .catch(err => {
          alert(err);
        });
    },
    async paymentMethod() {
      this.isPaymentMethod = this.form.payment_method;
      const value = this.form.payment_method;
      this.accounts = [];

      if (value == 2 || value == 3) {
        await this.$axios.$post('property/deed/get-accounts', { userId: this.form.user_id, method: value })
          .then(response => {
            this.accounts = response.data.accounts;
          }).catch(err => {
            alert(err);
          });
      }
    },
    async update() {
      this.loading = true;
      await this.$axios.$put('property/deed/rent-property/update/' + this.$route.params.id, this.form)
        .then(response => {
          this.loading = false;
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Rent successfully updated'
          });

          this.$router.push({ name: 'profile-accounts-rent-collection' });
        }).catch(error => {
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          else {
            alert(error.response.message)
          }
        });
    },
  }
}
</script>

<style></style>
