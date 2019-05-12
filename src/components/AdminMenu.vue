<template>
  <div>
    <div id="user-info" class="mb-8">
      <apollo-query :query="require('../graphql/CurrentUser.gql')">
        <template slot-scope="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Checking Admin Status...</div>
          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>
          <!-- Result -->
          <div v-else-if="data && user" class="text-sm text-center">
            <img
              :src="user.photoURL"
              class="rounded-full border-solid mb-2"
              alt="Your user photo"
              width="100"
              height="100"
            >
            <p v-if="data.currentUser.isAdmin" class="font-bold text-center">Admin</p>
          </div>
          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </apollo-query>
    </div>
    <ul class="text-right mb-8">
      <li class="uppercase tracking-wider mb-1 text-base font-mono">
        <router-link to="/admin/offices" tag="a" class="link" active-class="link-active">Offices</router-link>
      </li>
      <li class="uppercase tracking-wider mb-1 text-base font-mono">
        <router-link to="/admin/cities" tag="a" class="link" active-class="link-active">Cities</router-link>
      </li>
      <li class="uppercase tracking-wider mb-1 text-base font-mono">
        <a href="#" class="link">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminMenu',
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
};
</script>
