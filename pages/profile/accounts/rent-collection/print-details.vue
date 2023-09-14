<template>
  <div class="printable-area">
    <div class="my-3 d-flex justify-content-center">
      <h3>{{ title }}</h3>
    </div>
    <div class="my-2">
      <h3>Total Collection: {{ amountFormat(printable_data.total_pay_amount) }}/=</h3>
      <h3>Total Due: {{ amountFormat(totalDue) }}/=</h3>
    </div>
    <table class="table table-bordered table-hover table-border">
      <thead>
        <tr>
          <th scope="col">SL</th>
          <th scope="col">Created at</th>
          <th scope="col">Method</th>
          <th scope="col">Bank</th>
          <th scope="col">Mobile Bank</th>
          <th scope="col">Transaction Id</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, i) in printable_data.reports" :key="report.id">
          <td>{{ i + 1 }}</td>
            <td>{{ dateFromat(report.created_at) }}</td>
            <td>
              <span v-if="report.payment_method == 1">Cash</span>
              <span v-if="report.payment_method == 2">Bank</span>
              <span v-if="report.payment_method == 3">Mobile Bank</span>
            </td>
            <td>{{ (report.bank_account_id === null) ? '--' : report.bank_account.bank.name + ' - ( ' + report.bank_account.account_number + ' )' }}</td>
            <td>{{ (report.mobile_bank_account_id === null) ? '--' : report.mobile_bank.name }}</td>
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

export default({
  layout: 'empty',
  mixins: [dateMixin, helpersMixin],
  name: 'rent-collection-print-details',
  data() {
    return {
      title: '',
      totalDue: '',
      printable_data: ''
    }
  },
  created() {
    this.printable_data = this.$store.getters['rent-collections/getPrintableData'];

    let transDate = this.printable_data.reports[0].date
    let rent = this.printable_data.reports[0].property.total_amount
    let propertyName = this.printable_data.reports[0].property.name
    let tenantName = this.printable_data.reports[0].deed.tenant.name

    this.totalDue = (rent - this.printable_data.total_pay_amount);
    this.title = propertyName + ' (' + tenantName + ') ' + this.monthYear(transDate) + ', Rent Collection Reports.';

    this.$router.push({ name: 'profile-accounts-rent-collection' });
  },
  mounted() {
    window.print()
  }
})
</script>
