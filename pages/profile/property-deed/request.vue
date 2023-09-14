<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Property deed request">
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
          <td>
            {{ value.tenant.name }}
          </td>
          <td>
            <nuxt-link :to="{ name: 'profile-property-id-details', params: { id: value.property_id } }"
                       title="Details">
              {{ value.property.name }}
            </nuxt-link>
          </td>
          <td>
            {{ value.start_date ?? 'Not start' }}
          </td>
          <td>
            <b-badge v-if="value.status === 0" variant="danger">Declined</b-badge>
            <b-badge v-if="value.status === 1" variant="warning">Pending</b-badge>
            <b-badge v-if="value.status === 2" variant="secondary">Viewed</b-badge>
            <b-badge v-if="value.status === 3" variant="info">Accepted</b-badge>
            <b-badge v-if="value.status === 4" variant="primary">Information Submited from tenant</b-badge>
            <b-badge v-if="value.status === 5" variant="success">Approved</b-badge>
          </td>
          <td>
            <nuxt-link :to="{ name: 'profile-property-deed-id-show', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-warning btn-simple" title="view request">
              <font-awesome-icon icon="fa-solid fa-eye" />
            </nuxt-link>

            <nuxt-link v-if="value.status === 4" :to="{ name: 'profile-property-deed-id-approve', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-info btn-simple" title="approve request">
              <font-awesome-icon v-if="value.status === 4" icon="fa-solid fa-check" />
            </nuxt-link>

            <nuxt-link v-if="value.status === 5" :to="{ name: 'profile-property-deed-id-approve', params: { id: value.id } }" rel="tooltip"
                       class="btn btn-sm btn-info btn-simple" title="show tennat informations">
              <font-awesome-icon v-if="value.status === 5" icon="fa-solid fa-circle-info" />
            </nuxt-link>

            <!-- <nuxt-link :to="{ name: 'profile-property-deed-id-get-rent', params: { id: value.id } }"
              rel="tooltip" class="btn btn-sm btn-secondary btn-simple" title="Get payment">
              <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
            </nuxt-link> -->
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
  name: "deed-request",
  components: { DataTable, Pagination, MainCard },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Tenant', name: 'name' },
      { width: '', label: 'Property', name: 'property' },
      { width: '', label: 'Start date', name: 'start_date' },
      { width: '', label: 'Status', name: 'status' },
      { width: '', label: 'Actions', name: 'actions' },
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
    getData(url = 'property/deed/request-list') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }

          this.isLoading = false;
        }).catch(errors => {
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
    }
  }
}
</script>

<style scoped>

</style>
