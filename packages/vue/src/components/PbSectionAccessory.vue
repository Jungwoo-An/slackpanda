<template>
  <section-accessory>
    <slot />
  </section-accessory>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbSectionAccessory',
});
</script>
