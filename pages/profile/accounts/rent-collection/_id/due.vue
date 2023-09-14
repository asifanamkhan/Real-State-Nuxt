<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Due Collection.">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-accounts-rent-collection' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="dueStore">
        <b-row>
          <b-col md="6">
            <b-form-group label="Select Property">
              <b-form-input type="text" v-model="propertyName" class="custom-input-control" readonly></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_id">
                {{ errors.property_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Due amount">
              <b-form-input v-model="dueAmount" class="custom-input-control" type="number" placeholder="Due amount"
                readonly></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-form-group label="Paid amount">
              <b-form-input v-model="form.cash_in" @keyup="checkDueAmount" class="custom-input-control" type="number"
                min="0" placeholder="Enter amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.cash_in">
                {{ errors.cash_in[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Select Date">
              <!-- <input type="month" v-model="form.date" class="form-control custom-input-control mb-2"> -->
              <b-form-datepicker type="month" id="example-datepicker" v-model="form.date" class="mb-2"
                disabled></b-form-datepicker>
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
                  {{ account.name }} - {{ account.account_no }} - {{ amountFormat(account.amount) }}
                </option>
              </select>
            </b-form-group>
          </b-col>

          <b-col v-if="isPaymentMethod == 3" md="6">
            <b-form-group label="Mobile Bank">
              <select v-model="form.mobile_bank_account_id" class="form-control custom-input-control">
                <option v-for="(account, index) in accounts" :value="account.id" :key="index">
                  {{ account.name }} - {{ account.account_no }} - {{ amountFormat(account.amount) }}
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
              <b-button type="submit" variant="success" size="sm" :disabled="loading">Due Payment</b-button>
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
  mixins: [ helpersMixin ],
  data() {
    return {
      rent: '',
      deeds: '',
      errors: {},
      accounts: [],
      tenantId: '',
      dueAmount: '',
      loading: false,
      isLoading: true,
      propertyName: '',
      isPaymentMethod: '',
      form: {
        date: '',
        remark: '',
        transId: '',
        user_id: '',
        cash_in: '',
        due_amount: '',
        created_by: '',
        property_id: '',
        payment_method: '',
        transaction_id: '',
        bank_account_id: '',
        property_deed_id: '',
        mobile_bank_account_id: '',
      }
    }
  },
  async created() {
    const data = {
      userId: this.$auth.user.id,
      transactionId: this.$route.params.id
    };
    await this.$axios.$post('property/deed/rent-property/due', data)
      .then(res => {
        this.propertyName = res.data.transaction.property.name;
        this.dueAmount = (res.data.transaction.property.total_amount - res.data.pay_amount);

        // Form
        this.form.user_id = this.$auth.user.id;
        this.form.created_by = this.$auth.user.id;
        this.form.date = res.data.transaction.date;
        this.form.transId = this.$route.params.id
        this.form.due_amount = res.data.transaction.due_amount;
        this.form.property_id = res.data.transaction.property_id;
        this.form.property_deed_id = res.data.transaction.property_deed_id;

        this.isLoading = false;
      }).catch(err => {
        alert(err);
      });
  },
  methods: {
    async paymentMethod() {
      this.isPaymentMethod = this.form.payment_method;
      const value = this.form.payment_method;
      this.accounts = [];

      if (value == 2 || value == 3) {
        await this.$axios.$post('property/deed/get-accounts', { userId: this.form.user_id, method: value })
          .then(res => {
            this.accounts = res.data.accounts;
          });
      }
    },
    async dueStore() {
      this.loading = true;
      await this.$axios.$post('property/deed/rent-property/due/store', this.form)
        .then(response => {
          this.loading = false;
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Due successfully store'
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
    checkDueAmount(event) {
      const value = event.target.value;
      if (value > this.dueAmount) {
        alert('Amount cannot be greater than due');
        this.form.cash_in = '';
      }
    }
  }
}
</script>

<style></style>
