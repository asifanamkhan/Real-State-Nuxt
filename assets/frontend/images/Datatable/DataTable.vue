<!-- Datatable pagination component-->
<!-- @author Asif Anam Khan <somuddro249@gmail.com>-->
<!-- @package component/Datable-->

<template>

  <table class="table table-bordered table-hover table-border">
    <thead>
    <tr>
      <th class="font-weight-bold" v-for="column in columns" :key="column.name" @click="$emit('sort', column.name)"
          :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
          :style="'width:'+column.width+';'+'cursor:pointer;'">
        {{ column.label }}
      </th>
    </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "DataTable",

  props: ['columns', 'sortKey', 'sortOrders']

}
</script>

<style scoped>
/*.sorting {*/
  /*background-image: url('assets/images/sort_both.png');*/
  /*background-repeat: no-repeat;*/
  /*background-position: center right;*/
/*}*/
/*.sorting_asc {*/
  /*background-image: url('assets/images/sort_asc.png');*/
  /*background-repeat: no-repeat;*/
  /*background-position: center right;*/
/*}*/
/*.sorting_desc {*/
  /*background-image: url('assets/images/sort_desc.png');*/
  /*background-repeat: no-repeat;*/
  /*background-position: center right;*/
/*}*/
</style>
