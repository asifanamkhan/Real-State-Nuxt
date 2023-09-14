<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>

    <MainCard v-else title="Full tenant informations">
      <template v-slot:actions>
        <button v-if="tenant.status === 4" class="btn btn-sm btn-success" @click="approve">Approve</button>
        <button v-if="tenant.status === 5" class="btn btn-sm btn-success" disabled>Approved</button>
        <button class="btn btn-sm btn-outline-danger" @click="decline">Decline</button>
      </template>

      <div class="row p-1">
        <b-col md="3">
          <img :src="imageUrl + tenant.image" alt="Tenant photo" width="150px">
        </b-col>
        <b-col md="6"></b-col>
        <b-col md="3">
          <div class="d-flex justify-content-end flex-column p-1 mt-2">
            <p class="mb-1"><b>Flat:</b> {{ tenant.flatName }}</p>
            <p class="mb-1"><b>Holding:</b> {{ tenant.holding }}</p>
            <p class="mb-1"><b>Road:</b> {{ tenant.road }}</p>
            <p class="mb-1"><b>Post code:</b> {{ tenant.zip }}</p>
          </div>
        </b-col>
      </div>

      <b-row class="mt-4">
        <b-col sm="9" class="text-secondary">
          <div class="form-group">
            <label for="issus_date">
              <h6 class="mb-0">Issus Date:</h6>
            </label>
            <input type="date" v-model="issus_date" class="form-control custom-input-control">
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="3">
          <h6 class="mb-0">Name:</h6>
        </b-col>
        <b-col sm="9" class="text-secondary">{{ tenant.name }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="3">
          <h6 class="mb-0">Father's name:</h6>
        </b-col>
        <b-col sm="9" class="text-secondary">{{ tenant.fathers_name }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="6">
          <b-row>
            <b-col sm="6">
              <h6 class="mb-0">Date of birth:</h6>
            </b-col>
            <b-col sm="6" class="text-secondary">{{ tenant.dob }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="6" class="text-secondary">
          <b-row>
            <b-col sm="4">
              <h6 class="mb-0">Marital Status:</h6>
            </b-col>
            <b-col sm="8" class="text-secondary">
              <b-badge v-if="tenant.marital_status === 1" variant="warning">Single</b-badge>
              <b-badge v-if="tenant.marital_status === 2" variant="warning">Married</b-badge>
              <b-badge v-if="tenant.marital_status === 3" variant="warning">Divorced</b-badge>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="3">
          <h6 class="mb-0">Present Address:</h6>
        </b-col>
        <b-col sm="9" class="text-secondary">{{ tenant.present_address }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="6">
          <b-row>
            <b-col sm="6">
              <h6 class="mb-0">Occupation:</h6>
            </b-col>
            <b-col sm="6" class="text-secondary">{{ tenant.occupation }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="6" class="text-secondary">
          <b-row>
            <b-col sm="4">
              <h6 class="mb-0">Office Address:</h6>
            </b-col>
            <b-col sm="8" class="text-secondary">
              {{ tenant.office_address }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="6">
          <b-row>
            <b-col sm="6">
              <h6 class="mb-0">Religion:</h6>
            </b-col>
            <b-col sm="6" class="text-secondary">{{ tenant.religion }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="6" class="text-secondary">
          <b-row>
            <b-col sm="4">
              <h6 class="mb-0">Education:</h6>
            </b-col>
            <b-col sm="8" class="text-secondary">
              {{ tenant.edu_qualif }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="6">
          <b-row>
            <b-col sm="6">
              <h6 class="mb-0">Phone:</h6>
            </b-col>
            <b-col sm="6" class="text-secondary">{{ tenant.phone }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="6" class="text-secondary">
          <b-row>
            <b-col sm="4">
              <h6 class="mb-0">E-mail:</h6>
            </b-col>
            <b-col sm="8" class="text-secondary">
              {{ tenant.email }}
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="3">
          <h6 class="mb-0">National Id:</h6>
        </b-col>
        <b-col sm="9" class="text-secondary">{{ tenant.nid }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="3">
          <h6 class="mb-0">Passport:</h6>
        </b-col>
        <b-col sm="9" class="text-secondary">{{ tenant.passport }}</b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Emergency Contact:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Relation</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ emergencyContact.name }}</td>
              <td>{{ emergencyContact.relation }}</td>
              <td>{{ emergencyContact.address }}</td>
              <td>{{ emergencyContact.phone }}</td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Family Members / Mess members:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Occupation</th>
              <th scope="col">Phone</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(membar, index) in familyMembers" :key="index">
              <td>{{ membar.name }}</td>
              <td>{{ membar.age }}</td>
              <td>{{ membar.occupation }}</td>
              <td>{{ membar.phone }}</td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Home Servant:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">National Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ homeServant.name }}</td>
              <td>{{ homeServant.nid }}</td>
              <td>{{ homeServant.phone }}</td>
              <td>{{ homeServant.address }}</td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Driver:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">National Id</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ driver.name }}</td>
              <td>{{ driver.nid }}</td>
              <td>{{ driver.phone }}</td>
              <td>{{ driver.address }}</td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Previus Landlord:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ previusLandlord.name }}</td>
              <td>{{ previusLandlord.phone }}</td>
              <td>{{ previusLandlord.address }}</td>
            </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col sm="12">
          <h6 class="mb-0">Reasons for previous leaving home:</h6>
        </b-col>
        <b-col sm="12" class="text-secondary mt-2">
          {{ tenant.leaving_home }}
        </b-col>
      </b-row>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';

export default {
  layout: 'dashboard',
  name: 'deed-approve',
  components: { MainCard },
  data() {
    return {
      isLoading: true,
      emergencyContact: '',
      familyMembers: '',
      homeServant: '',
      previusLandlord: '',
      driver: '',
      tenant: {},
      name: '',
      mobile: '',
      issus_date: '',
      userId: this.$auth.user.id,
      deedId: this.$route.params.id
    }
  },
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  async created() {
    await this.$axios.$post('property/deed/tenant-info', { deedId: this.deedId, userId: this.userId })
      .then(res => {
        if (res.data.tenant.status === 4 || res.data.tenant.status === 5) {
          this.tenant = res.data.tenant;
          this.name = res.data.tenant.name;
          this.mobile = res.data.tenant.phone;
          this.issus_date = res.data.tenant.issue_date;
          this.emergencyContact = res.data.tenant.emergency_contact;
          this.familyMembers = res.data.tenant.family_members;
          this.homeServant = res.data.tenant.home_servant;
          this.driver = res.data.tenant.driver;
          this.previusLandlord = res.data.tenant.previus_landlord;
          this.isLoading = false;
        }else {
          this.$router.push({ name: 'profile-property-deed-request' });
          return;
        }
      }).catch(err => {
        alert(err);
      });
  },
  methods: {
    approve() {
      this.$swal.fire({
        title: 'Are you confirm to approve tenant for this property?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            deedId: this.deedId,
            userId: this.userId,
            mobile: this.mobile,
            name: this.name,
            date: this.issus_date
          };
          this.$axios.$post('property/deed/approve', data)
            .then(response => {
              this.$swal.fire('Success', 'Deed successfully approved');
              this.$router.push({ name: 'profile-property-deed-approved' });
            }).catch(error => {
              alert(error);
            })
        }
      })
    },
    decline() {
      this.$swal.fire({
        title: 'Are you confirm to decline this request?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            deedId: this.$route.params.id,
            userId: this.userId
          };
          this.$axios.$post('property/deed/decline', data)
            .then(response => {
              this.$swal.fire('Success', 'Request declined');
              this.$router.push({ name: 'profile-property-deed-request' });
            }).catch(error => {
              alert(error);
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
