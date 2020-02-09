<template>
  <div class="container trips">
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <router-link :to="{ name: 'trip-create' }" tag="a">
            <i class="fas fa-plus-circle add-trip-icon"></i>
            <div class="trip-footer">Add new trip</div>
          </router-link>
        </div>
      </div>
      <div class="col-md-3" v-if="trips == null">
        <spinner />
      </div>
      <div class="col-md-3" v-else>
        <router-link
          :to="{ name: 'trip', params: { tripId: trip.id } }"
          v-for="trip in trips"
          :key="trip.id"
          tag="a"
        >
          <div class="card">
            <!-- @todo make dynamic! -->
            <img
              src="@/assets/imgs/trips/soccer.jpg"
              :alt="trip.image.title"
              class="card-img"
            />
            <div class="trip-footer">{{ trip.title }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";
import Spinner from "../../components/UI/Spinner";

export default {
  data() {
    return {
      trip_images: [],
      trips: null
    };
  },
  created() {
    this.fetchTrips().then(res => {
      this.trips = this.$store.getters.getTrips.reverse();
    });
  },
  methods: {
    imagePath(id) {
      const image = this.trip_images.find(image => image.id === id);
      return image.path;
    },
    async fetchTrips() {
      await this.$store.dispatch("fetchTrips");
    }
  },
  components: {
    appTabBar: TabBar,
    spinner: Spinner
  }
};
</script>

<style scoped></style>
