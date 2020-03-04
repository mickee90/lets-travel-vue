<template>
  <div class="container content posts">
    <div class="post-body">
      <div class="col-12">
        <div class="trip-row submit-btn-bar">
          <div class="col p-0">
            <button @click.prevent="$router.go(-1)" class="btn btn-secondary">
              Cancel
            </button>
          </div>
          <div class="col pr-0 text-right">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="onSubmit"
            >
              Update
            </button>
          </div>
        </div>

        <div class="form-group row">
          <input
            id="title"
            type="text"
            class="form-control title-input"
            name="title"
            placeholder="Title *"
            v-model="post.title"
            autocomplete="title"
            autofocus
          />
        </div>

        <div class="form-group trip-row">
          <div class="col-md-6">
            <label for="start_date">Start date *</label>

            <input
              id="start_date"
              type="date"
              class="form-control"
              name="start_date"
              v-model="post.startDate"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="end_date">End Date</label>
            <input
              id="end_date"
              type="date"
              class="form-control"
              name="end_date"
              v-model="post.endDate"
            />
          </div>
        </div>

        <div class="form-group trip-row">
          <label for="content" class="col-12">Content</label>

          <div class="col-md-12">
            <textarea
              id="content"
              class="form-control"
              name="content"
              rows="10"
              v-model="post.content"
            ></textarea>
          </div>
        </div>

        <div class="form-group row">
          <small class="col form-text text-muted mt-0">* = required</small>
          <button
            onclick="App.Maps.toggleSearch();return false;"
            class="col pr-0"
            style="text-align: right;"
          >
            <i class="fas fa-plus-circle"></i> Add location
          </button>
        </div>

        <div class="map-search-box col-12" style="display:none">
          <div class="form-group row">
            <input
              id="google-maps-location"
              type="text"
              class="form-control title-input col"
              name="google-maps-location"
              placeholder="Search your location"
            />
            <button
              onclick="searchMarker();return false;"
              class="btn btn-primary"
              style="border-radius:0;"
            >
              Search
            </button>
          </div>

          <ul
            id="search-result-list"
            class="form-group row hide"
            style="padding:0;"
          ></ul>
          <div id="map-dummy" class="col-12" style="height: 0;"></div>
        </div>
      </div>
      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      ...mapState("posts", ["post"])
    };
  },
  /* computed: {
  }, */
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      const editedPost = {
        ...this.post,
        lat: this.post.lat ?? "",
        lng: this.post.lng ?? ""
      };

      const update = await this.$store.dispatch("posts/editPost", editedPost);
    }
  },
  created() {
    this.$store.dispatch(
      "posts/fetchPost",
      this.$router.history.current.params.postId
    );
    this.post = { ...this.$store.getters["posts/getPost"] };
    this.trip = this.$store.getters.getTrip;
  }
};
</script>

<style scoped></style>
