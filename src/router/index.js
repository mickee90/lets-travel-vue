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
import Bucketlist from "../views/bucketlist/Bucketlist.vue";
import Budget from "../views/budget/Budget.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/trips",
    name: "trips",
    component: Trips,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/trips/create",
    name: "trip-create",
    component: TripCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/trips/:tripId/edit",
    name: "trip-edit",
    component: TripEdit,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/trip/:tripId",
    name: "trip",
    component: Trip,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/posts",
    name: "posts",
    component: Posts,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/:postId",
    name: "post",
    component: Post,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/:postId/edit",
    name: "post-edit",
    component: PostEdit,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/post/create",
    name: "post-create",
    component: PostCreate,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/maps",
    name: "maps",
    component: Maps,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/checklist",
    name: "checklist",
    component: Checklist,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/bucket-list",
    name: "bucketlist",
    component: Bucketlist,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
  },
  {
    path: "/:tripId/budget",
    name: "budget",
    component: Budget,
    meta: {
      requiresAuth: true
    },
    beforeEnter(to, from, next) {
      tripMiddleware(to, from, next);
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.idToken == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    }
  }

  next();
});

export default router;
