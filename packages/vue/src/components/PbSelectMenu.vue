<template>
  <select-menu
    :action-id="actionId"
    :placeholder="placeholder"
    :initial-value="initialValue"
  >
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
      required: false,
    },
    initialValue: {
      type: null,
    },
  },
});
</script>
