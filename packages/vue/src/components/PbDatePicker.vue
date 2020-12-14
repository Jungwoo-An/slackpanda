<template>
  <datepicker
    :action-id="actionId"
    :placeholder="placeholder"
    :initial-date="initialDate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbDatePicker',
  props: {
    actionId: {
      type: Object,
      default() {
        return generateNonce();
      },
    },
    placeholder: {
      type: String,
    },
    initialDate: {
      type: String,
    },
  },
});
</script>
