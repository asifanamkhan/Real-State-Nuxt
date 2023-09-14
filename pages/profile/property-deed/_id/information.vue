<template>
  <div>
    <div v-if="isLoading" class="d-flex justify-content-center mb-3">
      <p>Loading...</p>
    </div>

    <MainCard v-else title="Submit your information">
      <div class="row">
        <b-col md="3">
          <b-form-group label="Your passport size photo">
            <Dropzone id="foo" ref="el" :options="options" :destroyDropzone="false"></Dropzone>
          </b-form-group>
        </b-col>
        <b-col md="6"></b-col>
        <b-col md="3">
          <div class="d-flex justify-content-end flex-column p-1 mt-2">
            <p class="mb-1"><b>Flat:</b> {{ flatName }}</p>
            <p class="mb-1"><b>Holding:</b> {{ holding }}</p>
            <p class="mb-1"><b>Road:</b> {{ road }}</p>
            <p class="mb-1"><b>Post code:</b> {{ zip }}</p>
          </div>
        </b-col>
      </div>

      <form @submit.prevent="store">
        <div class="form-group">
          <label for="tenant_name">Your name</label>
          <input type="text" id="tenant_name" class="form-control" v-model="form.tenant_name" placeholder="Your name">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.tenant_name">{{ errors.tenant_name[0] }}</strong>
        </div>

        <div class="form-group">
          <label for="fathers_name">Father's name</label>
          <input type="text" id="fathers_name" class="form-control" v-model="form.fathers_name" placeholder="Father's name">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.fathers_name">{{ errors.fathers_name[0] }}</strong>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="date_of_birth">Date of birth</label>
            <input type="date" id="date_of_birth" class="form-control" v-model="form.date_of_birth">
            <strong class="text-danger" style="font-size: 12px" v-if="errors.date_of_birth">{{ errors.date_of_birth[0] }}</strong>
          </div>
          <div class="form-group col-md-6">
            <label for="marital_status">Marital status</label>
            <select id="marital_status" v-model="form.marital_status" class="form-control">
              <option>Choose...</option>
              <option value="1">Single</option>
              <option value="2">Married</option>
              <option value="3">Divorced</option>
            </select>
            <strong class="text-danger" style="font-size: 12px" v-if="errors.marital_status">{{ errors.marital_status[0] }}</strong>
          </div>
        </div>

        <div class="form-group">
          <label for="present_address">Present address</label>
          <textarea v-model="form.present_address" id="present_address" class="form-control" cols="30" rows="3"></textarea>
          <strong class="text-danger" style="font-size: 12px" v-if="errors.present_address">{{ errors.present_address[0] }}</strong>
        </div>

        <div class="form-group">
          <label for="fathers_name">Occupation</label>
          <input type="text" id="fathers_name" class="form-control" v-model="form.occupation" placeholder="Occupation">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.occupation">{{ errors.occupation[0] }}</strong>
        </div>

        <div class="form-group">
          <label for="office_address">Office address (Optional)</label>
          <textarea v-model="form.office_address" id="office_address" class="form-control" cols="30" rows="3"></textarea>
          <strong class="text-danger" style="font-size: 12px" v-if="errors.office_address">{{ errors.office_address[0] }}</strong>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="religion">Religion</label>
            <input type="text" id="religion" class="form-control" v-model="form.religion" placeholder="Religion">
            <strong class="text-danger" style="font-size: 12px" v-if="errors.religion">{{ errors.religion[0] }}</strong>
          </div>
          <div class="form-group col-md-6">
            <label for="edu_qualif">Education Qualification</label>
            <input type="text" id="edu_qualif" class="form-control" v-model="form.edu_qualif" placeholder="Education Qualification">
            <strong class="text-danger" style="font-size: 12px" v-if="errors.edu_qualif">{{ errors.edu_qualif[0] }}</strong>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="phone">Phone</label>
            <input type="text" id="phone" class="form-control" v-model="form.phone" placeholder="Your phone number">
            <strong class="text-danger" style="font-size: 12px" v-if="errors.phone">{{ errors.phone[0] }}</strong>
          </div>
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input type="email" id="email" class="form-control" v-model="form.email" placeholder="Your email">
            <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{ errors.email[0] }}</strong>
          </div>
        </div>

        <div class="form-group">
          <label for="nid">National Id</label>
          <input type="text" id="nid" class="form-control" v-model="form.nid" placeholder="National Id">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{ errors.nid[0] }}</strong>
        </div>

        <div class="form-group">
          <label for="passport">Passport number (Optional)</label>
          <input type="text" id="passport" class="form-control" v-model="form.passport" placeholder="Passport number">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.passport">{{ errors.passport[0] }}</strong>
        </div>

        <hr>
        <h6 for="emergency_contact">Emergency Contact : </h6>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="emergency-name">name</label>
            <input type="text" id="emergency-name" class="form-control" v-model="form.emergency_contact.name" placeholder="Name">
            <strong class="text-danger" style="font-size: 12px" v-if="errors['emergency_contact.name']">{{ errors["emergency_contact.name"][0] }}</strong>
          </div>
          <div class="form-group col-md-6">
            <label for="emergency-relation">Relation</label>
            <input type="text" id="emergency-relation" class="form-control" v-model="form.emergency_contact.relation" placeholder="Relation">
            <strong class="text-danger" style="font-size: 12px" v-if="errors['emergency_contact.relation']">{{ errors["emergency_contact.relation"][0] }}</strong>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="emergency-address">Address</label>
            <input type="text" id="emergency-address" class="form-control" v-model="form.emergency_contact.address" placeholder="Address">
            <strong class="text-danger" style="font-size: 12px" v-if="errors['emergency_contact.address']">{{ errors["emergency_contact.address"][0] }}</strong>
          </div>
          <div class="form-group col-md-6">
            <label for="emergency-phone">Phone</label>
            <input type="text" id="emergency-phone" class="form-control" v-model="form.emergency_contact.phone" placeholder="Phone">
            <strong class="text-danger" style="font-size: 12px" v-if="errors['emergency_contact.phone']">{{ errors["emergency_contact.phone"][0] }}</strong>
          </div>
        </div>

        <hr>
        <h6 class="d-flex justify-content-between align-items-center">
          <span>Family Members / Mess Members:</span>
          <div>
            <button type="button" @click="addMembers" class="btn btn-sm btn-primary mr-1">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </div>
        </h6>
        <div v-for="(member, index) in form.family_members" :key="index" class="form-row">
          <div class="form-group col-md-3">
            <label for="family_members-name">Name</label>
            <input type="text" id="family_members-name" class="form-control" v-model="member.name" placeholder="Name">
          </div>
          <div class="form-group col-md-2">
            <label for="family_members-age">Age</label>
            <input type="text" id="family_members-age" class="form-control" v-model="member.age" placeholder="Age">
          </div>
          <div class="form-group col-md-3">
            <label for="family_members-occupation">Occupation</label>
            <input type="text" id="family_members-occupation" class="form-control" v-model="member.occupation" placeholder="Occupation">
          </div>
          <div class="form-group col-md-3">
            <label for="family_members-phone">Phone</label>
            <input type="text" id="family_members-phone" class="form-control" v-model="member.phone" placeholder="Phone">
          </div>
          <div class="col-md-1 d-flex justify-content-center align-items-center" style="margin-top: 15px">
            <button type="button" @click="addMembers" class="btn btn-sm btn-primary mr-1">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
            <button type="button" @click="removeMember(member)" class="btn btn-sm btn-danger">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
          </div>
        </div>

        <hr>
        <h6 for="home_servant">Home servant (Optional):</h6>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="home_servant-name">name</label>
            <input type="text" id="home_servant-name" class="form-control" v-model="form.home_servant.name" placeholder="Name">
          </div>
          <div class="form-group col-md-6">
            <label for="home_servant-nid">National ID</label>
            <input type="text" id="home_servant-nid" class="form-control" v-model="form.home_servant.nid" placeholder="National ID">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="home_servant-address">Present Address</label>
            <input type="text" id="home_servant-address" class="form-control" v-model="form.home_servant.address" placeholder="Address">
          </div>
          <div class="form-group col-md-6">
            <label for="home_servant-phone">Phone</label>
            <input type="text" id="home_servant-phone" class="form-control" v-model="form.home_servant.phone" placeholder="Phone">
          </div>
        </div>

        <hr>
        <h6 for="driver">Driver (Optional):</h6>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="driver-name">name</label>
            <input type="text" id="driver-name" class="form-control" v-model="form.driver.name" placeholder="Name">
          </div>
          <div class="form-group col-md-6">
            <label for="driver-nid">National ID</label>
            <input type="text" id="driver-nid" class="form-control" v-model="form.driver.nid" placeholder="National ID">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="driver-address">Address</label>
            <input type="text" id="driver-address" class="form-control" v-model="form.driver.address" placeholder="Address">
          </div>
          <div class="form-group col-md-6">
            <label for="driver-phone">Phone</label>
            <input type="text" id="driver-phone" class="form-control" v-model="form.driver.phone" placeholder="Phone">
          </div>
        </div>

        <hr>
        <h6 for="previus_landlord">Previus landlord (Optional):</h6>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="previus_landlord-name">name</label>
            <input type="text" id="previus_landlord-name" class="form-control" v-model="form.previus_landlord.name" placeholder="Name">
          </div>
          <div class="form-group col-md-6">
            <label for="previus_landlord-phone">Phone</label>
            <input type="text" id="previus_landlord-phone" class="form-control" v-model="form.previus_landlord.phone" placeholder="Phone">
          </div>
        </div>

        <div class="form-group">
          <label for="previus_landlord-address">Address</label>
          <input type="text" id="previus_landlord-address" class="form-control" v-model="form.previus_landlord.address" placeholder="Address">
        </div>
        <hr>

        <div class="form-group">
          <label for="leaving_home">Reasons for previous leaving home (Optional)</label>
          <textarea v-model="form.leaving_home" id="leaving_home" class="form-control" cols="30" rows="3"></textarea>
        </div>

        <div class="form-group">
          <label for="issue_date">Date</label>
          <input type="date" id="issue_date" class="form-control" v-model="form.issue_date">
          <strong class="text-danger" style="font-size: 12px" v-if="errors.issue_date">{{ errors.issue_date[0] }}</strong>
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isDisable">Submit</button>
      </form>
    </MainCard>
  </div>
</template>

<script>
import MainCard from '@/components/frontend/dashboard/MainCard.vue';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  layout: 'dashboard',
  name: "deed-information",
  components: { Dropzone, MainCard },
  data() {
    return {
      isDisable: false,
      isLoading: true,
      errors: {},
      flatName: '',
      holding: '',
      road: '',
      zip: '',
      options: {
        url: "url",
        addRemoveLinks: true,
        headers: { "Authorization": this.$auth.strategy.token.get() },
        maxFiles: 1,
        autoProcessQueue: false,
        acceptedFiles: ".jpeg,.jpg,.png"
      },
      form: {
        property_deed_id: this.$route.params.id,
        tenant_name: '',
        fathers_name: '',
        date_of_birth: '',
        marital_status: '',
        occupation: '',
        office_address: '',
        present_address: '',
        religion: '',
        edu_qualif: '',
        phone: '',
        email: '',
        nid: '',
        passport: '',
        emergency_contact: {
          name: '',
          relation: '',
          address: '',
          phone: '',
        },
        family_members: [{
          name: '',
          age: '',
          occupation: '',
          phone: ''
        }],
        home_servant: {
          name: '',
          nid: '',
          address: '',
          phone: ''
        },
        driver: {
          name: '',
          nid: '',
          address: '',
          phone: ''
        },
        previus_landlord: {
          name: '',
          phone: '',
          address: ''
        },
        leaving_home: '',
        issue_date: '',
      }
    }
  },
  async created() {
    await this.$axios.$post('property/deed/information-data', {deedId: this.$route.params.id})
      .then(res => {
        if (res.data.information.status != 3) {
          this.$router.push({ name: 'profile-property-deed-apply' });
          return;
        }
        this.flatName = res.data.information.property_name;
        this.holding = res.data.information.holding;
        this.road = res.data.information.road;
        this.zip = res.data.information.zip;

        this.form.tenant_name = res.data.information.tenant_name;
        this.form.phone = res.data.information.mobile;
        this.form.email = res.data.information.email;
        this.form.nid = res.data.information.tenant_nid;
        this.isLoading = false;
      }).catch(err => {
        alert(err);
      });
  },
  methods: {
    async store() {
      this.isDisable = true;
      await await this.$axios.$post('property/deed/information/store', this.form)
        .then(res => {
          this.isDisable = false;
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Your information successfully submited.'
          });
          this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'property/deed/information/image/' + res.data.information.id;
          this.$refs.el.dropzone.processQueue();

          this.$router.push({ name: 'profile-property-deed-apply' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        });
    },
    addMembers(index) {
      let length = this.form.family_members.length;

      if (length > 9) {
        alert('Mximum 10 family members you can add');
        return;
      }

      const newMembers = {
        name: '',
        age: '',
        occupation: '',
        phone: ''
      };

      this.form.family_members.splice(index, 0, newMembers);
    },
    removeMember(member) {
      this.form.family_members = this.form.family_members.filter(
          (q) => q !== member
      );
    }
  }
}
</script>

<style>

</style>
