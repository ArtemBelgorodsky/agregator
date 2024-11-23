<template>
  <div class="movie-list">
    <div class="movie-list-header">
      <h2>Список фильмов</h2>
      <form @submit.prevent="searchMovies">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Поиск по названию фильма"
          class="search"
        />
      </form>
    </div>
    <div class="movie-list-body">
      <div
        class="movie-list-item"
        v-for="movie in filteredMovies"
        :key="movie.id"
        @click="addReview(movie)"
      >
        <div class="movie-poster">
          <img :src="movie.poster" alt="Movie Poster" />
        </div>
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.description }}</p>
          <div class="movie-rating">
            <span>{{ movie.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

:root {
  --primary-color: #1e88e5;
  --secondary-color: #29b6f6;
  --background-color: #f5f5f5;
  --text-color: #333;
  --hover-color: #0d47a1;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
}

.search {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background-color: var(--primary-color);
  color: #000000;
  outline: none;
  transition: background-color 0.3s ease;
}

.search:focus {
  background-color: var(--hover-color);
}

.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
}

.movie-list-header {
  margin-bottom: 40px;
  text-align: center;
  width: 100%;
}

.movie-list-header h2 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-color);
}

.movie-list-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;
}

.movie-list-item {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.movie-list-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.movie-poster {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 15px;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-list-item:hover .movie-poster img {
  transform: scale(1.1);
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: #fff;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-list-item:hover .movie-info {
  transform: translateY(0);
}

.movie-info h3 {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
}

.movie-rating {
  font-size: 16px;
  margin-bottom: 10px;
  color: #f1c40f;
}

.btn-primary {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: var(--hover-color);
}
</style>

<script>
import axios from 'axios';

export default {
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  data() {
    return {
      movies: this.$store.state.movies,
      searchQuery: '',
    };
  },
  created() {
    this.$store.dispatch('getMovies');
  },

  beforeMount() {
    this.$store.dispatch('getMovies');
  },
  methods: {
    addReview(movie) {
      this.$router.push({ name: 'add-review', params: { id: movie.id } });
    },
  },
};
</script>
