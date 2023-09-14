<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Edit Expanse.">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-expanse' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="update">
        <b-row>
          <b-col md="6">
            <b-form-group label="Select property">
              <select v-model="form.property_id" class="form-control custom-input-control">
                <option value="">Select</option>
                <option v-for="(property, index) in properties" :key="index" :value="property.id">
                  {{ property.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.property_id">
                {{ errors.property_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Select expanse item">
              <select v-model="form.expanse_item_id" class="form-control custom-input-control">
                <option value="">Select</option>
                <option v-for="(item, index) in expanseItems" :key="index" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.expanse_item_id">
                {{ errors.expanse_item_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Amount">
              <b-form-input v-model="form.cash_out" class="custom-input-control" type="number" min="0"
                placeholder="Enter amount"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.cash_out">
                {{ errors.cash_out[0] }}
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
import { helpersMixin } from '../../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: "expanse-edit",
  components: { MainCard },
  mixins: [helpersMixin],
  data() {
    return {
      errors: {},
      accounts: [],
      properties: '',
      loading: false,
      isLoading: true,
      expanseItems: '',
      isPaymentMethod: '',
      userId: this.$auth.user.id,
      form: {
        date: '',
        remark: '',
        bank_id: '',
        cash_out: '',
        property_id: '',
        payment_method: '',
        transaction_id: '',
        expanse_item_id: '',
        mobile_banking_id: '',
        user_id: this.$auth.user.id
      }
    }
  },
  async created() {
    const data = {
      userId: this.userId,
      id: this.$route.params.id
    };
    await this.$axios.$post('accounts/expanses/edit', data)
      .then(response => {
        this.form = response.data.transaction;
        this.properties = response.data.properties;
        this.expanseItems = response.data.expanseItems;
        this.paymentMethod();
        this.isLoading = false;
      }).catch(error => {
        alert(error);
      });
  },
  methods: {
    async paymentMethod() {
      this.isPaymentMethod = this.form.payment_method;
      const value = this.form.payment_method;

      this.accounts = [];
      if (value == 2 || value == 3) {
        await this.$axios.$post('property/deed/get-accounts', { userId: this.userId, method: value })
          .then(res => {
            this.accounts = res.data.accounts;
          }).catch(error => {
            alert(error);
          })
      }
    },
    async update() {
      this.loading = true;
      await this.$axios.$put('accounts/expanses/' + this.$route.params.id, this.form)
        .then(response => {
          this.loading = false;
          this.$izitoast.success({
            title: 'Success !!',
            message: response.message
          });

          this.$router.push({ name: 'profile-expanse' });
        }).catch(error => {
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          else {
            alert(error.response.message);
          }
        });
    }
  }
}
</script>

<style></style>
