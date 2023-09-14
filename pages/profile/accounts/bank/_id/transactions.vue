<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Bank Transaction Reports">
      <template v-slot:actions>
        <button type="button" class="btn btn-sm btn-info">
          Total Credit Balance <span class="badge badge-light text-13">{{ amountFormat(totalRevenue) }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <button type="button" class="btn btn-sm btn-danger">
          Total Debit Balance <span class="badge badge-light text-13">{{ amountFormat(totalExpanse) }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <button type="button" class="btn btn-sm btn-success">
          Current Balance <span class="badge badge-light text-13">{{ amountFormat(currentAmount) }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <nuxt-link class="btn btn-dark btn-sm" :to="{ name: 'profile-accounts-bank' }">
          <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
          Back to list
        </nuxt-link>
      </template>

      <div class="search d-flex justify-content-between align-items-center">
        <div class="form-group d-flex">
          <input class="form-control custom-form-control mr-1" type="text" v-model="tableData.search"
            placeholder="Search Table" @input="getData()">
          <input class="form-control custom-form-control mr-1" type="month" v-model="tableData.year_month"
            placeholder="Monthly Reports" @change="monthlyReports">
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
            <td>{{ amountFormat(value.cash_in) }}</td>
            <td>{{ amountFormat(value.cash_out) }}</td>
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
import { dateMixin } from '../../../../../mixins/date-mixin';
import { helpersMixin } from '../../../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: "bank-transaction",
  components: { DataTable, Pagination, MainCard },
  mixins: [dateMixin, helpersMixin],
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Date', name: 'date' },
      { width: '', label: 'Credit', name: 'credit' },
      { width: '', label: 'Debit', name: 'debit' }
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isLoading: true,
      totalRevenue: '',
      totalExpanse: '',
      currentAmount: '',
      values: [],
      sum: [],
      columns: columns,
      sortKey: 'id',
      sortOrders: sortOrders,
      perPage: ['10', '25', '50', '100', '500', '2000', 'all'],
      tableData: {
        draw: 0,
        length: 10,
        search: '',
        column: 0,
        dir: 'desc',
        year_month: '',
        userId: this.$auth.user.id,
        bankAccountId: this.$route.params.id
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
    getData(url = '/accounts/bank-transactions') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          this.totalRevenue = response.data.totalRevenue;
          this.totalExpanse = response.data.totalExpanse;
          this.currentAmount = response.data.currentAmount;
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
      this.year_month = $event.target.value;
      this.getData();
    }
  }
}
</script>

<style></style>
