<template>
  <pb-section text="Vue.js Issues" />
  <pb-section v-if="issues.length > 0">
    <pb-section-fields>
      <pb-text v-for="issue in issues" :key="issue.id">
        {{ issue.title }}
      </pb-text>
    </pb-section-fields>
  </pb-section>
  <pb-actions>
    <pb-button v-if="showsPrevButton" @click="onPrevButtonClicked">
      Prev Page
    </pb-button>
    <pb-button @click="onNextButtonClicked">Next Page</pb-button>
  </pb-actions>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import axios from 'axios';
import {
  PbButton,
  PbSection,
  PbSectionFields,
  PbText,
  PbActions,
} from '@slackpanda/vue';

export default defineComponent({
  name: 'VueIssues',
  components: {
    PbSection,
    PbSectionFields,
    PbText,
    PbButton,
    PbActions,
  },
  setup() {
    const page = ref(1);

    const issues = ref<any[]>([]);

    const showsPrevButton = computed(() => page.value > 1);

    async function fetchData() {
      const response = await axios.get(
        `https://api.github.com/repos/vuejs/vue/issues?per_page=5&page=${page.value}`
      );

      issues.value = response.data;
    }

    function onNextButtonClicked() {
      page.value += 1;

      fetchData();
    }

    function onPrevButtonClicked() {
      page.value -= 1;

      fetchData();
    }

    onMounted(() => {
      fetchData();
    });

    return {
      issues,

      showsPrevButton,

      onNextButtonClicked,
      onPrevButtonClicked,
    };
  },
});
</script>
