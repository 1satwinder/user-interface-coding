<script setup lang="ts">
import { ref } from "vue";
interface Todo {
  id: number;
  task: string;
}

const todo = ref("");
const todoList = ref<Todo[]>([]);
let counter = 1;

function addTodo() {
  if (todo.value) {
    todoList.value.push({ id: counter, task: todo.value.trim() });
    counter++;
    todo.value = "";
  }
}

function removeTodo(todoID: number) {
  todoList.value = todoList.value.filter((item) => item.id !== todoID);
}
</script>

<template>
  <div>
    <div class="input-container">
        <label for="todo-input">Enter Todo:</label>
        <input type="text" id="todo-input" v-model="todo" @keyup.enter="addTodo" />
        <button type="submit" @click="addTodo" >Submit</button>
    </div>
    <div class="list">
      <ul>
        <li v-for="todo in todoList" :key="todo.id">
          <span> {{ todo.task }}</span>
          <button @click="removeTodo(todo.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 2px solid black;
}
button {
  background-color: aqua;
  border: 2px solid green;
  margin-left: 5px;
}
</style>
