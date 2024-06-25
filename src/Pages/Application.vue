<template>
 
  <div>
    <b-button @click="makeToast()">Show Toast</b-button>
    <b-button @click="makeToast(true)">Show Toast (appended)</b-button>
  </div>
  <a href="#">Inbox <span class="badge">42</span></a>

<button class="btn btn-primary" type="button">
  Messages <span class="badge">4</span>
</button>

    <div>
        <div  v-for="(item, index) in employees" >
            {{item}}
          </div>
    
    </div>
    <div>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Dismissible Alert!
    </b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress
        variant="warning"
        :max="dismissSecs"
        :value="dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>

    <b-button @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-button>
    <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
      Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})
    </b-button>
  </div>
  </template>
  
  <script>
  import { list } from '../api.js';
  
  export default {
    data() {
      return {
        employees:{},
        dismissSecs: 10,
        dismissCountDown: 0,
        showDismissibleAlert: false,
        toastCount: 0
      };
    },
    mounted() {
      this.loadEmployee(); // Load data initially
    },
    methods: {
      loadEmployee() {
        this.hash = {};
        list("employee").then(data => { this.employees = data; });
     
      }, countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      makeToast(append = false) {
        this.toastCount++
        this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          appendToast: append
        })
      }
    }
  };
  </script>
  