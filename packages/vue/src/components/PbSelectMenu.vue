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
import { FixMe, generateNonce, ISelectMenuAction } from '@spd/shared';

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
    value: {
      type: String,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: ISelectMenuAction) {
      emit('change', action.selected_option.value);
    }

    return {
      handleAction,
    };
  },
});
</script>
