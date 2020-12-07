<template>
  <modal :title="title" :submit="submit" :close="close" @action="handleAction">
    <slot />
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PbModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    submit: {
      type: String,
    },
    close: {
      type: String,
    },
  },
  setup(_, { emit }) {
    function handleAction() {
      emit('submit');
    }

    return {
      handleAction,
    };
  },
});
</script>
