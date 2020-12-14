<template>
  <select-menu :action-id="actionId" :placeholder="placeholder" :value="value">
    <slot />
  </select-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbSelectMenu',
  props: {
    actionId: {
      type: Object,
      default() {
        return generateNonce();
      },
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
