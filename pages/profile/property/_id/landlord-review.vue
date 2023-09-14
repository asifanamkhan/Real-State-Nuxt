<template>
  <div>
    <div class="page-search">
      <div>
        <div class="form-group">
          <h5>Write your review for landlord</h5>
        </div>
      </div>

      <div>
        <div class="form-group">
          <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-property-deed-tenant' }">
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            Back to deed
          </nuxt-link>
        </div>
      </div>
    </div>

    <div>
      <form @submit.prevent="store">
        <div class="input-rating">
          <label for="rating-readonly">Readonly rating: </label>
          <b-form-rating v-model="form.rating" color="rgb(64, 192, 128)" class="mb-2 p-0" inline no-border size="lg">
          </b-form-rating>
          <!--<p class="mt-2">({{ form.rating }})</p>-->
        </div>

        <b-form-group label="Review">
          <b-form-textarea class="custom-input-control" placeholder="Write here..." rows="3"
            v-model="form.review"></b-form-textarea>
        </b-form-group>

        <b-form-group class="mt-3">
          <b-button type="submit" class="btn-browse-more btn-height" variant="info">Save</b-button>
        </b-form-group>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "landlord-review",
  data() {
    return {
      form: {
        review: '',
        reviewer_type: 3,
        review_type: 2,
        review_type_id: this.$route.params.landlordId,
        reviewer_type_id: this.$auth.user.tenant_id,
        status: 1,
        rating: ''
      },
    }
  },
  methods: {
    async store() {
      await this.$axios.$post('review/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Your review successfully submitted!'
          });

          this.$router.push({ name: 'profile-property-deed-tenant' });
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.input-rating {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
</style>
