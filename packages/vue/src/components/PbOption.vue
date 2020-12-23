<template>
  <option :value="value" :description="description" :url="url">
    <slot />
  </option>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbOption',
  props: {
    value: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});
</script>
