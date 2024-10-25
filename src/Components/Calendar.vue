<template>
    <div class="calendar-container">
      <!-- Sidebar for month and year selection -->
      <div class="sidebar">
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
      </div>
  
      <!-- Calendar view -->
      <div class="calendar">
        <h2>{{ monthNames[selectedMonth] }} {{ selectedYear }}</h2>
        <div class="days-container">
          <div
            v-for="day in daysInMonth"
            :key="day"
            class="day"
            :class="{ 'selected': isSelectedDay(day) }"
            @click="selectDay(day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CalendarComponent',
    data() {
      return {
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        selectedDate: {
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate(),
        },
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
        if (this.selectedMonth === 0) {
          this.selectedMonth = 11;
          this.selectedYear--;
        } else {
          this.selectedMonth--;
        }
      },
      nextMonth() {
        if (this.selectedMonth === 11) {
          this.selectedMonth = 0;
          this.selectedYear++;
        } else {
          this.selectedMonth++;
        }
      },
      // Update selected year
      previousYear() {
        this.selectedYear--;
      },
      nextYear() {
        this.selectedYear++;
      },
      // Select a day and emit event
      selectDay(month, year) {
       
        this.$emit('date-selected', month);
      },
      // Check if the day is the selected day
      isSelectedDay(day) {
        return (
          this.selectedDate.day === day &&
          this.selectedDate.month === this.selectedMonth &&
          this.selectedDate.year === this.selectedYear
        );
      }
    }
  };
  </script>
  
  <style scoped>
  .calendar-container {
    display: flex;
    flex-direction: column;
  }
  
 
  
  .month-year-selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10 10px;
  }
  
  .month-year-selector button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .calendar {
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
  </style>
  