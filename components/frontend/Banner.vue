<template>
  <div>
    <div class="banner image-cover" :style="`background: url(${url+banner.banner_image}) no-repeat`">
      <b-container>
        <div class="banner-content text-center">
          <h1 class="banner-title">{{ banner.banner_title }}</h1>
          <p class="banner-text">{{ banner.caption }}</p>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Banner",
    props: {
      banner: Object
    },
    data() {
      return {
        url: ''
      }
    },
    created() {
      this.url = process.env.APP_ROOT_IMG_URL;
    }
  }
</script>
