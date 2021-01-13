<template>
  <datepicker
    :action-id="actionId"
    :placeholder="placeholder"
    :initial-date="value"
    @action="handleAction"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce, IDatePickerAction } from '@spd/shared';

export default defineComponent({
  name: 'PbDatePicker',
  props: {
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
      required: true,
    },
  },
  setup(_, { emit }) {
    function handleAction(_payload: FixMe, action: IDatePickerAction) {
      emit('input', action.selected_date);
    }

    return {
      handleAction,
    };
  },
});
</script>
