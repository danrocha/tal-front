<template>
  <!--Nav-->
  <nav class="p-6 flex items-center">
    <!-- LOGO -->
    <div id="logo">
      <router-link to="/" tag="span" class="cursor-pointer">
        <the-logo/>
      </router-link>
    </div>
    <!-- menu left -->
    <div id="menu" class="flex items-center w-auto h-full justify-end">
      <div>
        <base-button
          base-type="primary"
          class="flex flex-no-wrap mr-6"
          aria-label="Add Office"
          @click="$router.push({ path: '/add' })"
        >
          <strong>+</strong>&nbsp;ADD
          <span class="hidden md:block">&nbsp;OFFICE</span>
        </base-button>
      </div>
      <div class="flex-none">
        <router-link to="/about" class="link font-mono mr-6">ABOUT</router-link>
      </div>
      <!-- menu right -->
      <div>
        <a v-if="user.user" href="#" @click="toggleDropdown" class="inline-block">
          <img v-if="user.user.photoURL" :src="user.user.photoURL" class="h-8 w-8 rounded-full">
          <i v-else class="fas fa-user"></i>
        </a>
        <ul
          v-if="dropdown"
          v-on-clickaway="toggleDropdown"
          class="text-sm absolute mt-1 right-0 bg-white border border-solid border-gray-400 shadow p-2 mx-4 z-10"
        >
          <li class="mb-2 pb-2 border-b">
            Logged in as
            <br>
            <strong>{{ user.user.displayName }}</strong>
          </li>
          <!-- <li class="mb-2">Settings</li> -->
          <li>
            <a href="#" @click="logout" class="link">Logout</a>
          </li>
        </ul>
        <router-link v-if="!user.user" to="/auth" class="font-mono link">LOGIN</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import { mixin as clickaway } from 'vue-clickaway';
import TheLogo from '@/components/TheLogo.vue';

export default {
  name: 'TheMainMenu',
  mixins: [clickaway],
  components: {
    TheLogo,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    ...mapState(['user', ['user'], 'route']),
    home() {
      return this.$route.name === 'home';
    },
    login() {
      return this.$route.name === 'auth';
    },
    about() {
      return this.$route.name === 'about';
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    async logout() {
      await firebase.auth().signOut();
      this.dropdown = false;
    },
  },
};
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  grid-template-areas:
    'logo menu'
    'search-box search-box';
}

#logo {
  grid-area: logo;
}
#search-box {
  grid-area: search-box;
}

#menu {
  grid-area: menu;
}
.router-link-exact-active {
  @apply border-yellow-500;
}
@screen md {
  nav {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas: 'logo search-box menu';
  }
}
</style>
