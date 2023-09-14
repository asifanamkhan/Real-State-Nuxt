<template>
  <div>
    <div id="wrapper">
      <!-- Start Top Bar -->
      <Topbar />
      <!-- End Top Bar -->

      <!-- Start Navigation -->
      <Header />
      <!-- End Navigation -->

      <section class="bg-light" style="position: relative;">
        <button @click="isSidebar = !isSidebar" class="dashboard-menu-btn btn btn-sm btn-primary">
          <font-awesome-icon v-if="!isSidebar" :icon="['fas', 'bars']" />
          <font-awesome-icon v-else :icon="['fas', 'xmark']" />
        </button>
        <b-container fluid>
          <b-row>
            <!-- Sidebar -->
            <b-col lg="3" md="12">
              <Sidebar :isSidebar="isSidebar"/>
            </b-col>
            <!-- /.Sidebar -->

            <!-- Main Content -->
            <b-col lg="9" md="12" style="min-height: 590px;">
              <!-- <div class="dashboard-wrapper"> -->
              <Nuxt />
              <!-- </div> -->
            </b-col>
            <!--./ Main Content -->
          </b-row>
        </b-container>
      </section>

      <!-- Start Footer -->
      <Footer />
      <!-- End Footer -->
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/frontend/Topbar";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import Sidebar from '@/components/frontend/dashboard/Sidebar.vue';

export default {
  name: 'dashboard',
  components: { Footer, Header, Topbar, Sidebar },
  data() {
    return {
      isSidebar: false
    }
  }
}
</script>
