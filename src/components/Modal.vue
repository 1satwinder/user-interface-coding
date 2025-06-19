<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
interface Props {
  title: string;
  content: string;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['close-modal']);

function closeModal(){
    emit('close-modal');
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal();
}

onMounted(() => {
  window.addEventListener('keydown', handleKey);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey);
});
</script>

<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" >
      <div class="header">
        <h2>{{ title }}</h2>
      </div>
      <div class="body">
        <p>{{ content }}</p>
      </div>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  /* inset: 0; */
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;

  align-items: center;
  display: flex;
  justify-content: center;

  padding: 20px;
}

.modal{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: white;
    color: black;
    width: 60vw;
    height: 70vh;
}
button{
    background-color: red;
    width: 20%;
}
</style>
