<template>
  <button
    :action-id="actionId"
    :url="url"
    :style="style"
    @action="handleAction"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbButton',
  props: {
    url: {
      type: String,
    },
    style: {
      type: String,
    },
    actionId: {
      type: String,
      default() {
        return generateNonce();
      },
    },
  },
  setup(_, { emit }) {
    function handleAction(payload: FixMe) {
      emit('click', payload);
    }

    return {
      handleAction,
    };
  },
});
</script>
