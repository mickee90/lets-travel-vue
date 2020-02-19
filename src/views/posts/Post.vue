<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="row justify-content-center vh-100">
        <div class="col-md-8 vh-100">
          <div class="card vh-100">
            <div class="title-input">{{ trip.title }} - Post</div>

            <div class="button-bar">
              <div class="text-right">
                <router-link
                  :to="{
                    name: 'post-edit',
                    params: {
                      postId: post.id,
                      tripId: this.$store.getters.getTrip.id
                    }
                  }"
                  tag="a"
                  >Edit</router-link
                >
              </div>
            </div>

            <div class="post-body">
              <div class="post-title">{{ post.title }}</div>
              <div class="date_box">
                {{ post.startDate }} to {{ post.endDate }}
              </div>
              <div class="map_marker">
                lat: {{ post.lat }} lng: {{ post.lng }}
              </div>

              <div class="desc_box">{{ post.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: null,
        title: "",
        tripId: null,
        startDate: "",
        endDate: "",
        content: "",
        lat: "",
        lng: ""
      }
    };
  },
  created() {
    const post = this.$store.getters.getPosts.find(
      post => post.id == this.$router.history.current.params.postId
    );
    this.post = { ...this.post, ...post };
    this.trip = this.$store.getters.getTrip;
  }
};
</script>

<style scoped></style>
