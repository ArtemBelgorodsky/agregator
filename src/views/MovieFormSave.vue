<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="saveMovie">
          <h2>{{ title }}</h2>
          <div class="form-group">
            <label for="title">Название</label>
            <input type="text" id="title" class="form-control" v-model="movie.title">
          </div>
          <div class="form-group">
            <label for="description">Описание</label>
            <textarea id="description" class="form-control" v-model="movie.description"></textarea>
          </div>
          <div class="form-group">
            <label for="description">Оценка фильма</label>
            <textarea id="description" class="form-control" v-model="movie.rating"></textarea>
          </div>
          <div class="form-group">
            <label for="description">Постер (ссылка на картинку в поиске)</label>
            <textarea id="description" class="form-control" v-model="movie.poster"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.fetchData()
  },
  data() {
    return {
      movie: {
        title: '',
        description: '',
        rating:'',
        poster:'',
        reviews:[{
          "id": 1,
          "text": "",
          "rating": Number
        }]
      },
      title: 'Добавить фильм'
    }
  },
  methods: {
    fetchData(){
      axios.get(`https://json-server-swart-rho.vercel.app/agregator_movies/${this.$route.params.id}`)
          .then(response => {
            this.movie=response.data
          })
    },
    saveMovie() {
      this.$store.dispatch('addMovie', this.movie)
          .then(() => {
            this.$router.push({ name: 'admin' });
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>