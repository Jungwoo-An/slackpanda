<template>
  <date-picker
    :actionId="actionId"
    :placeholder="placeholder"
    :initialDate="initialDate"
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
