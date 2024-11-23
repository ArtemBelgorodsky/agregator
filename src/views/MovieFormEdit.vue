<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="saveMovie">
          <h2>{{ title }}</h2>
          <div class="form-group">
            <label for="title">Название</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="movie.title"
            />
          </div>
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea
              id="description"
              class="form-control"
              v-model="movie.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="rating">Оценка фильма</label>
            <input
              type="number"
              id="rating"
              class="form-control"
              v-model="movie.rating"
              min="1"
              max="10"
            />
          </div>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
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

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #1e88e5;
  border-radius: 0.25rem;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #0d47a1;
  outline: none;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #1e88e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0d47a1;
}
</style>

<script>
import axios from 'axios';

export default {
  beforeMount() {
    this.fetchData();
  },
  data() {
    return {
      movie: {
        title: '',
        description: '',
        rating: '',
        reviews: [],
      },
      title: 'Редактировать фильм',
    };
  },
  methods: {
    fetchData() {
      axios
        .get(
          `https://json-server-swart-rho.vercel.app/agregator_movies/${this.$route.params.id}`
        )
        .then((response) => {
          this.movie = response.data;
        });
    },
    saveMovie() {
      this.$store
        .dispatch('editMovie', this.movie)
        .then(() => {
          this.$router.push({ name: 'admin' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
