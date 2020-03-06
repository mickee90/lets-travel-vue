<template>
  <div class="container content posts">
    <div class="post-body" style="margin-top:70px">
      <div id="avatar-form">
        <label for="avatarFileInput" class="w-100">
          <div class="avatar-box">
            <div
              class="avatar"
              v-if="profile.avatar !== undefined || profile.avatar !== ''"
            >
              <img
                id="avatar"
                :src="profile.avatar"
                :alt="profile.name"
                class="avatar"
                style="max-width:100%;"
              />
            </div>
            <!-- <div class="avatar-placeholder" v-else>
            </div> -->
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
          <button
            @click.prevent="onAvatarUpload"
            class="btn btn-secondary"
            :disabled="chosenAvatar === '' || chosenAvatar === undefined"
          >
            Upload
          </button>
        </div>
        <div id="gallery"></div>
      </div>

      <section class="profile-section">
        <div class="profile-information">
          <div class="form-group row">
            <label
              for="firstName"
              class="col-4 pr-0 col-form-label text-md-right"
            >
              First name<span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="firstName"
                type="text"
                class="form-control light-weight"
                v-model="profile.firstName"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label
              for="lastName"
              class="col-4 pr-0 col-form-label text-md-right"
            >
              Last name <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="lastName"
                type="text"
                class="form-control light-weight"
                v-model="profile.lastName"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label
              for="username"
              class="col-4 pr-0 col-form-label text-md-right"
            >
              Username <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="username"
                type="text"
                class="form-control light-weight"
                v-model="profile.username"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="email" class="col-4 pr-0 col-form-label text-md-right">
              E-Mail Address <span class="required">*</span>
            </label>

            <div class="col-8 pl-0">
              <input
                id="email"
                type="email"
                class="form-control light-weight"
                v-model="profile.email"
                required
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="address" class="col-4 pr-0 col-form-label text-md-right"
              >Address
            </label>

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
            <label for="city" class="col-4 pr-0 col-form-label text-md-right">
              City
            </label>

            <div class="col-8 pl-0">
              <input
                id="city"
                type="text"
                class="form-control light-weight"
                v-model="profile.city"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="zipcode" class="col-4 pr-0 col-form-label text-md-right"
              >Zip code</label
            >

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
            <label for="country" class="col-4 pr-0 col-form-label text-md-right"
              >Country</label
            >

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
              </div> -->
          </div>

          <div class="form-group row">
            <label
              for="birthday"
              class="col-4 pr-0 col-form-label text-md-right"
              >Birthday</label
            >

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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- 
                <section class="profile-section">
                    <div class="header">
                        Change password
                    </div>
                    <form method="POST" action="{{ route('profile.password.update', Auth::user()) }}">
                        @csrf
                        {{ method_field('PATCH') }}

                        <div class="form-group row">
                            <label for="password" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('Password') }}
                            </label>

                            <div class="col-8 pl-0">
                                <input id="password"
                                       type="password"
                                       class="form-control light-weight @error('password') is-invalid @enderror"
                                       name="password"
                                       autocomplete="new-password">

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('Confirm Password') }}
                            </label>

                            <div class="col-8 pl-0">
                                <input
                                        id="password-confirm"
                                        type="password"
                                        class="form-control light-weight"
                                        name="password_confirmation"
                                        autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary float-right">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </section> -->
    </div>
  </div>
</template>

<script>
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
      chosenAvatar: ""
    };
  },
  /**
   * Validate each each input
   * Real time check with database so that we don't get duplicated email and usernames
   * Add storage of avatars
   * Refactore the avatar storage with axios and newer es-syntax
   * Add logic to show cloudinary stored avatars
   * Add logic for change password
   */
  methods: {
    onSaveProfileForm() {
      if (this.profile.userId === null) {
        alert("Something went wrong. Please reload");
        return;
      }
      this.$store.dispatch("profile/editProfile", this.profile);
    },
    onChosenFile() {
      console.log(this.$refs.file.files[0]);
      if (this.$refs.file.files[0] === undefined) {
        return false;
      }
      this.chosenAvatar = this.$refs.file.files[0];
    },
    onAvatarUpload() {
      if (this.chosenAvatar === "") {
        alert("Chose an image");
        return;
      }
      console.log("lets upload " + this.chosenAvatar);

      const uploadedAvatar = this.uploadAvatar(this.chosenAvatar);
    },
    uploadAvatar(file) {
      const cloudName = "letstravel";
      const unsignedUploadPreset = "letstravel_avatars";

      var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      const self = this;
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          var img = new Image(); // HTML5 Constructor
          img.src = response.secure_url;
          img.alt = response.public_id;
          document.getElementById("gallery").appendChild(img);

          self.$store.dispatch("profile/editAvatar", response);
        }
      };

      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "avatar_upload");
      fd.append("file", file);
      xhr.send(fd);
    }
  },
  created() {
    this.profile.userId = this.$store.getters.userId;
  }
};
</script>

<style scope>
.chosen-avatar-box {
  display: grid;
  text-align: center;
}
</style>
