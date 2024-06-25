<template>
  <div id="app">
    <header class="header">
      Fixed Header
    </header>
    <div class="container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li><a @click="loadPage(EMPLOYEES)">Employees</a></li>
            <li><a @click="loadPage(TEAMS)">Teams</a></li>
            <li><a @click="loadPage(PROJECTS)">Projects</a></li>
            <li><a @click="loadPage(ATTENDANCE)">Attendance</a></li>
          </ul>
        </nav>
      </aside>
      <main class="content">
        <div class="content-inner">
          <div v-if="selectedPage==TEAMS"> <Teams></Teams></div>
          <div v-if="selectedPage==PROJECTS"> <Projects></Projects></div>
          <div v-if="selectedPage==ATTENDANCE"> <Attendance></Attendance></div>
          <div v-if="selectedPage==EMPLOYEES"> <Employees></Employees></div>
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


export default {
  name: 'App',
  data(){
    return {
      ATTENDANCE:'attendance',
      TEAMS:'teams',
      PROJECTS:'projects',
      EMPLOYEES:'employees',
      selectedPage: 'attendance',
      };
  },
  components: {
    Teams,
    Employees,
    Projects,
    Attendance
  },
  methods: {
      loadPage(page) {
        this.selectedPage = page
      },
    }
};
</script>
