<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Revenue">
      <template v-slot:actions>
        <button type="button" class="btn btn-sm btn-info">
          Total Revenue <span class="badge badge-light">{{ amountFormat(totalRevenue) }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <button @click="handlePrintCash" class="btn btn-sm btn-primary">
          Print
        </button>
      </template>

      <div class="search d-flex justify-content-between align-items-center">
        <div>
          <div class="form-group d-flex">
            <input class="form-control custom-form-control mr-1" type="text" v-model="tableData.search"
              placeholder="Search Table" @input="getData()">

            <input class="form-control custom-form-control mr-1" type="month" v-model="tableData.month"
              placeholder="Monthly Reports" @change="monthlyReports">
          </div>
        </div>

        <div class="form-group">
          <select class="form-control custom-select-form-control" v-model="tableData.length" @change="getData()">
            <option v-for="(records, index) in perPage" :key="index" :value="records">{{ records }}</option>
          </select>
        </div>
      </div>

      <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" class="">
        <tbody>
          <tr v-for="(value, i) in values" :key="value.id">
            <td>{{ i + 1 }}</td>
            <td>{{ dateFromat(value.date) }}</td>
            <td>
              <span v-if="value.payment_method == 1" class="badge badge-primary">Cash</span>
              <span v-if="value.payment_method == 2" class="badge badge-success">Bank</span>
              <span v-if="value.payment_method == 3" class="badge badge-dark">Mobile Bank</span>
            </td>
            <td>{{ (value.bank_account_id === null) ? '--' : value.bank_account.bank.name + ' - ( ' + value.bank_account.account_number + ' )' }}</td>
            <td>{{ (value.mobile_bank === null) ? '--' : value.mobile_bank.name }}</td>
            <td>{{ value.transaction_id ?? '--' }}</td>
            <td>{{ amountFormat(value.cash_in) }}</td>
          </tr>
        </tbody>
      </DataTable>

      <pagination :pagination="pagination" @prev="getData(pagination.prevPageUrl)"
        @next="getData(pagination.nextPageUrl)">
      </pagination>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
import Pagination from "@/components/Datatable/Pagination";
import DataTable from "@/components/Datatable/DataTable";
import { dateMixin } from '../../../../mixins/date-mixin';
import { helpersMixin } from '../../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: 'Revenue',
  components: { Pagination, DataTable, MainCard },
  mixins: [dateMixin, helpersMixin],
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Date', name: 'date' },
      { width: '', label: 'Method', name: 'method' },
      { width: '', label: 'Bank', name: 'bank' },
      { width: '', label: 'Mobile Bank', name: 'mobile_bank' },
      { width: '', label: 'Transaction Id', name: 'transaction_id' },
      { width: '', label: 'Amount', name: 'amount' }
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isLoading: true,
      totalRevenue: '',
      values: [],
      sum: [],
      columns: columns,
      sortKey: 'id',
      sortOrders: sortOrders,
      perPage: ['10', '25', '50', '100', '500', '2000', 'all'],
      tableData: {
        month: '',
        draw: 0,
        length: 10,
        search: '',
        column: 0,
        dir: 'desc',
        userId: this.$auth.user.id
      },
      pagination: {
        lastPage: '',
        currentPage: '',
        total: '',
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        from: '',
        to: '',
      },
    }
  },
  methods: {
    getData(url = '/accounts/revenues') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          this.totalRevenue = response.data.totalRevenue;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }
          this.isLoading = false;
        }).catch(errors => {
          alert(errors);
        });
    },
    configPagination(data) {
      this.pagination.lastPage = data.last_page;
      this.pagination.currentPage = data.current_page;
      this.pagination.total = data.total;
      this.pagination.lastPageUrl = data.last_page_url;
      this.pagination.nextPageUrl = data.next_page_url;
      this.pagination.prevPageUrl = data.prev_page_url;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, 'name', key);
      this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
      this.getData();
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value);
    },
    monthlyReports($event) {
      this.month = $event.target.value;
      this.getData();
    },
    handlePrintCash() {
      this.$axios.post('/accounts/revenue/printable', {
        user_id: this.tableData.userId,
        year_month: this.tableData.month
      })
        .then((response) => {
          this.$store.dispatch('cash-print/printableData', response.data);
        })
        .then(() => {
          this.$router.push({ name: 'profile-accounts-revenue-print' });
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style></style>
