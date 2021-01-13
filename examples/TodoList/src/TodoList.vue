<template>
  <pb-actions v-if="items.length > 0">
    <pb-checkbox-group
      :value="completedItems.map((item) => item.timestamp)"
      @input="handleChange"
    >
      <pb-checkbox
        v-for="item in items"
        :key="item.timestamp"
        :value="item.timestamp"
      >
        {{ item.content }}
      </pb-checkbox>
    </pb-checkbox-group>
  </pb-actions>
  <pb-section v-if="items.length > 0">
    <pb-section-fields>
      <pb-text>{{ items.length - completedItems.length }} items left</pb-text>
    </pb-section-fields>
  </pb-section>
  <pb-actions>
    <pb-button @click="handleCreate">New Item</pb-button>
  </pb-actions>
  <pb-modal
    title="Create Item"
    submit="Submit"
    :trigger-id="showsModal ? triggerId : undefined"
    :open="showsModal"
    :on-submit="handleSubmit"
  >
    <pb-form-item name="content" label="Content" required>
      <pb-text-input placeholder="What needs to be done?" />
    </pb-form-item>
  </pb-modal>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, ref } from 'vue';

import {
  PbModal,
  PbButton,
  PbActions,
  PbHeader,
  PbFormItem,
  PbTextInput,
  PbSection,
  PbSectionFields,
  PbText,
  PbCheckboxGroup,
  PbCheckbox,
} from '../dist/vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    PbActions,
    PbButton,
    PbModal,
    PbHeader,
    PbFormItem,
    PbTextInput,
    PbSection,
    PbSectionFields,
    PbText,
    PbCheckboxGroup,
    PbCheckbox,
  },
  setup() {
    const items = ref<
      Array<{
        timestamp: string;
        content: string;
        completed: boolean;
      }>
    >([]);

    const triggerId = ref<string>();

    const showsModal = ref(false);

    const completedItems = computed(() =>
      items.value.filter((item) => item.completed)
    );

    function handleChange(values: string[]) {
      items.value = items.value.map((item) => ({
        ...item,
        completed: values.includes(item.timestamp),
      }));
    }

    function handleCreate({ trigger_id }: { trigger_id: string }) {
      triggerId.value = trigger_id;
      showsModal.value = true;
    }

    function handleSubmit({ content }: { content: string }) {
      showsModal.value = false;

      items.value = [
        ...items.value,
        {
          timestamp: String(Date.now()),
          completed: false,
          content,
        },
      ];
    }

    return {
      items,
      triggerId,
      showsModal,
      completedItems,

      handleChange,
      handleCreate,
      handleSubmit,
    };
  },
});
</script>
