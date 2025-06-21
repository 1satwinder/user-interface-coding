<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Todo {
  id: number;
  task: string;
}

const todo = ref("");
const todoList = ref<Todo[]>([]);
let counter = 1;
const inputRef = ref<HTMLInputElement | null>(null);

function addTodo() {
  if (todo.value.trim()) {
    todoList.value.push({ id: counter, task: todo.value.trim() });
    counter++;
    todo.value = "";
    inputRef.value?.focus();
  }
}

function deleteTodo(id: number) {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
  inputRef.value?.focus();
}

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div class="input-container">
    <form @submit.prevent="">
      <label for="todo-input">Enter Todo</label>
      <input
        type="text"
        id="todo-input"
        ref="inputRef"
        autocomplete="off"
        v-model="todo"
        @keydown.enter="addTodo"
      />
      <button type="submit" @click="addTodo">Add To List</button>
    </form>
  </div>
  <div class="todo-list">
    <ul>
      <li v-for="{ id, task } in todoList" :key="id">
        <span>{{ task }}</span>
        <button @click="deleteTodo(id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
