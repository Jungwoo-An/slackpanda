<template>
  <checkbox-group
    :action-id="actionId"
    :initial-values="value"
    @action="handleAction"
  >
    <slot />
  </checkbox-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce, ICheckboxGroupAction } from '@spd/shared';

export default defineComponent({
  name: 'PbCheckboxGroup',
  props: {
    actionId: {
      type: String,
      default: () => {
        return generateNonce();
      },
    },
    value: {
      type: Array,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: ICheckboxGroupAction) {
      emit(
        'change',
        action.selected_options.map((selectedOption) => selectedOption.value)
      );
    }

    return {
      handleAction,
    };
  },
});
</script>
