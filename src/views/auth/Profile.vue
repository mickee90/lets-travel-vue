<template>
  <div class="container content posts">
    <div class="post-body" style="margin-top:70px">
      <div id="avatar-form">
        <label for="avatarFileInput" class="w-100">
          <div class="avatar-box">
            <div
              class="avatar"
              v-if="user.avatar !== undefined || user.avatar !== ''"
            >
              <img
                id="avatar"
                :src="user.avatar"
                :alt="user.name"
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
        <div class="progress-bar" id="progress-bar">
          <div class="progress" id="progress"></div>
        </div>
        <div id="gallery" />
      </div>

      <!--  <section class="profile-section">
                <form method="POST" action="{{ route('profile.update', Auth::user()) }}">
                    @csrf
                    {{ method_field('PATCH') }}
                    <div class="profile-information">
                        <div class="form-group row">
                            <label for="first_name" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('First name') }}<span class="required">*</span>
                            </label>

                            <div class="col-8 pl-0">
                                <input
                                        id="first_name"
                                        type="text"
                                        class="form-control light-weight @error('first_name') is-invalid @enderror"
                                        name="first_name"
                                        value="{{ $user->first_name }}"
                                        required
                                        autocomplete="first_name">

                                @error('first_name')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="last_name" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('Last name') }} <span class="required">*</span>
                            </label>

                            <div class="col-8 pl-0">
                                <input id="last_name"
                                       type="text"
                                       class="form-control light-weight @error('last_name') is-invalid @enderror"
                                       name="last_name"
                                       value="{{ $user->last_name }}"
                                       required
                                       autocomplete="last_name">

                                @error('last_name')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="username" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('Username') }} <span class="required">*</span>
                            </label>

                            <div class="col-8 pl-0">
                                <input
                                        id="username"
                                        type="text"
                                        class="form-control light-weight @error('username') is-invalid @enderror"
                                        name="username"
                                        value="{{ $user->username }}"
                                        required
                                        autocomplete="username">

                                @error('username')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-4 pr-0 col-form-label text-md-right">
                                {{ __('E-Mail Address') }} <span class="required">*</span>
                            </label>

                            <div class="col-8 pl-0">
                                <input
                                        id="email"
                                        type="email"
                                        class="form-control light-weight @error('email') is-invalid @enderror"
                                        name="email"
                                        value="{{ $user->email }}"
                                        required
                                        autocomplete="email">

                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="address"
                                   class="col-4 pr-0 col-form-label text-md-right">{{ __('Address') }}</label>

                            <div class="col-8 pl-0">
                                <input id="address"
                                       type="text"
                                       class="form-control light-weight @error('address') is-invalid @enderror"
                                       name="address"
                                       value="{{ $user->address }}"
                                       autocomplete="address">

                                @error('address')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="city" class="col-4 pr-0 col-form-label text-md-right">{{ __('City') }}</label>

                            <div class="col-8 pl-0">
                                <input
                                        id="city"
                                        type="text"
                                        class="form-control light-weight @error('city') is-invalid @enderror"
                                        name="city"
                                        value="{{ $user->city }}"
                                        autocomplete="city">

                                @error('city')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="zipcode"
                                   class="col-4 pr-0 col-form-label text-md-right">{{ __('Zip code') }}</label>

                            <div class="col-8 pl-0">
                                <input
                                        id="zipcode"
                                        type="text"
                                        class="form-control light-weight @error('zipcode') is-invalid @enderror"
                                        name="zipcode"
                                        value="{{ $user->zipcode }}"
                                        autocomplete="zipcode">

                                @error('zipcode')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="country"
                                   class="col-4 pr-0 col-form-label text-md-right">{{ __('Country') }}</label>

                            <div class="col-8 pl-0">
                                <div class="input-group mb-3">
                                    <select
                                            id="country"
                                            class="custom-select @error('country') is-invalid @enderror"
                                            name="country_id">

                                        <option value="0" selected>Choose...</option>
                                        @foreach($countries as $country)
                                            <option
                                                    value="{{ $country->id }}"
                                                    {{ $user->country_id == $country->id ? 'selected' : '' }}>
                                                {{ $country->name }}
                                            </option>
                                        @endforeach
                                    </select>

                                    @error('country')
                                    <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="birthday"
                                   class="col-4 pr-0 col-form-label text-md-right">{{ __('Birthday') }}</label>

                            <div class="col-8 pl-0">
                                <input id="birthday"
                                       type="date"
                                       class="form-control light-weight @error('birthday') is-invalid @enderror"
                                       name="birthday"
                                       value="{{ \Carbon\Carbon::rawParse($user->birthday)->toDateString() }}">

                                @error('birthday')
                                <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                                @enderror
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary float-right">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section> -->
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
      user: {},
      chosenAvatar: ""
    };
  },
  methods: {
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

      // *********** Upload file to Cloudinary ******************** //
      var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      // Reset the upload progress bar
      document.getElementById("progress").style.width = 0;

      // Update progress (can be used to show progress indicator)
      xhr.upload.addEventListener("progress", function(e) {
        var progress = Math.round((e.loaded * 100.0) / e.total);
        document.getElementById("progress").style.width = progress + "%";

        console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
      });

      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
          // File uploaded successfully
          var response = JSON.parse(xhr.responseText);
          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          /* var url = response.secure_url; */
          // Create a thumbnail of the uploaded image, with 150px width
          /*  var tokens = url.split("/");
          tokens.splice(-2, 0, "w_150,c_scale"); */
          var img = new Image(); // HTML5 Constructor
          img.src = response.secure_url;
          img.alt = response.public_id;
          document.getElementById("gallery").appendChild(img);
        }
      };

      fd.append("upload_preset", unsignedUploadPreset);
      fd.append("tags", "avatar_upload"); // Optional - add tag for image admin in Cloudinary
      fd.append("file", file);
      xhr.send(fd);
    }
  }
};
</script>

<style scope>
.chosen-avatar-box {
  display: grid;
  text-align: center;
}
</style>
