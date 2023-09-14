<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="card-topbar d-flex justify-content-between">
          <h5 class="card-title">{{ title }}</h5>

          <div class="form-group">
            <slot name="actions"></slot>
          </div>
        </div>
        <slot></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainCard",
  props: ['title'],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
