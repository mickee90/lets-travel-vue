import vue from 'vue';
import Vuex from 'vuex';
import { postStore } from './postStore.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        posts: postStore
    }
})