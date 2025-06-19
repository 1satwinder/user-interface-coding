// consider user-experience, accessibility, performance of any computation and
best practices
<script lang="ts" setup>
import { ref } from "vue";
interface Item {
  value: string;
  label: string;
  panel: string;
}

interface Props {
  items: Item[];
  defaultItem?: string;
}

const props = defineProps<Props>();

const selected = ref(props.defaultItem ?? props.items[0].value);
</script>

<template>
  <div role="tablist" aria-label="Tab List">
    <button
      v-for="item in items"
      :key="item.value"
      role="tab"
      :aria-selected="selected === item.value"
      @click="selected = item.value"
    >
      {{ item.label }}
    </button>
  </div>
  <div
    v-for="{ panel, value: itemValue } in items"
    :key="itemValue"
    :hidden="itemValue !== selected"
    role="tabpanel"
  >
    {{ panel }}
  </div>
</template>

<style scoped>
button {
  margin: 10px;
  padding: 5px;
  background: lightgray;
}
</style>
