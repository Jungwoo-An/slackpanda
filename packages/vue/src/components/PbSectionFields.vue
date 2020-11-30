<template>
  <section-fields>
    <slot />
  </section-fields>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbSectionFields',
});
</script>
