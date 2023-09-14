<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Deed transaction reports">
      <div class="search d-flex justify-content-between align-items-center">
        <div class="form-group">
          <input class="form-control custom-form-control" type="text" v-model="tableData.search"
                 placeholder="Search Table" @input="getData()">
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
          <td>{{ value.monthName }} - {{ value.year }}</td>
          <td>{{ value.property_name }} ({{ value.tenant_name }})</td>
          <td>{{ amountFormat(value.amount) }}</td>
          <td>{{ amountFormat((value.property_amount - value.amount)) }}</td>

          <td>
            <nuxt-link
              :to="{ name: 'profile-accounts-rent-collection-details' }"
              class="btn btn-sm btn-primary btn-simple" title="Show all transactions"
              :custom="true"
            >
              <a @click="storeDeed(value.deedId, value.month)">
                <font-awesome-icon icon="fa-solid fa-eye" />
              </a>
            </nuxt-link>
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
import { dateMixin } from '../../../../mixins/date-mixin';
import { helpersMixin } from '../../../../mixins/helpers-mixin';

export default {
  layout: 'dashboard',
  name: 'deed_transaction_reports',
  components: { MainCard, Pagination, DataTable },
  mixins: [dateMixin, helpersMixin],
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Month', name: 'month' },
      { width: '', label: 'Property', name: 'property' },
      { width: '', label: 'Amount', name: 'amount' },
      { width: '', label: 'Due', name: 'due' },
      { width: '', label: 'Actions', name: 'actions' },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isLoading: true,
      values: [],
      propertyName: '',
      tenantName: '',
      totalRevenue: '',
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
        userId: this.$auth.user.id,
        deedId: this.$route.params.id
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
  created() {
    this.getData();
  },
  methods: {
    getData(url = 'property/deed/transaction-reports') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }
          this.isLoading = false;
        })
        .catch(errors => {
          alert(errors);
        })
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
      return array.findIndex(i => i[key] == value)
    },
    storeDeed(deed_id, month) {
      const data = {
        deedId: deed_id,
        month: month
      };
      this.$store.dispatch('transactions/deedInfo', data);
    }
  }
}
</script>

<style>

</style>
