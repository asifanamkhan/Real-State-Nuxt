<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h5>Payment Reports</h5>
    </div>
    <div class="card-body p-0 mt-4">
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
            <td>{{ dateFromat(value.date) }}</td>
            <td>
              <p v-if="value.payment_method == 1">
                <b-badge variant="primary">Cash</b-badge>
              </p>
              <p v-if="value.payment_method == 2">
                <b-badge variant="success">Bank</b-badge>
              </p>
              <p v-if="value.payment_method == 3">
                <b-badge variant="info">Mobile</b-badge>
              </p>
            </td>
            <td>
              {{ value.cash_in }}
            </td>
            <td>
              <p v-if="value.due">{{ value.due.amount }}</p>
              <p v-else>0</p>
            </td>

            <td>
              <nuxt-link v-if="value.due.amount > 0" :to="{ name: 'profile-property-id-details', params: { id: value.property_id } }" rel="tooltip"
                class="btn btn-sm btn-secondary btn-simple" title="Get due payment">
                <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </DataTable>

      <pagination :pagination="pagination" @prev="getData(pagination.prevPageUrl)"
        @next="getData(pagination.nextPageUrl)">
      </pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Datatable/Pagination";
import DataTable from "@/components/Datatable/DataTable";
import { dateMixin } from '../../../../mixins/date-mixin';

export default {
  layout: 'dashboard',
  name: "payment-reports",
  components: { DataTable, Pagination },
  mixins: [dateMixin],
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Date', name: 'date' },
      { width: '', label: 'Method', name: 'method' },
      { width: '', label: 'Paid', name: 'paid' },
      { width: '', label: 'Due', name: 'due' },
      { width: '', label: 'Actions', name: 'actions' },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
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
        propertyId: this.$route.params.id,
        userId: this.$auth.user.landlord_id
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
    getData(url = 'property/payment-reports') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }
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
  }
}
</script>

<style>

</style>
