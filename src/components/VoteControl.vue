<template>
  <div class="flex flex-col items-center justify-center">
    <div>
      <a
        class="mt-0 pt-0 cursor-pointer text-lg"
        :class="voted ? 'text-yellow-500' : 'text-gray-900'"
        @click.stop="vote"
        v-tooltip="{ content: voted ? 'unvote' : 'vote', trigger: 'hover' }"
      >
        <font-awesome-icon icon="caret-up"></font-awesome-icon>
      </a>
    </div>
    <div>
      <p class="text-xs mb-0 text-gray-700">{{ location.office.officeVotes.totalCount }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VOTE_MUTATION from '@/graphql/VoteMutation.gql';
import LOCATIONS from '@/graphql/Locations.gql';

export default {
  name: 'VoteControl',
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      locationQueryVariables: state => state.location.locationQueryVariables,
    }),
    voted() {
      if (this.user && this.location.office.officeVotes.totalCount) {
        return this.location.office.officeVotes.nodes.some(vote => {
          return vote.userUid == this.user.uid;
        });
      }
      return false;
    },
  },
  methods: {
    vote() {
      if (!this.user) {
        return this.$router.push({
          name: 'auth',
          params: { message: 'You need to login in to cast a vote.' },
        });
      }
      const userUid = this.user.uid;
      const officeId = this.location.office.id;
      const alreadyVoted = this.voted;
      this.$apollo
        .mutate({
          // Query
          mutation: VOTE_MUTATION,
          // parameters
          variables: {
            userUid,
            officeId,
          },
          // Update the cache with the result
          // The query will be updated with the optimistic response
          // and then with the real result of the mutation
          /* eslint-disable-next-line */
          update: (store, { data: { VOTE_MUTATION } }) => {
            const data = store.readQuery({
              query: LOCATIONS,
              variables: this.locationQueryVariables,
            });
            this.scan(officeId, office => {
              if (alreadyVoted) {
                office.officeVotes.totalCount--;
                office.officeVotes.nodes = office.officeVotes.nodes.filter(vote => {
                  return vote.userUid !== userUid;
                });
              } else {
                office.officeVotes.totalCount++;
                // add new vote
                office.officeVotes.nodes.push({
                  __typename: 'OfficeVote',
                  id: -1,
                  userUid,
                  officeId,
                });
              }
            })(data);
            store.writeQuery({
              query: LOCATIONS,
              variables: this.locationQueryVariables,
              data,
            });
          },
          optimisticResponse: {
            __typename: 'Mutation',
            vote: {
              __typename: 'VotePayload',
              officeVote: {
                __typename: 'OfficeVote',
                id: -1,
                officeId,
                userUid,
              },
            },
          },
        })
        .then(() => {
          let message;
          if (alreadyVoted) {
            message = 'Vote removed! :(';
          } else {
            message = 'Vote registered! :)';
          }
          this.$store.dispatch('notification/add', {
            type: 'success',
            message,
          });
        })
        .catch(error => {
          this.$store.dispatch('notification/add', {
            type: 'error',
            message: "Oops, voting didn't work! Maybe try again?",
          });
          console.error(error);
        });
    },
    scan(id, transform) {
      return function(obj) {
        return JSON.parse(
          JSON.stringify(obj, function(key, value) {
            if (typeof value === 'object' && value !== null && value.id === id) {
              return transform(value);
            } else {
              return value;
            }
          })
        );
      };
    },
  },
};
</script>

<style scoped></style>
