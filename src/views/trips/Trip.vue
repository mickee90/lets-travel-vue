<template>
  <div class="container content">
    <div class="row justify-content-center vh-100 no-gutters">
      <div class="col-md-8 vh-100">
        <div class="card vh-100">
          <div class="title-input">{{ trip.title }}</div>

          <div class="button-bar">
            <div class="text-right">
              <router-link
                :to="{
                  name: 'trip-edit',
                  params: { tripId: this.$store.getters.getTrip.id }
                }"
              >Edit</router-link>
              <button @click.prevent="onDelete">Delete</button>
            </div>
          </div>

          <div class="card-body">
            <div class="date_box">
              Start date: {{ trip.startDate }}
              <span v-if="trip.endDate !== ''">to {{ trip.endDate }}</span>
            </div>

            <div class="desc_box pre-formatted" v-text="trip.description"></div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trip: {}
    };
  },
  methods: {
    onDelete() {
      if (confirm("Are you sure you want to delete the trip?")) {
        this.$store.dispatch("deleteTrip", this.trip.id);
      }
    }
  },
  created() {
    this.trip = this.$store.getters.getTrip;
  }
};
</script>

<style scoped></style>
