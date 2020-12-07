<template>
  <button :url="url" :style="style" @action="handleAction">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbButton',
  props: {
    url: {
      type: String,
    },
    style: {
      type: String,
    },
  },
  setup(_, { emit }) {
    function handleAction() {
      emit('click');
    }

    return {
      handleAction,
    };
  },
});
</script>
