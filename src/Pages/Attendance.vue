<template>
    <div class="calendar-container">
      <!-- Sidebar for month and year selection -->
      <div class="sidebar2">
        <div class="month-year-selector">
          <button @click="previousMonth"><i class="fas fa-chevron-left"></i></button>
          <span>{{ monthNames[selectedMonth] }}</span>
          <button @click="nextMonth"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="month-year-selector">
          <button @click="previousYear"><i class="fas fa-chevron-left"></i></button>
          <span>{{ selectedYear }}</span>
          <button @click="nextYear"><i class="fas fa-chevron-right"></i></button>
        </div>
         <!-- Calendar view -->
      <div class="calendar">
        <h2>{{ monthNames[selectedMonth] }} {{ selectedYear }}</h2>
        <div class="days-container">
          <div
            v-for="day in daysInMonth"
            :key="day"
            class="day"
            :class="{ 'selected': selectedDay === day }"
            @click="selectDay(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
      </div>
  
     
  
      <!-- Display selected date -->
      <div class="selected-date">
        <h3>Selected Date</h3>
        <p v-if="selectedDay">Year: {{ selectedYear }}, Month: {{ monthNames[selectedMonth] }}, Day: {{ selectedDay }}</p>
        <p v-else>No day selected</p>
        <table class="styled-table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Time</th>
             </tr>
          </thead>
          <tbody>
            <tr v-for="item in projects" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
             
              <td width="150px">
                <input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
  </template>
  
  <script>
    import { useToast } from 'vue-toastification';
  import { get,list,post,put,remove } from '../../api.js';
  export default {
    data() {
      return {
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        selectedDay: null,
        projects:[],
        monthNames: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
      };
    },
    computed: {
      // Calculate number of days in the selected month and year
      daysInMonth() {
        return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
      }
    },
    methods: {
      // Update selected month
      previousMonth() {
        this.selectedMonth = (this.selectedMonth - 1 + 12) % 12;
      },
      nextMonth() {
        this.selectedMonth = (this.selectedMonth + 1) % 12;
      },
      // Update selected year
      previousYear() {
        this.selectedYear--;
      },
      nextYear() {
        this.selectedYear++;
      },
      // Select a day
      selectDay(day) {
        this.selectedDay = day;
      }, listProjects() {
        this.hash = {};
        list("project").then(data => { this.projects = data; });
      
      },
    },mounted() {
    
        this.listProjects(); // Load data initially
    },
  };
  </script>
  
  <style scoped>
  .calendar-container {
    display: flex;
  }
  
  .sidebar {
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  .month-year-selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .month-year-selector button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .calendar {
    flex: 3;
    padding: 20px;
  }
  
  .days-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }
  
  .day {
    text-align: center;
    padding: 10px;
    cursor: pointer;
  }
  
  .day.selected {
    background-color: lightblue;
  }
  
  .selected-date {
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
  }
  </style>
  