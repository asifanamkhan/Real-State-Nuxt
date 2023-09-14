<template>
    <div>
        <div class="top-bar bg-brand d-none d-sm-block">
            <b-container>
                <div class="d-flex align-items-center justify-content-between">
                    <div class="currency">
                        <ul class="language-list">
                            <li>
                                <a href="#">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/bd.svg"/>
                                    <span>Bangladesh</span>
                                </a>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="top-bar-right d-flex align-items-center">
                        <div class="top-bar-wishlist">
                            <nuxt-link
                              :to="{ name: 'profile-wishlist'}"
                              class="text-white" href="#">
                                <font-awesome-icon icon="fa-solid fa-heart" />
                                Wishlist ({{wishlist}})
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Topbar",
      data(){
        return{
        }
      },
      computed:{
          wishlist(){
            return this.$store.getters['wishlist/getWishlist']
          }
      },

    }
</script>

<style scoped>

</style>
