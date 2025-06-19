<script setup lang="ts">
import { ref } from "vue";
import Tabs from "./components/Tabs.vue";
import JobBoard from "./components/JobBoard2.vue";
import StarRating from "./components/StarRating.vue";
import TodoList from "./components/TodoList.vue";
import Modal from "./components/Modal.vue";
import DropDown from "./components/DropDown.vue";
import MyTodo from "./components/MyTodo.vue";
// import dummy static data array
import { tabItems } from "./dummyData";

const rating = ref(3);

const isModalOpen = ref(false);

function showModal() {
  isModalOpen.value = true;
}
</script>

<template>
  <div>
    <h1>Todo List</h1>
    <todo-list></todo-list> // kebab-case vue auto support
    <MyTodo></MyTodo>
    <h1>1. Tabs Component</h1>
    <Tabs :items="tabItems"></Tabs>
    <h1>2. Job Board</h1>
    <JobBoard />
    <h1>3. Rating</h1>
    <StarRating :max="5" v-model="rating" />
    <DropDown></DropDown> <br/> <br /><br />
    <button @click="showModal">Show Modal</button>
    <Modal
      :isOpen="isModalOpen"
      title="Modal Header"
      content="This is the modal content text2."
      @close-modal="isModalOpen = false"
    ></Modal>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: red;
  }
}
button {
  background-color: aqua;
  border: 2px solid green;
  margin-left: 5px;
}
</style>
