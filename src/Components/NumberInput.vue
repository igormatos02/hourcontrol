<template>
    <div>
      <input
        type="text"
        v-model="inputValue"
        @input="onInput"
        :placeholder="placeholder"
        maxlength="3"
        @focus="selectAllText"
        @change="onChange"
      />
      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  // Define props
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Enter a number'
    }
  });
  
  // Define local state
  const inputValue = ref(props.modelValue.toString());
  const errorMessage = ref('');
  const selectAllText = (event) => {
  event.target.select(); // Select all text in the input field
};
  // Validate and format input to ensure it is an integer
  const onInput = (event) => {
    const value = event.target.value;
    
    if (/^\d*$/.test(value)) {
      // Valid integer input
      inputValue.value = value;
      errorMessage.value = '';
      emit('update:modelValue', value ? parseInt(value, 10) : null);
    } else {
      // Invalid input
      errorMessage.value = 'Please enter only numeric values.';
     inputValue.value = value.toString().slice(0, -1) ;
    }
  };
  


// Emit change event when input loses focus
const onChange = () => {
  emit('change', inputValue.value ? parseInt(inputValue.value, 10) : null);
};

  // Watch for prop changes and update local inputValue
  watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue !== null ? newValue.toString() : '';
  });
  
  // Define emits
  const emit = defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-size: 0.875em;
    margin-top: 0.5em;
  }
  </style>
  