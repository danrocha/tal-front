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
      <apollo-query :query="require('../graphql/CurrentUser.gql')" @error="logout">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="data && user" class="flex items-center">
            <div v-if="data.currentUser.isAdmin" class="flex-none">
              <router-link to="/admin" class="link font-mono mr-6" active-class="link-active"
                >ADMIN</router-link
              >
            </div>
            <main-menu-user-dropdown :user="user" />
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
import { mapState, mapActions } from 'vuex';
import { mixin as clickaway } from 'vue-clickaway';
import MainMenuUserDropdown from '@/components/MainMenuUserDropdown.vue';
import Logo from '@/components/Logo.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'MainMenu',
  mixins: [clickaway],
  components: {
    Logo,
    MainMenuUserDropdown,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  methods: {
    ...mapActions(['user/setUser']),
    async logout() {
      if (this.user) {
        await firebase.auth().signOut();
        //this['user/setUser'](null);
      }
    },
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
