<template>
  <div :id="`location-${location.id}`" class="border-b">
    <div
      class="item flex flex-no-wrap items-start content-start justify-start w-full py-6 px-6 border-l-8 border-transparent hover:bg-gray-300"
      :class="{ selected: isSelected }"
      @click="selectLocation"
    >
      <div class="vote-arrow w-1 mr-1 text-center">
        <a v-if="!alreadyVoted" class="mt-0 pt-0 cursor-pointer" @click.stop="vote">
          <font-awesome-icon icon="caret-up"></font-awesome-icon>
          <br />&nbsp;
        </a>
        <span v-if="alreadyVoted" class="text-yellow-500">
          <font-awesome-icon icon="caret-up"></font-awesome-icon>
        </span>
      </div>
      <div class="w-full ml-4">
        <h1 class="font-bold text-sm text-gray-800 mb-2 w-full">
          <router-link :to="officeDetailsLink" class="link" @click.stop="selectLocation">
            {{ location.office.name }}
          </router-link>
        </h1>
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <div>
            <a v-if="hasWebsite" class="link" :href="location.office.website" target="_blank">{{
              formatUrl(location.office.website)
            }}</a>
          </div>
          <div>
            <button
              aria-label="`set city filter to ${location.city}`"
              @click.stop="setCityFilter([location.city])"
              class="link"
            >
              {{ location.city.name }}
            </button>
            , {{ location.city.countryByCountryIsocode.iso }}
          </div>
        </div>
        <div
          v-if="location.office.sizeId || location.office.officeTypologies.nodes.length > 0"
          class="mb-2 flex"
        >
          <div v-if="location.office.sizeId" class="flex">
            <span class="uppercase text-xs py-1 px-2 mr-2 bg-white border border-gray-500rounded">{{
              location.office.size.nameShort
            }}</span>
          </div>
          <div v-if="location.office.officeTypologies.nodes.length > 0" class="flex">
            <span
              v-for="node in location.office.officeTypologies.nodes"
              :key="node.id"
              class="uppercase text-xs py-1 px-2 mr-2 bg-gray-400 rounded text-gray-600"
              >{{ node.typology.name }}</span
            >
          </div>
        </div>
        <p class="text-xs text-gray-600 mb-0">
          {{ location.office.officeVotes.totalCount }} votes
          <span v-if="alreadyVoted">
            &nbsp;|
            <button aria-label="vote up" @click.stop="vote" class="link">unvote</button>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VOTE_MUTATION from '@/graphql/VoteMutation.gql';
import LOCATIONS from '@/graphql/Locations.gql';
import formatUrl from '@/mixins/formatUrl';
import kebabCase from '@/mixins/kebabCase';
export default {
  name: 'OfficeListItem',
  mixins: [formatUrl, kebabCase],
  props: {
    location: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      selectedLocation: state => state.location.selectedLocation,
    }),
    isSelected() {
      if (this.selectedLocation) {
        return this.location.id === this.selectedLocation.id;
      }
      return false;
    },
    alreadyVoted() {
      if (this.user && this.location.office.officeVotes.totalCount) {
        return this.location.office.officeVotes.nodes.some(vote => {
          return vote.userUid == this.user.uid;
        });
      }
      return false;
    },
    hasWebsite() {
      return this.location.office.website;
    },

    officeDetailsLink() {
      return {
        path: `/${this.kebabCase(this.location.city.countryByCountryIsocode.iso)}/${this.kebabCase(
          this.location.city.name
        )}/${this.location.id}/${this.kebabCase(this.location.office.name)}`,
      };
    },
  },
  methods: {
    ...mapActions(['setCityFilter', 'location/setLocation']),
    selectLocation() {
      this['location/setLocation'](this.location);
    },
    vote() {
      console.log('this.user', this.user);
      if (!this.user) {
        return this.$router.push({
          name: 'auth',
          params: { message: 'You need to login in to cast a vote.' },
        });
      }
      const userUid = this.user.uid;
      const officeId = this.location.office.id;
      const alreadyVoted = this.alreadyVoted;
      const locationVariables = {
        after: null,
        before: null,
        first: this.$store.state.itemsPerPage,
        last: null,
        orderBy: 'CREATED_AT_DESC',
        condition: {},
        filter: { id: { notIn: [] } },
      };
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
              variables: locationVariables,
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
              variables: locationVariables,
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
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      console.groupEnd();
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
<style scoped>
.vote-arrow {
  margin-left: -8px;
}
.selected {
  @apply border-yellow-500;
}
</style>
