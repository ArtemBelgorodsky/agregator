<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="this.$store.state.isAuthenticated">
          <h2>Администратор</h2>
          <button class="btn btn-primary" @click="addMovie">Добавить фильм</button>
          <table class="table">
            <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="movie in movies" :key="movie.id">
              <td>{{ movie.title }}</td>
              <td>{{ movie.description }}</td>
              <td>
                <button class="btn btn-primary" @click="editMovie(movie)">Редактировать</button>
                <button class="btn btn-danger" @click="deleteMovie(movie)">Удалить</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 40px;
  background-color: #141414;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.btn-primary {
  background-color: #b69e00;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.btn-primary:hover {
  background-color: #fce502;
}

.btn-danger {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 10px;
}

.btn-danger:hover {
  background-color: #6e0000;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table th {
  background-color: #333;
  color: #fff;
}

.table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

<script>

import axios from "axios";

export default {
  data() {
    return {
      movies: []
    }
  },
  beforeMount() {
    this.fetchData()

  },
  methods: {
    fetchData(){
      axios.get('https://json-server-swart-rho.vercel.app/agregator_movies')
          .then(response => {
            this.movies=response.data
          })
    },
    addMovie() {
      this.$router.push({ name: 'add-movie' });
    },
    editMovie(movie) {
      this.$router.push({ name: 'edit-movie', params: { id: movie.id } });
    },
    deleteMovie(movie) {
      this.$store.dispatch('deleteMovie', movie.id)
          .then(() => {
            this.movies = this.movies.filter(m => m.id!== movie.id);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>