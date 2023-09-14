<template>
  <div>
    <MainCard title="Edit Your Bank Account">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-accounts-bank' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <form @submit.prevent="update">
        <b-row>
          <b-col md="6">
            <b-form-group label="Your name">
              <b-form-input :value="this.$auth.user.name" class="custom-input-control" type="text"
                readonly></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Select Bank">
              <select v-model="form.bank_id" class="form-control custom-input-control">
                <option v-for="(bank, index) in banks" :value="bank.id" :key="index">{{ bank.name }}</option>
              </select>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.bank_id">
                {{ errors.bank_id[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Account Number">
              <b-form-input v-model="form.account_number" class="custom-input-control" type="text"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.account_number">
                {{ errors.account_number[0] }}
              </strong>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group label="Initial Balance">
              <b-form-input v-model="form.cash_in" class="custom-input-control" type="text"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.cash_in">
                {{ errors.cash_in[0] }}
              </strong>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="button-t-m" style="margin-top: 30px">
              <b-button type="submit" variant="success" size="sm" :disabled="loading">Update</b-button>
            </div>
          </b-col>
        </b-row>
      </form>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';

export default {
  layout: 'dashboard',
  name: 'bank-getway',
  components: { MainCard },
  data() {
    return {
      loading: false,
      banks: '',
      errors: {},
      form: {
        cash_in: '',
        bank_id: '',
        user_id: this.$auth.user.id,
        account_number: '',
      }
    }
  },
  async created() {
    await this.$axios.$post('accounts/banks-edit', { id: this.$route.params.id })
      .then(res => {
        this.form = res.data.account;
        this.banks = res.data.banks;
        this.form.cash_in = res.data.initialBalance.cash_in;
      })
  },
  methods: {
    async update() {
      this.loading = true;
      await this.$axios.$put('accounts/banks-update/' + this.$route.params.id, this.form)
        .then(response => {
          this.loading = false;
          this.$izitoast.success({
            title: 'Success !!',
            message: response.message
          });

          this.$router.push({ name: 'profile-accounts-bank' });
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          else {
            alert(error.response.message)
          }
        });
    }
  }
}
</script>

<style></style>
