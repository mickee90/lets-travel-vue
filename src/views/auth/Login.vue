<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>

          <div class="card-body">
            <div class="form-group row">
              <label for="username" class="col-md-4 col-form-label text-md-right">Username</label>

              <div class="col-md-6">
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  :class="{ invalid: $v.username.$error }"
                  required
                  autocomplete="username"
                  autofocus
                  v-model="username"
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

              <div class="col-md-6">
                <input
                  id="password"
                  type="password"
                  class="form-control"
                  :class="{ invalid: $v.password.$error }"
                  required
                  autocomplete="current-password"
                  v-model="password"
                />
              </div>
            </div>

            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.username.$error) {
        alert("Enter your username");
        return;
      }

      if (this.$v.password.$error) {
        alert("Enter your password");
        return;
      }

      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required
    }
  }
};
</script>

<style scoped>
.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
}

span.required {
  color: red;
}
</style>
