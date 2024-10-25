<template>
    <div class="month-year-selector-container">
      <div class="selector-wrapper">
           <!-- Year Selection -->
           <div class="month-year-selector">
          <button @click="previousYear" class="nav-button">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="year-text">{{ selectedYear }}</span>
          <button @click="nextYear" class="nav-button">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <!-- Month Selection -->
        <div class="month-year-selector">
          <button @click="previousMonth" class="nav-button">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="month-year-text">{{ monthNames[selectedMonth] }}</span>
          <button @click="nextMonth" class="nav-button">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
     
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MonthYearSelector',
    data() {
      return {
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        monthNames: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ]
      };
    },
    created() {
      this.emitInitDate();
    },
    methods: {
      // Emit the initial month and year when the component is created
      emitInitDate() {
        this.$emit('init-date', this.selectedMonth, this.selectedYear);
      },
      // Update selected month
      previousMonth() {
        if (this.selectedMonth === 0) {
          this.selectedMonth = 11;
          this.selectedYear--;
        } else {
          this.selectedMonth--;
        }
        this.emitSelectedDate();
      },
      nextMonth() {
        if (this.selectedMonth === 11) {
          this.selectedMonth = 0;
          this.selectedYear++;
        } else {
          this.selectedMonth++;
        }
        this.emitSelectedDate();
      },
      // Update selected year
      previousYear() {
        this.selectedYear--;
        this.emitSelectedDate();
      },
      nextYear() {
        this.selectedYear++;
        this.emitSelectedDate();
      },
      // Emit the selected month and year
      emitSelectedDate() {
        this.$emit('date-selected', this.selectedMonth, this.selectedYear);
      }
    }
  };
  </script>
  
  <style scoped>
  .month-year-selector-container {
    width: calc(100% - 50px);

    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .selector-wrapper {
    width: 100%;

    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .month-year-selector {
    display: flex;
    align-items: center;
    margin: 10px 0;
    width: 100%;
    justify-content: space-between;
  }
  
  .nav-button {
    background: #3498db;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .nav-button:hover {
    background: #2980b9;
  }
  
  .month-year-text, .year-text {
    flex: 1;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
  }
  
  @media (max-width: 600px) {
    .month-year-text, .year-text {
      font-size: 1.2em;
    }
  
    .nav-button {
      width: 30px;
      height: 30px;
    }
  }
  </style>
  