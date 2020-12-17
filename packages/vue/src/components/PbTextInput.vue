<template>
  <plain-text-input
    :initial-value="initialValue"
    :min-length="minlength"
    :max-length="maxlength"
    :placeholder="placeholder"
    :multiline="multiline"
    :action-id="actionId"
    @action="handleAction"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateNonce } from '@spd/shared';

export default defineComponent({
  name: 'PbTextInput',
  props: {
    initialValue: {
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
      default() {
        return generateNonce();
      },
    },
  },
  setup() {
    function handleAction(payload: any) {
      console.log(payload);
    }

    return {
      handleAction,
    };
  },
});
</script>
