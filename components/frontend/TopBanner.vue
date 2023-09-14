<template>
  <div class="top-banner"
    style="background-image: url('https://i.im.ge/2022/07/27/Fi9Cj6.png')">
      <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'TopBanner'
}
</script>

<style>
.top-banner {
  padding: 120px 0 80px 0;
  min-height: 30vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
