<template>
  <div v-if="networkName === 'Twitter'">
    <a
      class="twitter-timeline"
      data-link-color="#ecc94b"
      data-tweet-limit="3"
      :href="`https://twitter.com/${handle}?ref_src=twsrc%5Etfw`"
      >Tweets by {{ handle }}</a
    >
  </div>
  <div v-else-if="networkName === 'Youtube'">
    <iframe
      width="600"
      height="340"
      :src="
        `http://www.youtube.com/embed?max-results=1&controls=0&showinfo=0&rel=0&listType=user_uploads&list=${handle}`
      "
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'LatestSocial',
  props: {
    networkName: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
  },
  mounted() {
    if (this.networkName === 'Twitter') {
      let twitterScript = document.createElement('script');
      twitterScript.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      twitterScript.setAttribute('charset', 'utf-8');
      twitterScript.async = true;
      document.head.appendChild(twitterScript);
    }
  },
};
</script>

<style lang="scss" scoped></style>
