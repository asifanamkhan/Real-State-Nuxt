<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="Mobile Bank Account Lists">
      <template v-slot:actions>
        <nuxt-link class="btn btn-sm btn-info" :to="{ name: 'profile-accounts-mobile-bank-create' }">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Create
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
            <td>{{ value.mobile_bank.name }}</td>
            <td>{{ value.account_number }}</td>
            <td>
              <nuxt-link :to="{ name: 'profile-accounts-mobile-bank-id-edit', params: { id: value.id } }" rel="tooltip"
                class="btn btn-sm btn-success btn-simple" title="Edit">
                <font-awesome-icon icon="fa-solid fa-edit" />
              </nuxt-link>

              <nuxt-link :to="{ name: 'profile-accounts-mobile-bank-id-transactions', params: { id: value.id } }" rel="tooltip"
                class="btn btn-sm btn-primary btn-simple" title="Show mobile bank account transactions">
                <font-awesome-icon :icon="['fas', 'money-bill']" />
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

export default {
  layout: 'dashboard',
  name: 'payment-method',
  components: { DataTable, Pagination, MainCard },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Mobile Bank', name: 'mobile_banking_id' },
      { width: '', label: 'Account', name: 'account_number' },
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
    getData(url = 'accounts/mobile-banks') {
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
    async deleteItem(id) {
      let result = confirm("Want to delete?");
      if (result) {
        await this.$axios.$delete('accounts/mobile-method-delete/' + id)
          .then(response => {
            this.getData();
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Method Deleted Successfully'
            });
          })
          .catch(error => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
            }
            else {
              alert(error.response.message)
            }
          });
      }
    },
  }
}
</script>

<style></style>
