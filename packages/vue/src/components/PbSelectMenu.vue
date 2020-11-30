<template>
  <select-menu :actionId="actionId" :placeholder="placeholder" :value="value">
    <slot />
  </select-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbSelectMenu',
  props: {
    actionId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
  },
});
</script>
