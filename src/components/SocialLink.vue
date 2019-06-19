<template>
  <!-- TODO: convert to functional component -->
  <a
    :href="`${link.socialNetwork.handlePrefix}/${link.handle}`"
    class="text-gray-700 hover:text-yellow-500"
    target="_blank"
  >
    <font-awesome-icon :icon="link.socialNetwork.icon ? ['fab', link.socialNetwork.icon] : 'link'"/>
  </a>
</template>

<script>
export default {
  name: 'SocialLink',
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>
