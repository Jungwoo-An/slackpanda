<template>
  <actions>
    <slot />
  </actions>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbActions',
});
</script>
