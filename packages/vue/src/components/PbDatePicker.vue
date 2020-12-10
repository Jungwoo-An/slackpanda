<template>
  <datepicker
    :action-id="actionId"
    :placeholder="placeholder"
    :initial-date="initialDate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbDatePicker',
  props: {
    actionId: {
      type: String,
      required: true,
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
