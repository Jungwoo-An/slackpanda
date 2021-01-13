<template>
  <radio-group
    :action-id="actionId"
    :initial-value="value"
    @action="handleAction"
  >
    <slot />
  </radio-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce, IRadioGroupAction } from '@spd/shared';

export default defineComponent({
  name: 'PbRadioGroup',
  props: {
    actionId: {
      type: String,
      default: () => {
        return generateNonce();
      },
    },
    value: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: IRadioGroupAction) {
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
