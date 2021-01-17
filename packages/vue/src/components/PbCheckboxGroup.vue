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
import { FixMe, generateNonce, ICheckboxGroupAction } from '@slackpanda/shared';

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
      required: true,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: ICheckboxGroupAction) {
      emit(
        'input',
        action.selected_options.map((selectedOption) => selectedOption.value)
      );
    }

    return {
      handleAction,
    };
  },
});
</script>
