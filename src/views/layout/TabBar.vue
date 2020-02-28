<template>
  <div class="tab-panel">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 tabs">
          <router-link :to="{name:'posts', params: {'tripId': tripId}}" class="tab">
            <i class="tab-icon fas fa-th-large"></i>
            <div class="tab-name">Posts</div>
          </router-link>
          <router-link :to="{name:'maps', params: {'tripId': tripId}}" class="tab">
            <i class="tab-icon fas fa-map-marked-alt"></i>
            <div class="tab-name">Map</div>
          </router-link>
          <router-link :to="{name:'checklist', params: {'tripId': tripId}}" class="tab">
            <i class="tab-icon fas fa-clipboard-list"></i>
            <div class="tab-name">Checklist</div>
          </router-link>
          <router-link :to="{name:'bucketlist', params: {'tripId': tripId}}" class="tab">
            <i class="tab-icon fas fa-clipboard-check"></i>
            <div class="tab-name">Bucket list</div>
          </router-link>
          <router-link :to="{name:'budget', params: {'tripId': tripId}}" class="tab">
            <i class="tab-icon far fa-credit-card"></i>
            <div class="tab-name">Budget</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tripId: null
    };
  },
  beforeMount() {
    this.tripId = this.$store.getters.getTrip.id;
  }
};
</script>