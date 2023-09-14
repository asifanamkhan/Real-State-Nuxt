<template>
  <div class="printable-area">
    <div class="my-3 d-flex justify-content-center">
      <h1>Revenue Reports</h1>
    </div>
    <div class="my-2">
      <h3>Total Revenue: {{ amountFormat(printable_data.total_revenue) }}/=</h3>
    </div>
    <table class="table table-bordered table-hover table-border">
      <thead>
        <tr>
          <th scope="col">SL</th>
          <th scope="col">Date</th>
          <th scope="col">Method</th>
          <th scope="col">Bank</th>
          <th scope="col">Mobile Bank</th>
          <th scope="col">Transaction Id</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, i) in printable_data.reports" :key="report.id">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dateFromat(report.date) }}</td>
          <td>
            <span v-if="report.payment_method == 1">Cash</span>
            <span v-if="report.payment_method == 2">Bank</span>
            <span v-if="report.payment_method == 3">Mobile Bank</span>
          </td>
          <td>{{ (report.bank_account_id === null) ? '--' : report.bank_account.bank.name + ' - ( ' +
            report.bank_account.account_number + ' )' }}</td>
          <td>{{ (report.mobile_bank === null) ? '--' : report.mobile_bank.name }}</td>
          <td>{{ report.transaction_id ?? '--' }}</td>
          <td>{{ amountFormat(report.cash_in) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { dateMixin } from '../../../../mixins/date-mixin';
import { helpersMixin } from '../../../../mixins/helpers-mixin';

export default ({
  layout: 'empty',
  name: 'revenue-print',
  mixins: [dateMixin, helpersMixin],
  data() {
    return {
      printable_data: ''
    }
  },
  created() {
    this.printable_data = this.$store.getters['cash-print/getPrintableData'];
    this.$router.push({ name: 'profile-accounts-revenue' });
  },
  mounted() {
    window.print()
  }
})
</script>
