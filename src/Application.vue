<template>
  <div id="app">
    <header class="header">
    Projects Time Control
    </header>
    <div class="container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><a @click="loadPage(EMPLOYEES)">Employees</a></li>
            <li><a @click="loadPage(TEAMS)">Teams</a></li>
            <li><a @click="loadPage(PROJECTS)">Projects</a></li>
            <li><a @click="loadPage(ATTENDANCE)">Time Control</a></li>
            <li><a @click="loadPage(REPORT)">Reports</a></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <div class="content-inner">
          <div v-if="selectedPage==TEAMS"> <Teams></Teams></div>
          <div v-if="selectedPage==PROJECTS"> <Projects></Projects></div>
          <div v-if="selectedPage==ATTENDANCE"> <Attendance></Attendance></div>
          <div v-if="selectedPage==EMPLOYEES"> <Employees></Employees></div>
          <div v-if="selectedPage==REPORT"> <Report></Report></div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Teams from './Pages/Teams.vue'
import Employees from './Pages/Employees.vue'
import Projects from './Pages/Projects.vue'
import Attendance from './Pages/Attendance.vue'
import Report from './Pages/Report.vue'


export default {
  name: 'App',
  data(){
    return {
      ATTENDANCE:'attendance',
      TEAMS:'teams',
      PROJECTS:'projects',
      EMPLOYEES:'employees',
      REPORT:'report',
      selectedPage: 'attendance',
      };
  },
  components: {
    Teams,
    Employees,
    Projects,
    Attendance,
    Report
  },
  methods: {
      loadPage(page) {
        this.selectedPage = page
      },
    }
};
</script>
