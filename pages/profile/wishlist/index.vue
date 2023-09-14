<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>
    <MainCard v-else title="All Wishlists">
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
            {{ value.property_ad.property.name }}
          </td>
          <td>
            <nuxt-link :to="{ name: 'property-id-show', params: { id: value.property_ad.property.id } }" rel="tooltip"
                       class="btn btn-sm btn-info btn-simple" title="View">
              <font-awesome-icon icon="fa-solid fa-eye" />
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
  name: "index",
  components: { DataTable, Pagination, MainCard },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '10%', label: 'Sl', name: 'id' },
      { width: '', label: 'Property name', name: 'propertyname' },
      { width: '20%', label: 'Action', name: '' },
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
        user_id: this.$auth.user.id
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
    getData(url = '/wishlist/get-lists') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          console.log(response);
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }

          this.isLoading = false;
        }).catch(error => {
          alert(error);
        });
    },
    async deleteItem(id) {
      let result = confirm("Want to delete?");
      if (result) {
        await this.$axios.$post('wishlist/delete', { wishlistId: id, user_id: this.$auth.user.id })
          .then(response => {
            if (id) {
              this.values.splice(this.values.indexOf(id), 1);
            }
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Wishlist removed successfully!'
            });
          }).catch(error => {
            alert(error);
          });
      }
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
