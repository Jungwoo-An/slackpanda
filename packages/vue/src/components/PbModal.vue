<template>
  <modal
    :title="title"
    :submit="submit"
    :close="close"
    :open="open"
    :trigger-id="triggerId"
    :action-id="actionId"
    @action="handleAction"
  >
    <slot />
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FixMe, generateNonce } from '@spd/shared';

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
    triggerId: {
      type: null,
      required: true,
    },
    actionId: {
      type: String,
      default() {
        return generateNonce();
      },
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const EMIT_TYPE: Record<string, string> = {
      view_closed: 'close',
      view_submission: 'submit',
    };

    function handleAction(payload: FixMe) {
      const { type } = payload;

      const emitType = EMIT_TYPE[type];
      if (emitType) {
        emit(emitType);
      }
    }

    return {
      handleAction,
    };
  },
});
</script>
