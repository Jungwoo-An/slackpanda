<template>
  <plain-text-input
    :initial-value="value"
    :min-length="minlength"
    :max-length="maxlength"
    :placeholder="placeholder"
    :multiline="multiline"
    :action-id="actionId"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@slackpanda/shared';

export default defineComponent({
  name: 'PbTextInput',
  props: {
    value: {
      type: String,
    },
    minlength: {
      type: [String, Number],
    },
    maxlength: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
    },
    multiline: {
      type: Boolean,
    },
    actionId: {
      type: String,
      default: () => {
        return generateNonce();
      },
    },
  },
});
</script>
