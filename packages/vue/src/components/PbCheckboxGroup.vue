<template>
  <checkbox-group
    :action-id="actionId"
    :initial-values="values"
    @action="handleAction"
  >
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
