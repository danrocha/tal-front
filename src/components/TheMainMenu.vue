<template>
  <!--Nav-->
  <nav class="p-6 flex items-center">
    <!-- LOGO -->
    <div id="logo">
      <router-link to="/" tag="span" class="cursor-pointer">
        <the-logo />
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
        <a v-if="user" href="#" @click="toggleDropdown" class="inline-block">
          <img v-if="user.photoURL" :src="user.photoURL" class="h-8 w-8 rounded-full" />
          <font-awesome-icon v-else icon="user"></font-awesome-icon>
        </a>
        <ul
          v-if="dropdown"
          v-on-clickaway="toggleDropdown"
          class="text-sm absolute mt-1 right-0 bg-white border border-solid border-gray-400 shadow p-2 mx-4 z-10"
        >
          <li class="mb-2 pb-2 border-b">
            Logged in as
            <br />
            <strong>{{ user.displayName }}</strong>
          </li>
          <li class="mb-2 pb-2 border-b">
            <router-link to="/dashboard" class="link">Dashboard</router-link>

            <div v-if="userFavorites.length > 0" class="flex items-center text-gray-600">
              <font-awesome-icon icon="heart" class="text-yellow-500"></font-awesome-icon>
              &times;{{ userFavorites.length }}
            </div>
          </li>
          <!-- <li class="mb-2">Settings</li> -->
          <li>
            <a href="#" @click="logout" class="link">Logout</a>
          </li>
        </ul>
        <router-link v-if="!user" to="/auth" class="font-mono link">LOGIN</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import { mixin as clickaway } from 'vue-clickaway';
import TheLogo from '@/components/TheLogo.vue';
import USER_FAVORITES from '../graphql/UserFavorites.gql';

export default {
  name: 'TheMainMenu',
  mixins: [clickaway],
  components: {
    TheLogo,
  },
  data() {
    return {
      dropdown: false,
      skipFetchFavorites: true,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      route: state => state.route,
      userFavorites: state => state.user.userFavorites,
    }),
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
    ...mapActions(['user/setUserFavorites']),
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    async logout() {
      await firebase.auth().signOut();
      this.dropdown = false;
    },
    fetchUserFavorites() {
      this.$apollo
        .query({
          query: USER_FAVORITES,
        })
        .then(({ data }) => {
          this['user/setUserFavorites'](data.userFavorites.nodes);
        })
        .catch(e => {
          console.error(e);
        });
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.fetchUserFavorites();
      }
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
