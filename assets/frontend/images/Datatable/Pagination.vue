<!-- Datatable component-->
<!-- @author Asif Anam Khan <somuddro249@gmail.com>-->
<!-- @package component/Datable-->

<style lang="scss">
.pagination {
  justify-content: flex-end !important;
  .page-stats {
    align-items: center;
    margin-right: 5px;
  }
  i {
    color: #3273dc !important;
  }
}
</style>

<template>

<!--  server side-->

  <nav class="pagination td-actions" v-if="!client">
    <span class="page-stats">{{pagination.from}} - {{pagination.to}} of {{pagination.total}}</span>
    <a title="previous" class=""
       style="cursor: pointer" v-if="pagination.prevPageUrl" @click="$emit('prev');">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </a>
    <a rel="tooltip" class="btn-link"
       title="previous" style="cursor: pointer"
       v-else :disabled="true">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </a>

    <a title="next" style="cursor: pointer;" v-if="pagination.nextPageUrl"
       rel="tooltip" class="btn-link"
       @click="$emit('next');">
      <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
    </a>
    <a title="next" style="cursor: pointer"
       rel="tooltip" class="btn-link " v-else :disabled="true">
      <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
    </a>
  </nav>

<!--  client side-->

  <!--<nav class="pagination" v-else>-->
  <!--<span class="page-stats">-->
  <!--{{pagination.from}} - {{pagination.to}} of {{filtered.length}}-->
  <!--<span v-if="filtered.length < pagination.total">(filtered from {{pagination.total}} total entries)</span>-->
  <!--</span>-->
  <!--<a v-if="pagination.prevPage" class="button is-small pagination-previous" @click="$emit('prev');">-->
  <!--Prev-->
  <!--</a>-->
  <!--<a class="button is-small pagination-previous" v-else :disabled="true">-->
  <!--Prev-->
  <!--</a>-->

  <!--<a v-if="pagination.nextPage" class="button is-small pagination-next" @click="$emit('next');">-->
  <!--Next-->
  <!--</a>-->
  <!--<a class="button is-small pagination-next" v-else :disabled="true">-->
  <!--Next-->
  <!--</a>-->
  <!--</nav>-->
</template>

<script>
export default {
  props: ['pagination', 'client', 'filtered']
}
</script>
