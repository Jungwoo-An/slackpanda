<template>
  <button :action-id="actionId" :value="value" :url="url" :style="style" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbButton',
  props: {
    actionId: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    url: {
      type: String,
    },
    style: {
      type: String,
    },
  },
});
</script>
