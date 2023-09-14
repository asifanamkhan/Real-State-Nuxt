<template>
  <div>
    <div class="accordion mt-5" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-6 variant="info">
            {{ reviews.length }} Reviews
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-6" visible accordion="my-accordion-6" role="tabpanel">
          <b-card-body>
            <div class="block-body p-0">
              <div class="reviews">
                <div class="reviews-list">
                  <ul>
                    <li class="comments" v-for="(value, index) in reviews" :key="index">
                      <article class="d-flex">
                        <!-- <div class="comments-thumb">
                            <b-img v-if="value.tenant" :src="imageUrl + value.tenant.image" alt="Image"></b-img>
                            <b-img v-if="value.landlord" :src="imageUrl + value.landlord.image" alt="Image"></b-img>
                          </div> -->

                        <div class="comments-details">
                          <div class="comments-rating">
                            <b-form-rating class="pl-0" id="rating-md-no-border" inline :value="value.rating"
                              color="#ff9800" no-border size="lg" readonly>
                            </b-form-rating>
                          </div>
                          <div style="margin-left: 8px;">
                            <div class="comment-meta">
                              <h4 class="author-name">{{ value.tenant.name }}</h4>
                              <div class="comment-date">
                                {{ dateFromat(value.created_at) }}
                              </div>
                            </div>
                            <div class="comment-text">
                              <p>{{ value.review }}</p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { dateMixin } from '../../mixins/date-mixin';

export default {
  mixins: [dateMixin],
  props: {
    reviews: Array
  },
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  }
}
</script>

<style></style>
