<template>
  <div class="sidebar" :class="isSidebar ? 'active': ''">
    <div class="sidebar-widgets">
      <div class="sidebar-navbar">
        <div class="profile-avater">
          <b-img :src="imageUrl + profileImage" alt="Profile Image"
            style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">
          </b-img>
          <h4>{{ user }}</h4>
        </div>
        <div class="profile-navigation">
          <ul>
            <li>
              <nuxt-link :to="{ name: 'profile-dashboard' }">
                <b-icon icon="speedometer2" font-scale="1"></b-icon>
                Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'profile-me-id', params: { id: $auth.user.id } }">
                <b-icon icon="person" font-scale="1"></b-icon>
                Profile
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'profile-property' }">
                <b-icon icon="newspaper" font-scale="1"></b-icon>
                Properties
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'profile-property-ads' }">
                <b-icon icon="newspaper" font-scale="1"></b-icon>
                Ads
              </nuxt-link>
            </li>

            <!-- Deeds -->
            <li v-b-toggle.deeds>
              <a>
                <font-awesome-icon icon="fa-solid fa-paperclip" />
                Deeds
                <font-awesome-icon class="drop-arrow" icon="fa-solid fa-chevron-right" />
              </a>
            </li>
            <b-collapse id="deeds">
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-property-deed-approved' }">
                  Approved deeds
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-property-deed-apply' }">
                  Incoming deed request
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-property-deed-request' }">
                  Outgoing deed request
                </nuxt-link>
              </li>
            </b-collapse>
            <!-- Deeds -->

            <!-- Accoutns -->
            <li v-b-toggle.accounts>
              <a>
                <font-awesome-icon icon="fa-solid fa-briefcase" />
                Accoutns
                <font-awesome-icon class="drop-arrow" icon="fa-solid fa-chevron-right" />
              </a>
            </li>
            <b-collapse id="accounts">
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-accounts-cash' }">
                  Cash
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-accounts-revenue' }">
                  Revenue
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-accounts-rent-collection' }">
                  Rent Collection
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-accounts-bank' }">
                  Bank Accounts
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-accounts-mobile-bank' }">
                  Mobile Bank Accounts
                </nuxt-link>
              </li>
            </b-collapse>
            <!-- ./ Accoutns -->

            <!-- Expense -->
            <li v-b-toggle.expense>
              <a>
                <font-awesome-icon icon="fa-solid fa-money-bill" />
                Expense
                <font-awesome-icon class="drop-arrow" icon="fa-solid fa-chevron-right" />
              </a>
            </li>
            <b-collapse id="expense">
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-expanse-items' }">
                  Expense Items
                </nuxt-link>
              </li>
              <li>
                <nuxt-link class="ml-3" :to="{ name: 'profile-expanse' }">
                  Expenses
                </nuxt-link>
              </li>
            </b-collapse>
            <!-- /. Expense -->

            <li>
              <nuxt-link :to="{ name: 'profile-wishlist' }">
                <b-icon icon="heart-fill" font-scale="1"></b-icon>
                Wishlist
              </nuxt-link>
            </li>
            <li>
              <b-link @click="logout">
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                Logout
              </b-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isSidebar: Boolean
  },
  data() {
    return {
      'profileImage': ''
    }
  },
  computed: {
    user() {
      return this.$auth.user.name;
    },

    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  async created() {
    if (this.$auth.user.id) {
      await this.$axios.$post('profile/sidebar', { id: this.$auth.user.id })
        .then(response => {
          this.profileImage = response.data.image;
        }).catch(err => {
          alert(err);
        });
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$store.dispatch('wishlist/storeWishlist', 0);
      this.$nuxt.$options.router.push({ name: 'login' })
    },
  }
}
</script>

<style scoped></style>
