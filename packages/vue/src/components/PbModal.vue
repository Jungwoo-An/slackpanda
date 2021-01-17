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
import { FixMe, generateNonce } from '@slackpanda/shared';

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
          const values = Object.keys(payload.view.state.values).reduce(
            (result, key) => {
              const [itemKey] =
                Object.keys(payload.view.state.values[key]) ?? [];
              if (!itemKey) {
                return result;
              }

              result[key] = payload.view.state.values[key][itemKey].value;

              return result;
            },
            {} as Record<string, any>
          );

          return onSubmit?.value?.(values, payload);
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
