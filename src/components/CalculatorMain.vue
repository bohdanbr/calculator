<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { store } from '../store.js'
const currentValue = ref('')
const currentOperations = ref('')
const input = ref(null)
const setCalcDate = (operator) => {
  store.calculator.num1 = +currentValue.value
  currentValue.value = ''
  currentOperations.value = operator
  input.value.focus()
}
const reset = () => {
  store.calculator = {
    num1: 0,
    num2: 0,
  },
    store.result = ''
  currentValue.value = ''
  currentOperations.value = ''
  input.value.focus()
}
const calculate = () => {
  store.calculator.num2 = +currentValue.value
  currentValue.value = ''
  const { calculator: { num1, num2 } } = store
  switch (currentOperations.value) {
    case 'plus':
      store.result = num1 + num2;
      break;
    case 'minus':
      store.result = num1 - num2;
      break;
    case 'multiplication':
      store.result = num1 * num2;
      break;
    case 'division':
      store.result = num1 / num2;
      break;
    default:
      break;
  }
}

const validateInput = () => {
  currentValue.value = currentValue.value.replace(/\D/g, '');
};

const pressKey = (event) => {
  if (event.key === '+') {
    if (store.calculator.num1 !== 0 && currentValue.value !== '') {
      calculate();
    }
    setCalcDate('plus');
    console.log('Клавиша "+" нажата!');
  } else if (event.key === '-') {
    if (store.calculator.num1 !== 0 && currentValue.value !== '') {
      calculate();
    }
    setCalcDate('minus');
  } else if (event.key === '*') {
    if (store.calculator.num1 !== 0 && currentValue.value !== '') {
      calculate();
    }
    setCalcDate('multiplication');
  } else if (event.key === '/') {
    if (store.calculator.num1 !== 0 && currentValue.value !== '') {
      calculate();
    }
    setCalcDate('division');
  } else {
    if ((event.key === '=' || event.keyCode === 13) && store.calculator.num1 !== 0 && currentValue.value !== '') {
      calculate();
    } else if (event.altKey && event.keyCode === 13) {
      reset();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', pressKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', pressKey);
});
</script>

<template>
  <div>Calculator</div>
  <input ref="input" type="text" v-model="currentValue" @input="validateInput" />
  <br>
  <br>
  <div class="operations">
    <button :disabled="store.calculator.num1 || !currentValue" @click="setCalcDate('plus')">+</button>
    <button :disabled="store.calculator.num1 || !currentValue" @click="setCalcDate('minus')">-</button>
    <button :disabled="store.calculator.num1 || !currentValue" @click="setCalcDate('multiplication')">*</button>
    <button :disabled="store.calculator.num1 || !currentValue" @click="setCalcDate('division')">/</button>
    <button :disabled="!store.calculator.num1 || !currentValue" @click="calculate">=</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<style>
input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000;
}
.fixed {
  background-color: rgb(236, 234, 234);
  border-radius: 5px;
}
</style>