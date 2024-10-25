<template>
  <div>
    <!-- Month Selector Component -->
    <MonthSelector @date-selected="onDateSelected" @init-date="onDateInit" />

   

    <!-- Ribbon with Save and Clear buttons 
    <div class="ribbon-container">
      <button class="action-button save-button" @click="save">Save</button>
      <button class="action-button clear-button" @click="handleClear">Clear</button>
    </div>
-->
    <div class="ribbon-container">
    <span>
      Total Sum for {{ monthNames[selectedMonth] }} {{ selectedYear }}:
      {{ totalSum }} of {{ totalMonth }}
    </span>
    <span 
      v-if="totalSum === totalMonth" 
      class="label valid"
    >
      Valid
    </span>
    <span 
      v-else 
      class="label invalid"
    >
      Invalid
    </span>
  </div>

    <!-- Table with Number Inputs -->
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>IO</th>
            <th>Project</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in projects" :key="item.id">
            <td>{{ item.io }}</td>
            <td>{{ item.project_name }}</td>
            <td width="150px">
              <NumberInput v-model="item.total" placeholder="Enter an integer"  @change="calculateTotalSum" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MonthSelector from '../Components/MonthSelector.vue';
import NumberInput from '../Components/NumberInput.vue';
import { list,getReport } from '../../api.js'; // Adjust import path as needed
import { useToast } from 'vue-toastification';

export default {
  components: {
    MonthSelector,
    NumberInput
  },
  data() {
    return {
      projects: [],
      totalSum: 0,
      totalMonth:0,
      selectedMonth: null,
      selectedYear: null,
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    };
  },
  methods: {
    listProjects() {
      getReport(3,1,this.selectedYear,this.selectedMonth).then(data => { 
        this.projects = data; 
        this.calculateTotalSum();
        this.calculateMonthHours();
      });

      /*list("project").then(data => { 
        this.projects = data; 
        this.calculateTotalSum();
        this.calculateMonthHours();
      });*/
    },
    calculateMonthHours(){
      this.totalMonth = this.calculateWeeks()*8;
    },
    calculateTotalSum(){
      this.totalSum = this.projects.reduce((sum, item) => sum + (item.total || 0), 0);
    },
    onDateSelected(month, year) {
      this.selectedMonth = month;
      this.selectedYear = year;
      this.listProjects();
    },
    calculateWeeks() {
      const month = this.selectedMonth + 1; // Months in JavaScript are 0-indexed
      const year = this.selectedYear;

      const weeks = this.getDaysInMonth(month, year);
      return weeks;
    },
    getDaysInMonth(month, year) {
      // Helper function to get the first Monday before or on the given date
      function getFirstMonday(date) {
        let day = date.getDay();
        let diff = (day === 0 ? 6 : day - 1);
        date.setDate(date.getDate() - diff);
        return date;
      }

      // Helper function to get the last Friday on or before the given date
      function getLastFriday(date) {
        let day = date.getDay();
        let diff = (day === 0 ? 6 : day === 5 ? 0 : (day + 2) % 7);
        date.setDate(date.getDate() - diff);
        return date;
      }

      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);

      const firstMonday = getFirstMonday(new Date(year, month - 1, 1));
      const lastFriday = getLastFriday(new Date(year, month, 0));

     // const firstWeekStart = firstMonday.getDate();
      //const lastWeekEnd = lastFriday.getDate();

      //const numberOfDaysInMonth = lastDayOfMonth.getDate();
     // const totalWeeks = Math.ceil((lastWeekEnd - firstWeekStart + 1) / 7);

      //const totalDays = totalWeeks * 5;

      //return Math.min(totalDays, numberOfDaysInMonth);
      var weeks = this.getNumberOfWeeks(firstMonday,lastFriday);
      return weeks*5;
    },
     getNumberOfWeeks(startDate, endDate) {
        // Ensure dates are in Date format
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = end - start;

        // Convert milliseconds to days
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        // Convert days to weeks (rounding up to include partial weeks)
        const numberOfWeeks = Math.ceil(differenceInDays / 7);

        return numberOfWeeks;
      },
    save() {
      this.calculateTotalSum();
      this.calculateMonthHours();
      if (this.totalSum ===  this.totalMonth) {
        useToast().success('The data has been saved successfully!');
        // Add your save logic here
      } else {
        useToast().error('The sum of all inputs must be equal to '+ this.totalMonth+'.');
      }
    },
    handleClear() {
      this.projects.forEach(item => {
        item.value = 0; // Or any default value
      });
      useToast().info('All inputs have been cleared.');
    },
    onDateInit(month, year) {
      
      this.selectedMonth = month;
      this.selectedYear = year;
      console.log(`Initial Month: ${month}, Initial Year: ${year}`);
    }
  },
  mounted() {
    this.listProjects(); // Load data initially
  }
};
</script>

<style scoped>
.table-container {
  width: calc(100% - 50px);
  padding: 20px;
  display: flex;
  justify-content: center;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.styled-table thead {
  background-color: #3498db;
  color: #ffffff;
}

.styled-table th, .styled-table td {
  padding: 15px;
  text-align: left;
}

.styled-table th {
  font-weight: bold;
  border-bottom: 2px solid #ffffff;
}

.styled-table tr:nth-child(even) {
  background-color: #f5f5f5;
}

.styled-table tr:hover {
  background-color: #e0e0e0;
}

.ribbon-container {
  width: calc(100% - 50px);
  background: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 20px;
}

.action-button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}

.save-button {
  background: #3498db;
  color: #ffffff;
}

.save-button:hover {
  background: #2980b9;
}

.clear-button {
  background: #ffffff;
  color: #3498db;
  border: 2px solid #3498db;
}

.clear-button:hover {
  background: #f0f0f0;
}


.label {
  padding: 1px 5px;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 10px;
}

.valid {
  color: #fff;
  background-color: #4CAF50; /* Green */
}

.invalid {
  color: #fff;
  background-color: #F44336; /* Red */
}
</style>
