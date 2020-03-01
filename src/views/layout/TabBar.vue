<template>
  <div class="tab-panel">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 tabs">
          <router-link :to="{ name: 'trips' }" class="tab">
            <i class="tab-icon fas fa-plane-departure"></i>
            <div class="tab-name">Trips</div>
          </router-link>
          <router-link
            :to="{ name: 'posts', params: { tripId: tripId } }"
            class="tab"
          >
            <i class="tab-icon fas fa-th-large"></i>
            <div class="tab-name">Posts</div>
          </router-link>
          <router-link
            :to="{ name: 'maps', params: { tripId: tripId } }"
            class="tab"
          >
            <i class="tab-icon fas fa-map-marked-alt"></i>
            <div class="tab-name">Map</div>
          </router-link>
          <router-link
            :to="{ name: 'checklist', params: { tripId: tripId } }"
            class="tab"
          >
            <i class="tab-icon fas fa-clipboard-list"></i>
            <div class="tab-name">Checklist</div>
          </router-link>
          <router-link
            :to="{ name: 'bucketlist', params: { tripId: tripId } }"
            class="tab"
          >
            <i class="tab-icon fas fa-clipboard-check"></i>
            <div class="tab-name">Bucket list</div>
          </router-link>
          <router-link
            :to="{ name: 'budget', params: { tripId: tripId } }"
            class="tab"
          >
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

<style scoped>
.tab-panel {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}

.tab-panel .tabs {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 0;
}

.tab-panel .tabs .tab {
  text-align: center;
  height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #212529;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #f8fafc;
}

.tab-panel .tabs .tab .tab-icon {
  font-size: 30px;
}

.tab-panel .tabs .tab .tab-name {
  line-height: 30px;
}
</style>
