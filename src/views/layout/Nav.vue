<template>
<div>
    <header class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container">
        <a class="navbar-brand" href="#">
            Lets travel
        </a>

        <button href="#" id="menu-btn" @click="showMenu = !showMenu">
            USERNAME <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</header>
<nav id="nav-container" :class="{show: showMenu}">
    <div id="backdrop" @click="showMenu = !showMenu">

    </div>
    <div class="nav">
        <ul class="navbar-nav ml-auto">

          <!--  @guest -->
                <li><a class="dropdown-item" href="#">Login</a></li>
               <!--  @if (Route::has('register')) -->
                    <li><a class="dropdown-item" href="#">Register</a></li>
               <!--  @endif -->
           <!--  @endguest -->
                <li><a class="dropdown-item" href="#">About us </a></li>
                <li><a class="dropdown-item" href="#">Contact us </a></li>
          <!--    @if(Auth::check())
                    <li><a class="dropdown-item" href="{{ route('profile.edit', Auth::user()) }}">{{ __('Profile') }} </a></li>
                    <li><a class="dropdown-item" href="{{ route('logout') }}"
                   onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                    {{ __('Logout') }}
                </a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                      style="display: none;">
                    @csrf
                </form></li>
            @endif -->
        </ul>
    </div>
</nav>
</div>
</template>

<script>
export default {
  data () {
    return {
      showMenu: false
    }
  }
}
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
