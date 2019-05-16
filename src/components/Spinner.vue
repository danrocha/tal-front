<template>
  <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="#f2d024" />
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners';

export default {
  components: { HollowDotsSpinner },
};
</script>
