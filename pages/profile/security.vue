<template>
  <div>
    <b-row>
      <b-col md="12">
        <h4>Security</h4>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <div class="setting-form">
          <b-form>
            <div class="form-group">
              <label for="password">New password</label>
              <input type="password" name="password" id="password" class="form-control">
            </div>

            <div class="form-group">
              <label for="password_confirmation">Confirmation password</label>
              <input type="password" name="password_confirmation" id="password_confirmation" class="form-control">
            </div>

            <div class="form-group">
              <button type="submit" class="btn btn-secondary btn-browse-more">Update password</button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  name: "security"
}
</script>

<style scoped>

</style>
