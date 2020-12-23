<template>
  <form-item :name="name" :label="label" :required="required" :hint="hint">
    <slot />
  </form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbFormItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
    },
  },
});
</script>
