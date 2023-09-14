<template>
  <div>
    <div class="submit-form">
      <b-row>
        <b-col md="12">
          <h4>Account Information</h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col lg="8">
          <div class="setting-form">
            <b-form>
              <div class="form-group">
                <label for="firstname">First Name</label>
                <input type="text" name="firstname" id="firstname" class="form-control" placeholder="First name">
              </div>

              <div class="form-group">
                <label for="lastname">Last Name</label>
                <input type="text" name="lastname" id="lastname" class="form-control" placeholder="Last name">
              </div>

              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" name="phone" id="phone" class="form-control" placeholder="Phone">
              </div>

              <div class="form-group">
                <label for="phone">Short description</label>
                <textarea name="description" id="description" rows="3" placeholder="Tell something about yourself..."
                  class="form-control"></textarea>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="Email">
              </div>

              <div class="form-group">
                <label>Birthday</label>
                <div class="birthday-select">
                  <select name="year" id="" class="form-control">
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                  </select>

                  <select name="month" id="" class="form-control">
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                  </select>

                  <select name="date" id="" class="form-control">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="gender">Gender</label>
                <select name="gender" id="gender" class="form-control">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div class="form-group">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>

            </b-form>
          </div>
        </b-col>
        <b-col lg="4">
          <h5>Profile picture</h5>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "settings"
}
</script>

<style scoped>

</style>
