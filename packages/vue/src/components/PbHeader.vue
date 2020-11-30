<template>
  <header>
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbHeader',
});
</script>
