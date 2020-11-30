<template>
  <section :text="text">
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbSection',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
});
</script>
