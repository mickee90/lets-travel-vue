<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content">
      <div class="row justify-content-center vh-100">
        <div class="col-md-8 vh-100">
          <div class="trip-body">
            <form @submit.prevent="onSubmit">
              <div class="form-group row">
                <input
                  id="title"
                  type="text"
                  class="form-control title-input"
                  name="title"
                  placeholder="Title *"
                  required
                  autocomplete="title"
                  autofocus
                  v-model="title"
                />
              </div>

              <div class="form-group trip-row">
                <div class="col-md-6">
                  <label for="start_date">
                    Start date <span class="required">*</span>
                  </label>

                  <input
                    id="start_date"
                    type="date"
                    class="form-control"
                    name="start_date"
                    v-model="startDate"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="end_date">
                    End Date
                  </label>
                  <input
                    id="end_date"
                    type="date"
                    class="form-control"
                    name="end_date"
                    v-model="endDate"
                  />
                </div>
              </div>

              <div class="form-group trip-row">
                <label for="description" class="col-12">
                  Description
                </label>

                <div class="col-md-12">
                  <textarea
                    id="description"
                    class="form-control"
                    name="description"
                    rows="10"
                    v-model="description"
                  >
                  </textarea>
                </div>
              </div>

              <div class="form-group row justify-content-end">
                <small class="form-text text-muted"
                  ><span class="required">*</span> = required</small
                >
              </div>

              <div class="form-group trip-row">
                <label for="trip_image_id" class="col-md-12">
                  Background image
                </label>
              </div>

              <div class="form-group trip-row">
                <div
                  class="form-group col-md-4 trip-image"
                  v-for="tripImage in TripImages"
                  :key="tripImage.id"
                >
                  <label>
                    <input
                      type="radio"
                      name="trip_image_id"
                      v-model="tripImage.id"
                    />
                    <img :src="tripImage.path" :alt="tripImage.title" />
                  </label>
                </div>
              </div>

              <div class="form-group trip-row justify-content-end">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="onSubmit"
                >
                  Create trip
                </button>
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
  data() {
    return {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      imageId: null
    };
  },
  methods: {
    onSubmit() {
      console.log(
        this.title,
        this.startDate,
        this.endDate,
        this.description,
        this.imageId
      );
    }
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped></style>
