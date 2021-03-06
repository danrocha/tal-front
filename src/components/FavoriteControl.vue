<template>
  <div>
    <button
      @click.stop="toggleFavorite"
      class="text-lg active:outline-none"
      :class="favorited ? 'text-yellow-500' : 'text-gray-500'"
      v-tooltip="{ content: favorited ? 'remove' : 'save', trigger: 'hover' }"
    >
      <font-awesome-icon icon="heart"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CREATE_USER_FAVORITE from '@/graphql/CreateUserFavorite.gql';
import DELETE_USER_FAVORITE_BY_ID from '@/graphql/DeleteUserFavoriteById.gql';
import USER_FAVORITES from '../graphql/UserFavorites.gql';

export default {
  name: 'FavoriteControl',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userFavorites: [],
      favorited: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      locationQueryVariables: state => state.location.locationQueryVariables,
    }),
  },
  apollo: {
    userFavorites: {
      query: USER_FAVORITES,
      skip() {
        return !this.user;
      },
      update(data) {
        this.favorited = data.userFavorites.nodes.find(
          favorite => favorite.locationId === this.location.id
        );
      },
    },
  },
  methods: {
    ...mapActions(['user/addUserFavorite', 'user/removeUserFavoriteById']),
    toggleFavorite() {
      if (!this.user) {
        return this.$router.push({
          name: 'auth',
          params: { message: 'You need to login in to add a favorite.' },
        });
      }
      //const userUid = this.user.uid;
      const favorited = this.favorited;
      const locationId = this.location.id;
      if (favorited) {
        this.$apollo
          .mutate({
            // Query
            mutation: DELETE_USER_FAVORITE_BY_ID,
            // parameters
            variables: {
              input: { id: favorited.id },
            },
            refetchQueries: [
              {
                query: USER_FAVORITES,
              },
            ],
          })
          .then(({ data }) => {
            this['user/removeUserFavoriteById'](data.deleteUserFavoriteById.userFavorite.id);
            this.$store.dispatch('notification/add', {
              type: 'success',
              message: 'Favorite removed! :(',
            });
          })
          .catch(error => {
            this.$store.dispatch('notification/add', {
              type: 'error',
              message: "Oops, removing this favorite didn't work! Maybe try again?",
            });
            console.error(error);
          });
      } else {
        this.$apollo
          .mutate({
            // Query
            mutation: CREATE_USER_FAVORITE,
            // parameters
            variables: {
              input: { userFavorite: { locationId } },
            },
            refetchQueries: [
              {
                query: USER_FAVORITES,
              },
            ],
          })
          .then(({ data }) => {
            this['user/addUserFavorite'](data.createUserFavorite.userFavorite);
            this.$store.dispatch('notification/add', {
              type: 'success',
              message: 'Favorite added! :)',
            });
          })
          .catch(error => {
            this.$store.dispatch('notification/add', {
              type: 'error',
              message: "Oops, saving didn't work! Maybe try again?",
            });
            console.error(error);
          });
      }
    },
  },
};
</script>
