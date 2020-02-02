import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Trips from "../views/trips/Trips.vue";
import Trip from "../views/trips/Trip.vue";
import TripEdit from "../views/trips/TripEdit.vue";
import TripCreate from "../views/trips/TripCreate.vue";
import Posts from "../views/posts/Posts.vue";
import Post from "../views/posts/Post.vue";
import PostEdit from "../views/posts/PostEdit.vue";
import PostCreate from "../views/posts/PostCreate.vue";
import Maps from "../views/maps/Maps.vue";
import Checklist from "../views/checklists/Checklist.vue";
import BucketList from "../views/bucketlist/BucketList.vue";
import Budget from "../views/budget/Budget.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    meta: {
      defaultLayout: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      defaultLayout: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      defaultLayout: true
    }
  },
  {
    path: "/trips",
    name: "trips",
    component: Trips,
    meta: {
      defaultLayout: true
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
    }
  },
  {
    path: "/trips/create",
    name: "trips-create",
    component: TripCreate,
    meta: {
      defaultLayout: true
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
    }
  },
  {
    path: "/trips/:tripId/edit",
    name: "trips-edit",
    component: TripEdit,
    meta: {
      defaultLayout: true
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/trip/:tripId",
    name: "trip",
    component: Trip,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/posts",
    name: "posts",
    component: Posts,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/:postId",
    name: "post",
    component: Post,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/:postId/edit",
    name: "post-edit",
    component: PostEdit,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/create",
    name: "post-create",
    component: PostCreate,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/maps",
    name: "maps",
    component: Maps,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/checklist",
    name: "checklist",
    component: Checklist,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/bucket-list",
    name: "bucketList",
    component: BucketList,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/budget",
    name: "budget",
    component: Budget,
    meta: {
      defaultLayout: false
    },
    beforeEnter(to, from, next) {
      authMiddleware(to, from, next);
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

function authMiddleware(to, from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/");
  }
}

function tripMiddleware(to, from, next) {
  if (to.params.tripId) {
    store.dispatch("setTrip", to.params.tripId);
    next();
  } else {
    next("/trips");
  }
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
