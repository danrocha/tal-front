<template>
  <div class="flex items-center justify-between w-full pl-6 pr-4">
    <div>
      <span class="text-sm text-gray">{{ totalCount }}&nbsp;offices</span>
    </div>
    <div>
      <tal-button
        aria-label="previous page"
        class="mx-6"
        base-type="secondary"
        :disabled="!pageInfo.hasPreviousPage"
        @click="prevPage(pageInfo.startCursor)"
      >
        <font-awesome-icon icon="arrow-left"></font-awesome-icon>
      </tal-button>
      <span class="text-sm text-gray">{{ paginationInfo.pageNumber }} of {{ numberOfPages }}</span>

      <tal-button
        aria-label="next page"
        class="mx-6"
        base-type="secondary"
        @click="nextPage(pageInfo.endCursor)"
        :disabled="!pageInfo.hasNextPage"
      >
        <font-awesome-icon icon="arrow-right"></font-awesome-icon>
      </tal-button>
    </div>
  </div>
</template>

<script>
import TalButton from '@/components/TalButton.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Pagination',
  components: {
    TalButton,
  },
  props: {
    totalCount: {
      type: Number,
      required: true,
    },
    pageInfo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['paginationInfo', 'itemsPerPage']),
    numberOfPages() {
      if (!this.itemsPerPage) return 1;
      return Math.ceil(this.totalCount / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions(['setPaginationInfo']),
    nextPage(endCursor) {
      this.setPaginationInfo({
        first: this.itemsPerPage,
        after: endCursor,
        before: null,
        last: null,
        pageNumber: this.paginationInfo.pageNumber + 1,
      });
    },
    prevPage(startCursor) {
      this.setPaginationInfo({
        last: this.itemsPerPage,
        before: startCursor,
        after: null,
        first: null,
        pageNumber: this.paginationInfo.pageNumber - 1,
      });
    },
  },
};
</script>

<style></style>
