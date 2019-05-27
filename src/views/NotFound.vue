<template>
  <div class="w-1/3">
    <vue-headful title="Sorry! - TAL" />

    <h1 class="my-6">Oops!</h1>
    <h3 class="my-6">
      The
      <template v-if="resource">{{ resource }}</template
      >page you are looking for is not here.
    </h3>
    <router-link class="link my-6" to="/">Back to the home page</router-link>
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
};
</script>
