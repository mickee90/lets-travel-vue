<template>
  <div class="container content posts">
    <div class="post-body">
      <form class="col-12">
        <div class="trip-row submit-btn-bar">
          <div class="col p-0">
            <button onclick="history.back()" class="btn btn-secondary">
              Cancel
            </button>
          </div>
          <div class="col pr-0 text-right">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="onSubmit"
            >
              Create post
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
            v-model="title"
            required
            autocomplete="title"
            autofocus
          />
        </div>

        <div class="form-group trip-row">
          <div class="col-md-6">
            <label for="startDate">Start date *</label>

            <input
              id="startDate"
              type="date"
              class="form-control"
              name="startDate"
              v-model="startDate"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              class="form-control"
              name="endDate"
              v-model="endDate"
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
              v-model="content"
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
      </form>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: null,
      content: null,
      startDate: null,
      endDate: null
    };
  },
  methods: {
    onSubmit() {
      const tripId = this.$store.getters.getTrip.id;

      const newItem = {
        title: this.title.trim(),
        content: this.content,
        startDate: this.startDate,
        endDate: this.endDate === null ? this.startDate : this.endDate,
        tripId
      };

      if (newItem.title === "") {
        alert("Title is required");
        return;
      }

      this.$store.dispatch("posts/createPost", newItem);
      this.$router.replace(`/${tripId}/posts`);
    }
  }
};
</script>

<style scoped></style>
