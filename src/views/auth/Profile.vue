<template>
  <div class="container content posts">
    <div class="post-body mt-5">
      <div id="avatar-form">
        <label for="avatarFileInput" class="w-100">
          <div class="avatar-box">
            <div class="avatar" v-if="profile.avatar !== undefined || profile.avatar !== null">
              <img
                id="avatar"
                :src="profile.avatar.secure_url"
                :alt="profile.firstName"
                class="avatar"
                style="max-width:100%;"
              />
            </div>
          </div>
          <div class="avatar-link text-center">
            <input
              class="hide"
              type="file"
              ref="file"
              accept="image/*"
              id="avatarFileInput"
              @change="onChosenFile"
            />
            Choose avatar
          </div>
        </label>
        <div class="chosen-avatar-box" v-if="chosenAvatar !== ''">
          <span>Chosen image: {{ chosenAvatar.name }}</span>
          <span>
            <button
              @click.prevent="onAvatarUpload"
              class="btn btn-primary"
              :disabled="chosenAvatar === '' || chosenAvatar === undefined"
            >Upload</button>
          </span>
        </div>
      </div>

      <section class="profile-section">
        <div class="profile-information pt-5">
          <div class="form-group row">
            <label for="firstName" class="col-4 pr-0 col-form-label text-md-right">
              First name
              <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="firstName"
                type="text"
                name="firstName"
                class="form-control light-weight"
                :class="{ invalid: $v.profile.firstName.$error }"
                v-model="profile.firstName"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="lastName" class="col-4 pr-0 col-form-label text-md-right">
              Last name
              <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="lastName"
                type="text"
                class="form-control light-weight"
                :class="{ invalid: $v.profile.lastName.$error }"
                v-model="profile.lastName"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="username" class="col-4 pr-0 col-form-label text-md-right">
              Username
              <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="username"
                type="text"
                class="form-control light-weight"
                :class="{ invalid: $v.profile.username.$error }"
                v-model="profile.username"
                name="username"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="email" class="col-4 pr-0 col-form-label text-md-right">
              E-Mail Address
              <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="email"
                type="email"
                class="form-control light-weight"
                :class="{ invalid: $v.profile.email.$error }"
                v-model="profile.email"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="address" class="col-4 pr-0 col-form-label text-md-right">Address</label>

            <div class="col-8 pl-0">
              <input
                id="address"
                type="text"
                class="form-control light-weight"
                name="address"
                v-model="profile.address"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="city" class="col-4 pr-0 col-form-label text-md-right">City</label>

            <div class="col-8 pl-0">
              <input id="city" type="text" class="form-control light-weight" v-model="profile.city" />
            </div>
          </div>

          <div class="form-group row">
            <label for="zipcode" class="col-4 pr-0 col-form-label text-md-right">Zip code</label>

            <div class="col-8 pl-0">
              <input
                id="zipcode"
                type="text"
                class="form-control light-weight"
                name="zipcode"
                v-model="profile.zipcode"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="country" class="col-4 pr-0 col-form-label text-md-right">Country</label>

            <div class="col-8 pl-0">
              <input
                id="country"
                type="text"
                class="form-control light-weight"
                name="country"
                v-model="profile.country"
              />
            </div>
            <!-- <div class="col-8 pl-0">
                <div class="input-group mb-3">
                  <select
                    id="country"
                    class="custom-select @error('country') is-invalid @enderror"
                    name="country_id"
                  >
                    <option value="0" selected>Choose...</option>
                    @foreach($countries as $country)
                    <option value="{{ $country->id }}" {{ $user-
                      >country_id == $country->id ? 'selected' : '' }}>
                      {{ $country->name }}
                    </option>
                    @endforeach
                  </select>
                </div>
            </div>-->
          </div>

          <div class="form-group row">
            <label for="birthday" class="col-4 pr-0 col-form-label text-md-right">Birthday</label>

            <div class="col-8 pl-0">
              <input
                id="birthday"
                type="date"
                class="form-control light-weight"
                v-model="profile.birthday"
              />
            </div>
          </div>

          <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4">
              <button
                @click.prevent="onSaveProfileForm"
                class="btn btn-primary float-right"
              >Save profile</button>
            </div>
          </div>
        </div>
      </section>
      <section class="profile-section">
        <div class="header">Change password</div>

        <div class="form-group row">
          <label for="password" class="col-4 pr-0 col-form-label text-md-right">Password</label>

          <div class="col-8 pl-0">
            <input
              id="password"
              type="password"
              class="form-control light-weight"
              :class="{ invalid: $v.passwordForm.password.$error }"
              name="password"
              v-model="passwordForm.password"
              autocomplete="new-password"
            />
          </div>
        </div>

        <div class="form-group row">
          <label
            for="password-confirm"
            class="col-4 pr-0 col-form-label text-md-right"
          >Confirm Password</label>

          <div class="col-8 pl-0">
            <input
              id="confirmPassword"
              type="password"
              class="form-control light-weight"
              :class="{ invalid: $v.passwordForm.confirmPassword.$error }"
              name="confirmPassword"
              v-model="passwordForm.confirmPassword"
              autocomplete="new-password"
            />
          </div>
        </div>

        <div class="form-group row mb-0">
          <div class="col-md-6 offset-md-4">
            <button
              @click.prevent="onSavePasswordForm"
              class="btn btn-primary float-right"
            >Save password</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      profile: {
        userId: null,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        address: "",
        city: "",
        zipcode: "",
        country: "",
        birthday: "",
        avatar: null
      },
      chosenAvatar: "",
      passwordForm: {
        password: null,
        confirmPassword: null
      }
    };
  },
  validations: {
    profile: {
      username: {
        required,
        email
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      }
    },
    passwordForm: {
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        sameAs: sameAs("password")
      }
    }
  },
  /**
   * @todo Real time check with database so that we don't get duplicated email and usernames
   * Add logic for change password
   */
  methods: {
    onSavePasswordForm() {
      this.$v.passwordForm.$touch();

      if (this.$v.passwordForm.password.$error) {
        alert("The password requires at least 6 characters");
        return;
      }

      if (this.$v.passwordForm.confirmPassword.$error) {
        alert("The passwords does not match");
        return;
      }

      const response = this.$store.dispatch(
        "changePassword",
        this.passwordForm.password
      );

      if (response) {
        this.$v.passwordForm.$reset();
        this.passwordForm.password = "";
        this.passwordForm.confirmPassword = "";
      }
    },
    onSaveProfileForm() {
      this.$v.profile.$touch();

      if (this.$v.profile.username.$error) {
        alert("Enter a valid username (email)");
        return;
      }

      if (this.$v.profile.firstName.$error) {
        alert("Enter your first name");
        return;
      }

      if (this.$v.profile.lastName.$error) {
        alert("Enter your last name");
        return;
      }

      if (this.$v.profile.email.$error) {
        alert("Enter a valid email");
        return;
      }

      if (this.profile.userId === null) {
        alert("Something went wrong. Please reload");
        return;
      }

      this.$store.dispatch("profile/editProfile", this.profile);
      this.$v.profile.$reset();
    },
    onChosenFile() {
      if (this.$refs.file.files[0] === undefined) {
        return false;
      }
      this.chosenAvatar = this.$refs.file.files[0];
    },

    onAvatarUpload() {
      if (this.chosenAvatar === "") {
        alert("Choose an image");
        return;
      }

      this.uploadAvatar(this.chosenAvatar);
    },

    async uploadAvatar(file = null) {
      if (file === null) {
        alert("Somethings wrong! Try again");
        return;
      }

      const url = "https://api.cloudinary.com/v1_1/letstravel/upload";
      let formData = new FormData();
      formData.append("upload_preset", "letstravel_avatars");
      formData.append("tags", "avatar_upload");
      formData.append("file", file);

      const response = await axios
        .post(url, formData)
        .then(res => res.data)
        .catch(err => console.log(err));

      this.$store.dispatch("profile/editAvatar", response);
      this.chosenAvatar = "";
      this.profile.avatar = { ...response };
    }
  },

  created() {
    this.profile.userId = this.$store.getters.userId;
    this.profile = this.$store.getters["profile/getProfile"];
  }
};
</script>

<style scope>
.chosen-avatar-box {
  display: grid;
  text-align: center;
}
</style>
