<template>
  <div>
    <MainCard title="Change your password">
      <template v-slot:actions>
        <nuxt-link class="btn btn-dark btn-sm"
                   :to="{ name: 'profile-me-id', params: { id: $auth.user.id } }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to profile
        </nuxt-link>
      </template>

      <b-row>
        <b-col md="12">
          <form @submit.prevent="update">
            <b-form-group label="Current password">
              <b-form-input class="custom-input-control" v-model="form.currentPassword" type="password"
                            placeholder="Current password"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.currentPassword">{{
                errors.currentPassword[0]
                }}</strong>
            </b-form-group>

            <b-form-group label="New password">
              <b-form-input class="custom-input-control" v-model="form.password" type="password"
                            placeholder="New password"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.password">{{
                errors.password[0]
                }}</strong>
            </b-form-group>

            <b-form-group label="Confirm password">
              <b-form-input class="custom-input-control" v-model="form.password_confirmation" type="password"
                            placeholder="Confirm password"></b-form-input>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.password_confirmation">{{
                errors.password[0]
                }}</strong>
            </b-form-group>

            <b-form-group>
              <b-button type="submit" variant="dark" size="sm" :disabled="isDisable">Update</b-button>
            </b-form-group>
          </form>
        </b-col>
      </b-row>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';

export default {
  layout: 'dashboard',
  name: "change-password",
  components: { MainCard },
  data() {
    return {
      form: {
        password: '',
        currentPassword: '',
        password_confirmation: ''
      },
      isDisable: false,
      errors: {}
    }
  },
  methods: {
    async update() {
      this.isDisable = true;
      await this.$axios.$post('profile/password', this.form)
        .then(response => {
          if (response.status == false) {
            this.isDisable = false;
            this.$izitoast.error({
              title: 'Error !!',
              message: response.message
            });
          }else {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Password change successfully!'
            });

            this.$auth.logout();
            this.$nuxt.$options.router.push({ name: 'login' })
          }
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

<style scoped>

</style>
