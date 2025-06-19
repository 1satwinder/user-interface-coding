<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const options = [
  { label: 'Option A', value: 'A' },
  { label: 'Option B', value: 'B' },
  { label: 'Option C', value: 'C' },
];

const isOpen = ref(false);
const highlightedIndex = ref(-1);
const selected = ref<string | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    highlightedIndex.value = 0;
  }
};

function handleKeyDown(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (event.key === 'ArrowDown') {
    highlightedIndex.value = (highlightedIndex.value + 1) % options.length;
    event.preventDefault();
  } else if (event.key === 'ArrowUp') {
    highlightedIndex.value = (highlightedIndex.value - 1 + options.length) % options.length;
    event.preventDefault();
  } else if (event.key === 'Enter') {
    if (highlightedIndex.value >= 0) {
      selected.value = options[highlightedIndex.value].value;
      isOpen.value = false;
    }
    event.preventDefault();
  } else if (event.key === 'Escape') {
    isOpen.value = false;
    event.preventDefault();
  }
}

const handleOptionClick = (index: number) => {
  selected.value = options[index].value;
  isOpen.value = false;
};

const selectedLabel = computed(() => {
  return options.find(o => o.value === selected.value)?.label || 'Select option';
});

function handleOutsideClick(e: MouseEvent) {
  const el = e.target as HTMLElement;
  if (!el.closest('.dropdown')) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});
</script>

<template>
  <div class="dropdown" @keydown="handleKeyDown" tabindex="0">
    <button
      @click="toggleDropdown"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      {{ selectedLabel }}
    </button>

    <ul
      v-show="isOpen"
      role="listbox"
      class="dropdown-list"
    >
      <li
        v-for="(option, index) in options"
        :key="option.value"
        role="option"
        :aria-selected="selected === option.value"
        :class="{ highlighted: highlightedIndex === index }"
        @click="handleOptionClick(index)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 200px;
}

button {
  width: 100%;
  padding: 8px;
  cursor: pointer;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  background: white;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-list li {
  padding: 8px;
  cursor: pointer;
}

.dropdown-list li.highlighted {
  background-color: #eee;
}
</style>
