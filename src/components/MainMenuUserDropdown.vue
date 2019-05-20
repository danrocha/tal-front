<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <div v-if="open" @click="open = false" class="fixed inset-0"></div>
      <button @click="open = !open" class="relative flex items-center focus:outline-none">
        <img v-if="user.photoURL" :src="user.photoURL" class="h-8 w-8 rounded-full" />
        <font-awesome-icon v-else icon="user"></font-awesome-icon>
        <!-- <span v-if="user.displayName" class="ml-2 font-medium">{{ user.displayName }}</span> -->
        <svg
          class="ml-1 h-5 w-5 fill-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
          ></path>
        </svg>
      </button>
      <transition
        enter-active-class="transition-all transition-fastest ease-out-quad"
        leave-active-class="transition-all transition-faster ease-in-quad"
        enter-class="opacity-0 scale-70"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-70"
      >
        <div
          v-if="open"
          class="origin-top-right absolute right-0 mt-2 w-64 bg-white rounded-lg border shadow-md py-2"
        >
          <ul class="text-sm">
            <li class="block px-4 pt-2 pb-4 border-b">
              Logged in as
              <br />
              <strong>{{ user.displayName }}</strong>
            </li>
            <li>
              <router-link
                to="/dashboard"
                class="block px-4 py-2 hover:bg-gray-300 flex justify-between"
                tag="a"
                @click.native="open = false"
                active-class="link-active"
              >
                Dashboard
                <apollo-query
                  :query="require('../graphql/UserFavorites.gql')"
                  :skip="user === undefined"
                  @error="logout"
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
              </router-link>
            </li>
            <!-- <li class="mb-2">Settings</li> -->
            <li>
              <logout ref="logout">
                <a
                  slot-scope="{ logout }"
                  href="#"
                  @click="logout"
                  class="block px-4 py-2 hover:bg-gray-300"
                  >Logout</a
                >
              </logout>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue';

export default {
  components: { Logout },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    logout() {
      this.$refs.logout.logout();
    },
  },
};
</script>
<style scoped>
.origin-top-right {
  transform-origin: top right;
}
.transition-all {
  transition-property: all;
}
.transition-fastest {
  transition-duration: 50ms;
}
.transition-faster {
  transition-duration: 100ms;
}
.transition-fast {
  transition-duration: 150ms;
}
.transition-medium {
  transition-duration: 200ms;
}
.ease-out-quad {
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.ease-in-quad {
  transition-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
}
.scale-70 {
  transform: scale(0.7);
}
.scale-100 {
  transform: scale(1);
}
</style>
