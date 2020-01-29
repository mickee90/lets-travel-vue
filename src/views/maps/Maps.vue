<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content">
      <div class="post-body">
        <div class="title-input col-12">Maps</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button onclick="App.Maps.toggleSearch()">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
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
              style="border-radius:0;margin-bottom: 20px;line-height:2.1;font-size:1rem;"
            >Search</button>
          </div>

          <ul id="search-result-list" class="row hide" style="padding:0;"></ul>

          <div class="form-group row hide">
            <input
              id="google-maps-title"
              type="text"
              class="form-control col"
              name="google-maps-title"
              placeholder="Title (optional)"
            />
          </div>

          <div class="form-group row hide">
            <textarea
              id="google-maps-content"
              class="form-control col"
              name="google-maps-content"
              placeholder="Description (optional)"
            ></textarea>
          </div>

          <div class="form-group row hide">
            <button
              onclick="App.Maps.store()"
              id="google-maps-submit"
              class="btn btn-primary"
              name="google-maps-submit"
            >Add</button>
          </div>
        </div>

        <div class="row">
          <div id="map" class="col-12" style="height: 100vh;"></div>
          <div id="map-dummy" class="col-12" style="height: 0;"></div>
        </div>

        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";

export default {
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>
