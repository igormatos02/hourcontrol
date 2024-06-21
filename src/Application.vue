<template>
    <div>
        <div  v-for="(item, index) in employees" >
            {{item}}
          </div>
    
    </div>
  </template>
  
  <script>
  import { list } from '../api.js';
  
  export default {
    data() {
      return {
        employees:{},
      };
    },
    mounted() {
      this.loadEmployee(); // Load data initially
    },
    methods: {
      loadEmployee() {
        this.hash = {};
        list("employee").then(data => { this.employees = data; });
     
      },
    }
  };
  </script>
  