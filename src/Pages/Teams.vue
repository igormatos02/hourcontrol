<template>
    <div id="app">
      <nav class="navbar">
        <h1>Teams</h1>
        <button @click="this.new()" class="btn new-button">
          <i class="fas fa-plus"></i> New
        </button>
      </nav>
      <div v-if="showGrid">
        <table class="styled-table" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td width="150px">
                <button @click="edit( item)" class="btn edit-button">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="confirmDelete(item.id)" class="btn delete-button">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <form @submit.prevent="saveItem">
          <div class="form-group">
            <label for="name">Name:</label>
            <input v-model="selectedItem.name" type="text" id="name" required>
          </div>
          <button type="submit" class="btn save-button">Save</button>
          <button type="button" @click="cancelForm" class="btn cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';
  import { list,post } from '../../api.js';
  export default {
    data() {
      return {
        showGrid: true,
        items: [],
        form: { id: null, name: '' },
        editMode: false,
      };
    },
    methods: {
      new() {
        this.showGrid = false;
          this.selectedItem = { id: null, name: '' };
          this.editMode = false;
        
      },
      edit(item = {}) {
        this.showGrid = false;
        this.selectedItem = item;
        this.editMode = true;
      },
      saveItem() {
       
        post("team","",this.selectedItem).then(res => {  })
        this.showGrid = true;
        this.showToast('Item saved successfully!', 'success');
      },
      cancelForm() {
        this.showGrid = true;
      },
      confirmDelete(id) {
        this.showToast('Are you sure you want to delete this item?', 'confirm', () => {
          this.deleteItem(id);
        });
      },
      deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.showToast('Item deleted successfully!', 'success');
      },
      showToast(message, type, callback = null) {
        const toast = useToast();
        if (type === 'confirm') {
          toast.info(message, {
            timeout: 5000,
            closeOnClick: false,
            onClick: callback,
          });
        } else {
          toast[type](message);
        }
      },
      loadTeams() {
        this.hash = {};
        list("team").then(data => { this.items = data; });
     
      }
    },
    mounted() {
      this.loadTeams(); // Load data initially
    },
  };
  </script>
  <style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ddd;
    color: #333;
    padding: 10px;
    height: 25px;
  }
  
  .btn {
    cursor: pointer;
    border: none;
    padding: 10px 15px;
    margin: 0 5px;
    border-radius: 5px;
    color: #fff;
  }
  
  .new-button {
    background-color: #4CAF50;
  }
  
  .edit-button {
    background-color: #008CBA;
  }
  
  .delete-button {
    background-color: #f44336;
  }
  
  .save-button {
    background-color: #4CAF50;
  }
  
  .cancel-button {
    background-color: #f44336;
  }
  
  .styled-table {
    border-collapse: collapse;
   
    font-size: 0.9em;

    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  
  .styled-table th,
  .styled-table td {
    padding: 2px 5px;
  }
  
  .styled-table thead tr {
    background-color: #444444;
    color: #ffffff;
    text-align: left;
    height: 30px;
  }
  
  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  
  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  
  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  
  .form-group {
    margin: 15px 0;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  
  form {
    margin: 10px;
  }
  
  .toastification-notification {
    padding: 15px;
    border-radius: 5px;
  }</style>