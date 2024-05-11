<template>
  <div class="movie-list">
    <div class="movie-list-header">
      <h2>Список фильмов</h2>
      <form @submit.prevent="searchMovies">
        <input type="text" v-model="searchQuery" placeholder="Поиск по названию фильма" class="search">
      </form>
    </div>
    <div class="movie-list-body">
      <div class="movie-list-item" v-for="movie in filteredMovies" :key="movie.id" @click="addReview(movie)">
        <div class="movie-poster" >
          <img :src="movie.poster" alt="Movie Poster">
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
.search {
  width: 100%;
  height: 100%;
}

.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #141414;
  color: #fff;
}

.movie-list-header {
  margin-bottom: 30px;
  text-align: center;
}

.movie-list-header h2 {
  font-size: 28px;
  font-weight: bold;
}

.movie-list-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.movie-list-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.movie-list-item:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.movie-poster {
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: 10px;
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
  padding: 20px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  color: #fff;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-list-item:hover .movie-info {
  transform: translateY(0);
}

.movie-info h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.movie-rating {
  font-size: 16px;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #e50914;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background-color: #b30000;
}
</style>
<script>
import axios from "axios";

export default {
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },

  data() {
    return {
      movies: this.$store.state.movies,
      searchQuery: ''
    }
  },
  created() {
    this.$store.dispatch('getMovies')
  },

  beforeMount() {
    this.$store.dispatch('getMovies')
  },
  methods: {
    addReview(movie) {
      this.$router.push({ name: 'add-review', params: { id: movie.id } });
    }
  }
}
</script>