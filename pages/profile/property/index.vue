<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Property Lists">
      <template v-slot:actions>
        <nuxt-link class="btn btn-sm btn-info" :to="{ name: 'profile-property-create' }">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Create property
        </nuxt-link>
      </template>

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
          <td>{{ value.name }}</td>
          <td>
            <div v-if="value.property_category == 1"> Commercial</div>
            <div v-if="value.property_category == 2"> Residential</div>
          </td>
          <td>
            <div v-if="value.sale_type == 1"> Rent</div>
            <div v-if="value.sale_type == 2"> Sale</div>
          </td>
          <td>{{ value.rent_amount }}</td>
          <td>
            <b-button :class="value.status == 1 ? 'btn-sm btn-info' : 'btn-sm btn-danger'">
              {{ value.status == 1 ? 'Active' : 'Pending' }}
            </b-button>
          </td>
          <td>
            <nuxt-link :to="{ name: 'profile-property-id-details', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-info btn-simple" title="Details">
              <font-awesome-icon icon="fa-solid fa-eye" />
            </nuxt-link>

            <nuxt-link :to="{ name: 'profile-property-id-transactions', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-primary btn-simple" title="Show property transactions">
              <font-awesome-icon :icon="['fas', 'money-bill']" />
            </nuxt-link>

            <nuxt-link :to="{ name: 'profile-property-id-edit', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-success btn-simple" title="Edit">
              <font-awesome-icon icon="fa-solid fa-edit" />
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

export default {
  layout: 'dashboard',
  name: "properties",
  components: { DataTable, Pagination, MainCard },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Name', name: 'name' },
      { width: '', label: 'Type', name: 'sale_type' },
      { width: '', label: 'Lease Type', name: 'lease_type' },
      { width: '', label: 'Amount', name: 'rent_amount' },
      { width: '', label: 'Status', name: 'status' },
      { width: '', label: 'Action', name: '' },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isLoading: true,
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
    getData(url = '/property/list') {
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
      return array.findIndex(i => i[key] == value)
    },
  }
}
</script>

<style scoped>

</style>
