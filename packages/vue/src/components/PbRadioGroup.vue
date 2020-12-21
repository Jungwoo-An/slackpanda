<template>
  <radio-group :action-id="actionId" :initial-value="initialValue">
    <slot />
  </radio-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbRadioGroup',
  props: {
    actionId: {
      type: Object,
      default() {
        return generateNonce();
      },
    },
    initialValue: {
      type: null,
    },
  },
});
</script>
