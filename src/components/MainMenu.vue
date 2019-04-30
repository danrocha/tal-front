<template>
  <!--Nav-->
  <nav class="p-6 flex items-center">
    <!-- LOGO -->
    <div id="logo">
      <router-link to="/" tag="span" class="cursor-pointer">
        <logo />
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
        <router-link to="/about" class="link font-mono mr-6" active-class="link-active"
          >ABOUT</router-link
        >
      </div>
      <!-- menu right -->
      <apollo-query :query="require('../graphql/CurrentUser.gql')">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="data">
            <a href="#" @click="toggleDropdown" class="inline-block">
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
                <router-link
                  to="/dashboard"
                  class="link"
                  @click="toggleDropdown"
                  active-class="link-active"
                  >Dashboard</router-link
                >
                <apollo-query
                  :query="require('../graphql/UserFavorites.gql')"
                  :skip="user === undefined"
                >
                  <template slot-scope="{ result: { data } }">
                    <div v-if="data">
                      <div
                        v-if="data.userFavorites.nodes.length > 0"
                        class="flex items-center text-gray-600"
                      >
                        <font-awesome-icon icon="heart" class="text-yellow-500"></font-awesome-icon>
                        &times;{{ data.userFavorites.totalCount }}
                      </div>
                    </div>
                  </template>
                </apollo-query>
              </li>
              <!-- <li class="mb-2">Settings</li> -->
              <li>
                <logout>
                  <a slot-scope="{ logout }" href="#" @click="logout" class="link">Logout</a>
                </logout>
              </li>
            </ul>
          </div>
          <div v-else class="flex-none">
            <router-link to="/auth" class="font-mono link">LOGIN</router-link>
          </div>
        </template>
      </apollo-query>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import Logo from '@/components/Logo.vue';
import Logout from '@/components/Logout.vue';

export default {
  name: 'MainMenu',
  mixins: [clickaway],
  components: {
    Logo,
    Logout,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      route: state => state.route,
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
    toggleDropdown() {
      this.dropdown = !this.dropdown;
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
