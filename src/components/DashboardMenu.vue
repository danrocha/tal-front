<template>
  <div>
    <img
      v-if="user.photoURL"
      :src="user.photoURL"
      class="rounded-full border-solid mb-8"
      alt="Your user photo"
      width="100"
      height="100"
    />
    <ul class="text-right">
      <li class="mb-1 text-base font-mono">
        <router-link
          class="link uppercase tracking-wider"
          active-class="link-active"
          to="/dashboard/favorites"
          tag="a"
          >Favorites</router-link
        >
      </li>
      <li class="uppercase tracking-wider mb-1 text-base font-mono">
        <router-link
          class="link uppercase tracking-wider"
          active-class="link-active"
          to="/dashboard/settings"
          tag="a"
          >Account Settings</router-link
        >
      </li>
      <li class="mb-1">
        <logout>
          <button
            slot-scope="{ logout }"
            class="link uppercase tracking-wider text-base font-mono"
            @click="logout"
          >
            Logout
          </button>
        </logout>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Logout from '../components/Logout.vue';

export default {
  name: 'DashboardMenu',
  components: {
    Logout,
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
