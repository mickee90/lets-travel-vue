import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Trips from '../views/trips/Trips.vue'
import Trip from '../views/trips/Trip.vue'
import Posts from '../views/posts/Posts.vue'
import Post from '../views/posts/Post.vue'
import PostEdit from '../views/posts/PostEdit.vue'
import PostCreate from '../views/posts/PostCreate.vue'
import Maps from '../views/maps/Maps.vue'
import Checklist from '../views/checklists/Checklist.vue'
import BucketList from '../views/bucketlist/BucketList.vue'
import Budget from '../views/budget/Budget.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/trips',
    name: 'trips',
    component: Trips
  },
  {
    path: '/trip',
    name: 'trip',
    component: Trip
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/post/edit',
    name: 'post-edit',
    component: PostEdit
  },
  {
    path: '/post/create',
    name: 'post-create',
    component: PostCreate
  },
  {
    path: '/maps',
    name: 'maps',
    component: Maps
  },
  {
    path: '/checklist',
    name: 'checklist',
    component: Checklist
  },
  {
    path: '/bucket-list',
    name: 'bucketList',
    component: BucketList
  },
  {
    path: '/budget',
    name: 'budget',
    component: Budget
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
