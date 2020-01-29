<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="post-body">
            <form method="POST" action="#">
              <div class="trip-row submit-btn-bar">
                <div class="col p-0">
                  <button onclick="history.back()" class="btn btn-secondary">Cancel</button>
                </div>
                <div class="col pr-0 text-right">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </div>

              <div class="form-group row">
                <input
                  id="title"
                  type="text"
                  class="form-control title-input"
                  name="title"
                  placeholder="Title *"
                  value="Post title #1"
                  autocomplete="title"
                  autofocus
                />
                @error('title')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>

              <div class="form-group trip-row">
                <div class="col-md-6">
                  <label for="start_date">{{ __('Start date') }} *</label>

                  <input
                    id="start_date"
                    type="date"
                    class="form-control @error('start_date') is-invalid @enderror"
                    name="start_date"
                    value="{{ $post->start_date ? \Carbon\Carbon::parse($post->start_date)->toDateString() : '' }}"
                    required
                  />
                  @error('start_date')
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                  </span>
                  @enderror
                </div>
                <div class="col-md-6">
                  <label for="end_date">{{ __('End Date') }}</label>
                  <input
                    id="end_date"
                    type="date"
                    class="form-control @error('end_date') is-invalid @enderror"
                    name="end_date"
                    value="{{ $post->end_date ? \Carbon\Carbon::parse($post->end_date)->toDateString() : '' }}"
                  />
                  @error('end_date')
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                  </span>
                  @enderror
                </div>
              </div>

              <div class="form-group trip-row">
                <label for="content" class="col-12">{{ __('Content') }}</label>

                <div class="col-md-12">
                  <textarea
                    id="content"
                    class="form-control @error('content') is-invalid @enderror"
                    name="content"
                    rows="10"
                  >
                                        {{ $post->content }}
                                    </textarea>
                  @error('content')
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                  </span>
                  @enderror
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
                  >{{ __('Search') }}</button>
                </div>

                <ul id="search-result-list" class="form-group row hide" style="padding:0;"></ul>
                <div id="map-dummy" class="col-12" style="height: 0;"></div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <app-tab-bar></app-tab-bar>
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