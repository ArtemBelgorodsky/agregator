<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="saveNewReview">
          <h2>{{ title }} "{{ movie.title }}"</h2>
          <div v-for="review in movie.reviews" :key="review.id">
            <div class="review-item">
              <div class="review-text">{{ review.text }}</div>
              <div class="review-rating">Оценка: {{ review.rating }}</div>
            </div>
          </div>
          <div class="form-group">
            <label for="description">Написать отзыв</label>
            <textarea id="description" class="form-control" v-model="newReview.text"></textarea>
            <label for="rating">Поставить оценку</label>
            <input id="rating" class="form-control" type="number" min="1" max="10" v-model="newReview.rating">
          </div>
          <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
        <iframe id="myframe" width="560" height="400" data-src="https://player.cdnvideohub.com/playerjs?partner=23&amp;kid=326" frameborder="0" allowfullscreen="" src="https://player.cdnvideohub.com/playerjs?partner=23&amp;kid=326"></iframe>
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

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #fff;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: background-color 0.3s ease;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #e50914;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #b30000;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.review-text {
  flex-grow: 1;
  font-size: 16px;
}

.review-rating {
  font-size: 16px;
  color: #e50914;
}
</style>

<script>

import axios from "axios";


export default {
  mounted() {

  },
  beforeMount() {
    this.fetchData()
  },
  data() {
    return {
      movie: {
        title: '',
        description: '',
        reviews: []
      },
      title: 'Отзывы на фильм',
      newReview: {
        text:'',
        idArray: this.$route.params.id - 1,
        rating: '',
      },
    }
  },
  methods: {
    fetchData(){
      axios.get(`https://json-server-swart-rho.vercel.app/agregator_movies/${this.$route.params.id}`)
          .then(response => {
            this.movie=response.data
          })
    },
    saveNewReview() {
      this.$store.dispatch('addReview', this.newReview)
          .then(() => {
            this.$router.push({ name: 'user' });
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>