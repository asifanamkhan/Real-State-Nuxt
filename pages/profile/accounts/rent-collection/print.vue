<template>
  <div class="printable-area">
      <div class="my-3 d-flex justify-content-center">
        <h1>Property Payments Reports</h1>
      </div>

      <table class="table table-bordered table-hover table-border">
        <thead>
          <tr>
            <th scope="col">SL</th>
            <th scope="col">Month</th>
            <th scope="col">Property</th>
            <th scope="col">Amount</th>
            <th scope="col">Due</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in printable_data" :key="data.id">
            <td>{{ i + 1 }}</td>
            <td>{{ data.monthName }} - {{ data.year }}</td>
            <td>{{ data.property_name }} ({{ data.tenant_name }})</td>
            <td>{{ amountFormat(data.amount) }}</td>
            <td>{{ amountFormat((data.property_amount - data.amount)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { helpersMixin } from '../../../../mixins/helpers-mixin';

export default({
  layout: 'empty',
  name: 'cash-print',
  mixins: [helpersMixin],
  data() {
    return {
      printable_data: ''
    }
  },
  created() {
    this.printable_data = this.$store.getters['property-payments/getPrintableData'];
    this.$router.push({ name: 'profile-accounts-rent-collection' });
  },
  mounted() {
    window.print()
  }
})
</script>
