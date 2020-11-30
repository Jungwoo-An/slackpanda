<template>
  <text>
    <slot />
  </text>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbText',
});
</script>
