<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div v-if="this.$store.state.isAuthenticated">
          <h2>Администратор</h2>
          <button class="btn btn-primary" @click="addMovie">
            Добавить фильм
          </button>
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
                  <button class="btn btn-primary" @click="editMovie(movie)">
                    Редактировать
                  </button>
                  <button class="btn btn-danger" @click="deleteMovie(movie)">
                    Удалить
                  </button>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.container {
  padding: 40px;
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Montserrat', sans-serif;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

.btn-primary {
  background-color: #1e88e5;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.btn-primary:hover {
  background-color: #0d47a1;
}

.btn-danger {
  background-color: #e53935;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c62828;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #1e88e5;
  color: #fff;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get('https://json-server-swart-rho.vercel.app/agregator_movies')
        .then((response) => {
          this.movies = response.data;
        });
    },
    addMovie() {
      this.$router.push({ name: 'add-movie' });
    },
    editMovie(movie) {
      this.$router.push({ name: 'edit-movie', params: { id: movie.id } });
    },
    deleteMovie(movie) {
      this.$store
        .dispatch('deleteMovie', movie.id)
        .then(() => {
          this.movies = this.movies.filter((m) => m.id !== movie.id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
