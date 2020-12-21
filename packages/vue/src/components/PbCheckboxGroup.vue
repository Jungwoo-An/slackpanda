<template>
  <checkbox-group :action-id="actionId" :initial-value="initialValue">
    <slot />
  </checkbox-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbCheckboxGroup',
  props: {
    actionId: {
      type: Object,
      default() {
        return generateNonce();
      },
    },
    initialValue: {
      type: Array,
    },
  },
});
</script>
