<script setup>
  import { store } from './store.js'
  import CalculatorMain from './components/CalculatorMain.vue'
</script>

<template>
  <CalculatorMain />
  <br>
  <br>
  <div class="result" v-show="store.result !== ''">Результат: {{ store.result }}</div>
  <br>
  <br>
  <div class="fixed">
    <td>1. Добавлена проверка по вводу только цифр и ограничение в 4 числа</td>
    <tr></tr>
    <td>2. Добавлена поддержка логических кнопок на клавиатуре</td>
  </div>
</template>