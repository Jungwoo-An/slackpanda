<template>
  <pb-section text="Pong" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { PbSection } from '@slackpanda/vue';

export default defineComponent({
  name: 'PingPong',
  components: {
    PbSection,
  },
});
</script>
