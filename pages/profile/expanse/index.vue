<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Expanses">
      <template v-slot:actions>
        <button type="button" class="btn btn-sm btn-success">
          Total Expanses <span class="badge badge-light text-13">{{ amountFormat(totalExpanse) }}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <nuxt-link class="btn btn-sm btn-info" :to="{ name: 'profile-expanse-create' }">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Create expanse
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
            <td>{{ value.property.name }}</td>
            <td>
              <span v-if="value.payment_method == 1" class="badge badge-primary">Cash</span>
              <span v-if="value.payment_method == 2" class="badge badge-success">Bank</span>
              <span v-if="value.payment_method == 3" class="badge badge-dark">Mobile Bank</span>
            </td>
            <td>{{ (value.bank_account_id === null) ? '--' : value.bank_account.bank.name + ' - ( ' + value.bank_account.account_number + ' )' }}</td>
            <td>{{ (value.mobile_bank === null) ? '--' : value.mobile_bank.name }}</td>
            <td>{{ value.transaction_id ?? '--' }}</td>
            <td>{{ amountFormat(value.cash_out) }}</td>
            <td>
              <nuxt-link :to="{ name: 'profile-expanse-id-edit', params: { id: value.id } }" rel="tooltip"
                class="btn btn-sm btn-success btn-simple" title="Edit">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </nuxt-link>

              <b-button class="btn btn-sm btn-danger btn-simple" @click="deleteItem(value.id)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </b-button>
            </td>
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
import { dateMixin } from '../../../mixins/date-mixin';
import { helpersMixin } from '../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: "expanse",
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
      { width: '', label: 'Property', name: 'property' },
      { width: '', label: 'Method', name: 'method' },
      { width: '', label: 'Bank', name: 'bank' },
      { width: '', label: 'Mobile Bank', name: 'mobile_bank' },
      { width: '', label: 'Transaction Id', name: 'transaction_id' },
      { width: '', label: 'Amount', name: 'amount' },
      { width: '', label: 'Action', name: '' },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isLoading: true,
      totalExpanse: '',
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
    getData(url = '/accounts/expanses') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          this.totalExpanse = response.data.totalExpanse;
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
    async deleteItem(id) {
      let result = confirm("Want to delete?");
      if (result) {
        await this.$axios.$delete('accounts/expanses/' + id)
          .then(response => {
            this.getData();
            this.$izitoast.success({
              title: 'Success!!',
              message: response.message
            });
          }).catch(error => {
            alert(error.response.message);
          })
      }
    },
  }
}
</script>

<style></style>
