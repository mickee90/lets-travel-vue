<template>
  <div class="container content posts">
    <div class="post-body">
      <div class="title-input col-12">{{ trip.title }} - Posts</div>

      <div class="button-bar col-12">
        <div class="text-right">
          <router-link
            :to="{
              name: 'post-create',
              params: { tripId: this.$store.getters.getTrip.id }
            }"
            tag="a"
            >Add new post</router-link
          >
        </div>
      </div>

      <template v-if="posts.length === 0">
        <spinner />
      </template>

      <template v-else>
        <router-link
          :to="{ name: 'post', params: { postId: post.id } }"
          v-for="post in posts"
          :key="post.id"
          tag="a"
        >
          <div class="col-12 post budget-item">
            <div class="col-12 pl-2 pr-0 row">
              <div class="budget-item-title col-12">{{ post.title }}</div>
              <div class="budget-item-date col-12">{{ post.startDate }}</div>
            </div>
          </div>
        </router-link>
      </template>

      <tab-bar></tab-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      ...mapState("posts", ["posts"]),
      trip: {}
    };
  },
  computed: {
    ...mapGetters("posts", ["getPosts"])
  },
  created() {
    this.$store
      .dispatch("posts/fetchPosts", this.$store.getters.getTrip.id)
      .then(res => {
        this.posts = res;
      });
    this.trip = this.$store.getters.getTrip;
  }
};
</script>

<style scoped></style>
