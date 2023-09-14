<template>
  <div>
    <div class="accordion mt-5" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-7 variant="info">
            Write A Review
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-7" visible accordion="my-accordion-7" role="tabpanel">
          <b-card-body>
            <p v-if="!isTenant" class="text-danger">
              Please <a href="#" class="text-danger"> login</a> as a tenant to write review!
            </p>

            <div v-if="isTenant" class="block-body p-0">
              <form @submit.prevent="store">
                <b-row class="py-3">
                  <b-col md="8">
                    <b-row>
                      <b-col lg="6" md="6" sm="12">
                        <label class="select-star">Ratings</label>
                        <b-form-rating v-model="form.rating" color="#ff9800"></b-form-rating>
                      </b-col>
                    </b-row>
                  </b-col>

                  <!-- <b-col lg="4" md="4" sm="12">
                    <div class="total-rating">
                      <h4>4.75</h4>
                      <span>Average Rating</span>
                    </div>
                  </b-col> -->
                </b-row>

                <b-row>
                  <b-col lg="12" md="12" sm="12">
                    <div class="form-group">
                      <textarea name="comment" v-model="form.review" placeholder="Message"
                        class="form-control ht-80"></textarea>
                    </div>
                  </b-col>

                  <b-col lg="12" md="12" sm="12">
                    <b-button type="submit" class="btn btn-browse-more">Submit Review</b-button>
                  </b-col>
                </b-row>
              </form>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTenant: false,
      form: {
        review: '',
        reviewer_type: 3,
        review_type: 1,
        review_type_id: this.$route.params.id,
        reviewer_type_id: '',
        status: 1,
        rating: ''
      },
    }
  },
  methods: {
    store() {
      if (!this.form.rating) {
        this.$izitoast.warning({
          title: 'Warning !!',
          message: 'Rating is not empty'
        });
        return;
      }
      const formData = this.form;
      this.$emit('add-review', formData);

      // Field value clear
      this.form.rating = '',
      this.form.review = ''
    }
  },
  created() {
    if (this.$auth.loggedIn) {
      this.isTenant = true;
      this.form.reviewer_type_id = this.$auth.user.id;
    }
  }
}
</script>

<style>

</style>
