<template>
  <div>
    <div class="dashboard-wrapper border-radius-none">
      <div class="submit-form">
        <b-row>
          <b-col md="12">
            <h4>Packages</h4>
          </b-col>
        </b-row>

        <div>
          <b-alert show variant="info" class="current-package">
            <p>Your Credits: <strong>0 credits</strong></p>
          </b-alert>

          <div class="packages-listing">
            <b-row class="flex-items-xs-middle flex-items-xs-center">
              <b-col xs="12" lg="4" style="margin-top: 30px">
                <div class="card text-xs-center">
                  <div class="card-block">
                    <h4 class="card-title">Free First Post</h4>
                    <ul class="list-group">
                      <li class="list-group-item">Free 1 post(s)</li>
                      <li class="list-group-item">-</li>
                    </ul>
                    <button class="btn btn-primary mt-2">Purchase</button>
                  </div>
                </div>
              </b-col>

              <b-col xs="12" lg="4" style="margin-top: 30px">
                <div class="card text-xs-center">
                  <div class="card-block">
                    <h4 class="card-title">Single Post</h4>
                    <ul class="list-group">
                      <li class="list-group-item">$250 / per post</li>
                      <li class="list-group-item">$250 Total (Save 0%)</li>
                    </ul>
                    <button class="btn btn-primary mt-2">Purchase</button>
                  </div>
                </div>
              </b-col>

              <b-col xs="12" lg="4" style="margin-top: 30px">
                <div class="card text-xs-center">
                  <div class="card-block">
                    <h4 class="card-title">5 Posts</h4>
                    <ul class="list-group">
                      <li class="list-group-item">$250 / per post</li>
                      <li class="list-group-item">$1,000 Total (Save 20%)</li>
                    </ul>
                    <button class="btn btn-primary mt-2">Purchase</button>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>

      </div>
    </div>
    <div class="dashboard-wrapper border-radius-none">
      <b-row>
        <b-col md="12">
          <h4>Transactions</h4>
        </b-col>
      </b-row>
      <div>
        <div class="tc light-gray-text pa3">
          <div class="f5 mv2 b">Oops!</div>
          <div class="f6 mv2">No transactions</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "packages"
}
</script>

<style scoped>

</style>
