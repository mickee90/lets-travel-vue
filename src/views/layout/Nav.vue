<template>
  <div>
    <header class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="/trips">Lets travel</a>

        <button href="#" id="menu-btn" @click="showMenu = !showMenu">
          <span v-if="isAuth">
            {{ this.$store.getters.user.username }}
          </span>
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </header>
    <nav id="nav-container" :class="{ show: showMenu }">
      <div id="backdrop" @click="showMenu = !showMenu"></div>
      <div class="nav">
        <ul class="navbar-nav ml-auto">
          <li v-if="!isAuth">
            <router-link tag="a" class="dropdown-item menu-item" to="/"
              >Login</router-link
            >
          </li>
          <li v-if="!isAuth">
            <router-link
              class="dropdown-item menu-item"
              :to="{ name: 'register' }"
              tag="a"
              @click="showMenu = false"
              >Register</router-link
            >
          </li>
          <li>
            <router-link tag="a" class="dropdown-item menu-item" to="#"
              >About us</router-link
            >
          </li>
          <li>
            <router-link tag="a" class="dropdown-item menu-item" to="#"
              >Contact us</router-link
            >
          </li>
          <li v-if="isAuth">
            <router-link tag="a" class="dropdown-item menu-item" to="#"
              >Profile
            </router-link>
          </li>
          <li v-if="isAuth">
            <a class="dropdown-item menu-item" @click="onLogout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  mounted() {
    document.querySelectorAll(".menu-item").forEach(menuItem => {
      menuItem.addEventListener("click", () => (this.showMenu = false));
    });
  }
};
</script>

<style scoped>
#menu-btn {
  background: transparent;
  border: 0;
  outline: 0;
}
#nav-container {
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 999999;
  margin-top: 1px;
  display: flex;
  transform: translateX(100%);
  transition: 300ms ease-in all;
}

#nav-container.show {
  transform: translateX(0);
  transition: 300ms ease-out all;
}

#nav-container .nav {
  flex: 0 0 80%;
  background: #fff;
  border-left: 1px solid #eee;
}

#backdrop {
  flex: 0 0 20%;
}

.navbar-nav {
  width: 50%;
}

.navbar-nav li {
  font-size: 1.5rem;
  line-height: 2rem;
}
</style>
