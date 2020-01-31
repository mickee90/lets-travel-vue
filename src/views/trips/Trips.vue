<template>
  <div class="container trips">
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <a href="#">
            <i class="fas fa-plus-circle add-trip-icon"></i>
            <div class="trip-footer">Add new trip</div>
          </a>
        </div>
      </div>
      <div class="col-md-3">
        <router-link
          :to="{name: 'trip', params:{tripId: trip.id}}"
          v-for="trip in trips"
          :key="trip.id"
          tag="a"
        >
          <div class="card">
            <!-- @todo make dynamic! -->
            <img src="@/assets/imgs/trips/soccer.jpg" :alt="trip.image.title" class="card-img" />
            <div class="trip-footer">{{ trip.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";
import { trips } from "../../mock-data/trips";
import { trip_images } from "../../mock-data/trip_images";

export default {
  data() {
    return {
      trip_images: []
    };
  },
  computed: {
    posts() {
      return this.$store.getters.getTrips;
    }
  },
  beforeCreate() {
    this.trips = trips.map(trip => {
      const image = trip_images.find(image => image.id === trip.trip_image_id);
      trip.image = image;

      return trip;
    });
    this.$store.dispatch("storeTrips", trips);
  },
  methods: {
    imagePath(id) {
      const image = this.trip_images.find(image => image.id === id);
      return image.path;
    }
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>
