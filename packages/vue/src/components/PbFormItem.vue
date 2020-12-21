<template>
  <form-item :label="label">
    <slot />
  </form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbFormItem',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>
