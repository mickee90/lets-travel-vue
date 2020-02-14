<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="container content posts">
        <div class="post-body">
          <form @submit.prevent="onSubmit" class="col-12">
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
                  Save
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
              <!-- <div
                class="form-group col-md-4 trip-image"
                v-for="tripImage in tripImages"
                :key="tripImage.id"
              >
                <label>
                  <input
                    type="radio"
                    name="trip_image_id"
                    v-model="tripImage.id"
                  />
                  <img :src="getImage(tripImage.path)" :alt="tripImage.title" />
                </label>
              </div> -->
            </div>
          </form>
        </div>
      </div>
      <app-tab-bar></app-tab-bar>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import TabBar from "../layout/TabBar.vue";

export default {
  data() {
    return {
      id: null,
      userId: null,
      title: "",
      description: "",
      imageId: 0,
      startDate: "",
      endDate: "",
      tripImages: []
    };
  },
  methods: {
    getImage(path) {
      return require(path);
    },
    onSubmit() {
      this.$v.$touch();

      if (this.$v.title.$error) {
        alert("The title is required");
        return;
      }

      if (this.$v.startDate.$error) {
        alert("The start date is required");
        return;
      }

      const newTrip = {
        id: this.id,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        imageId: this.imageId
      };

      this.$store.dispatch("editTrip", newTrip);
    }
  },
  validations: {
    title: {
      required
    },
    startDate: {
      required
    }
  },
  created() {
    const trip = this.$store.getters.getTrip;
    const tripImages = this.$store.getters.getTripImages;
    this.id = trip.id;
    this.userId = trip.userId;
    this.title = trip.title;
    this.description = trip.description;
    this.imageId = trip.imageId;
    this.startDate = trip.startDate;
    this.endDate = trip.endDate;
    this.tripImages = tripImages;
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped></style>
