import { reactive } from 'vue'

export const store = reactive({
  calculator: {
    num1: 0,
    num2: 0,
  },
  result: ''
})