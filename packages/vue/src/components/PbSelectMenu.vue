<template>
  <select-menu
    :action-id="actionId"
    :placeholder="placeholder"
    :initial-value="value"
    @action="handleAction"
  >
    <slot />
  </select-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce, ISelectMenuAction } from '@slackpanda/shared';

export default defineComponent({
  name: 'PbSelectMenu',
  props: {
    type: {
      type: String,
    },
    actionId: {
      type: String,
      default: () => {
        return generateNonce();
      },
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: ISelectMenuAction) {
      emit('input', action.selected_option.value);
    }

    return {
      handleAction,
    };
  },
});
</script>
