<template>
  <div class="banner-image">
    <div class="container content">
      <div class="container content posts">
        <div class="post-body">
          <form @submit.prevent="onSubmit" class="col-12">
            <div class="trip-row submit-btn-bar">
              <div class="col p-0">
                <button onclick="history.back()" class="btn btn-secondary">Cancel</button>
              </div>
              <div class="col pr-0 text-right">
                <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Create trip</button>
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
                @blur="$v.title.$touch()"
              />
            </div>

            <div class="form-group trip-row">
              <div class="col-md-6">
                <label for="startDate">
                  Start date
                  <span class="required">*</span>
                </label>

                <input
                  id="startDate"
                  type="date"
                  class="form-control"
                  name="startDate"
                  v-model="startDate"
                  required
                  @blur="$v.startDate.$touch()"
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
              <label for="description" class="col-12">Description</label>

              <div class="col-md-12">
                <textarea
                  id="description"
                  class="form-control"
                  name="description"
                  rows="10"
                  v-model="description"
                ></textarea>
              </div>
            </div>

            <div class="form-group row justify-content-end">
              <small class="form-text text-muted">
                <span class="required">*</span> = required
              </small>
            </div>

            <!-- <div class="form-group trip-row">
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
            </div>-->

            <!-- <div class="form-group trip-row justify-content-end">
              <button type="submit" class="btn btn-primary" @click.prevent="onSubmit">Create trip</button>
            </div>-->
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
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      imageId: null
    };
  },
  methods: {
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
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        description: this.description,
        imageId: this.imageId
      };

      this.$store.dispatch("storeTrip", newTrip);
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
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped></style>
