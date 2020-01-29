<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="row justify-content-center vh-100">
        <div class="col-md-8 vh-100">
          <div class="card vh-100">
            <div class="title-input">TRIP TITLE</div>

            <div class="button-bar">
              <div class="text-right">
                <router-link :to="{name: 'post-edit', params: {postId: post.id }}" tag="a">Edit</router-link>
              </div>
            </div>

            <div class="post-body">
              <div class="post-title">{{ post.title }}</div>
              <div class="date_box">{{ post.start_date }} to {{ post.end_date }}</div>
              <div class="map_marker">
                lat: 20.101221
                lng: -17.2912
              </div>

              <div class="desc_box">{{ post.content }}</div>
            </div>
          </div>
        </div>
      </div>

      <app-tab-bar></app-tab-bar>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";
import { posts } from "../../mock-data/posts";

export default {
  data() {
    return {
      post: {}
    };
  },
  created() {
    const post = posts.filter(
      post => post.id == this.$router.history.current.params.postId
    );
    this.post = post[0];
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>