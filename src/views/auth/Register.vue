<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>

          <div class="card-body">
            <form method="POST" @submit.prevent="onSubmit">
              <div class="form-group row">
                <label
                  for="firstName"
                  class="col-md-4 col-form-label text-md-right"
                  >First name <span class="required">*</span></label
                >

                <div class="col-md-6">
                  <input
                    id="firstName"
                    type="text"
                    v-model="firstName"
                    class="form-control"
                    :class="{ invalid: $v.firstName.$error }"
                    name="firstName"
                    required
                    autocomplete="firstName"
                    autofocus
                    @blur="$v.firstName.$touch()"
                  />
                  <p v-if="$v.firstName.$error">
                    First name is required
                  </p>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="lastName"
                  class="col-md-4 col-form-label text-md-right"
                  >Last name <span class="required">*</span></label
                >

                <div class="col-md-6">
                  <input
                    id="lastName"
                    type="text"
                    v-model="lastName"
                    class="form-control"
                    :class="{ invalid: $v.lastName.$error }"
                    name="lastName"
                    required
                    autocomplete="lastName"
                    @blur="$v.lastName.$touch()"
                  />
                  <p v-if="$v.lastName.$error">
                    Last name is required
                  </p>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="username"
                  class="col-md-4 col-form-label text-md-right"
                  >Username <span class="required">*</span></label
                >

                <div class="col-md-6">
                  <input
                    id="username"
                    type="text"
                    v-model="username"
                    class="form-control"
                    :class="{ invalid: $v.username.$error }"
                    name="username"
                    required
                    autocomplete="username"
                    @blur="$v.username.$touch()"
                  />
                  <p v-if="!$v.username.email">
                    Please provide a valid email address
                  </p>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password <span class="required">*</span></label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    :class="{ invalid: $v.password.$error }"
                    name="password"
                    required
                    autocomplete="current-password"
                    v-model="password"
                    @blur="$v.password.$touch()"
                  />
                  <small>
                    The password must be at least
                    {{ $v.password.$params.minVal }} characters
                  </small>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Confirm Password <span class="required">*</span></label
                >

                <div class="col-md-6">
                  <input
                    id="confirmPassword"
                    type="password"
                    class="form-control"
                    :class="{ invalid: $v.confirmPassword.$error }"
                    name="confirmPassword"
                    required
                    v-model="confirmPassword"
                    @blur="$v.confirmPassword.$touch()"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="$v.$invalid"
                    @click.prevent="onSubmit"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSubmit() {
      this.$v.$touch();

      if (this.$v.firstName.$error) {
        alert("First name is required");
        return;
      }

      if (this.$v.lastName.$error) {
        alert("Last name is required");
        return;
      }

      if (this.$v.username.$error) {
        alert("The email address is not valid");
        return;
      }

      if (this.$v.password.$error) {
        alert("The password requires at least 6 characters");
        return;
      }

      if (this.$v.confirmPassword.$error) {
        alert("The passwords must match");
        return;
      }

      this.$store.dispatch("register", {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      });
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    username: {
      required,
      email
      // Add delay of some kind to not spam our backend for each key stroke
      /* unique: val => {
        if (val === "") {
          return true;
        }

        return axios
          .get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then(res => {
            return Object.keys(res.data).length === 0;
          });
      } */
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs("password")
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

input.invalid {
  border: 1px solid red;
  background-color: #ffc9aa;
}

span.required {
  color: red;
}
</style>
