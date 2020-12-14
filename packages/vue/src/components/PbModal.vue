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
import { defineComponent, toRefs } from 'vue';
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
      default: () => {
        return generateNonce();
      },
    },
    open: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const { onSubmit } = toRefs(props);

    function handleAction(payload: FixMe) {
      const { type } = payload;

      switch (type) {
        case 'view_closed': {
          emit('close');
          return undefined;
        }

        case 'view_submission': {
          return onSubmit?.value?.();
        }

        default:
          return undefined;
      }
    }

    return {
      handleAction,
    };
  },
});
</script>
