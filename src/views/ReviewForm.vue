<template>
  <div class="container">
    <div class="cont">
      <iframe
        id="myframe"
        width="560"
        height="400"
        class="film"
        data-src="https://player.cdnvideohub.com/playerjs?partner=23&amp;kid=326"
        frameborder="0"
        allowfullscreen=""
        src="https://dud.allarknow.online/?token_movie=d1f15363eb3f6b2a8fc8c15f413670&amp;token=a4f3461910911c179594a175078490"
      ></iframe>
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
            <textarea
              id="description"
              class="form-control"
              v-model="newReview.text"
            ></textarea>
            <label for="rating">Поставить оценку</label>
            <input
              id="rating"
              class="form-control"
              type="number"
              min="1"
              max="10"
              v-model="newReview.rating"
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

.cont {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.film {
  align-self: center;
}

.container {
  padding: 40px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: 'Montserrat', sans-serif;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  background-color: rgba(177, 172, 172, 0.1);
  color: var(--text-color);
  transition: background-color 0.3s ease;
}

.form-control:focus {
  background-color: rgba(77, 77, 77, 0.2);
  outline: none;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1e88e5;
  color: #000000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0d47a1;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.review-text {
  flex-grow: 1;
  font-size: 16px;
}

.review-rating {
  font-size: 16px;
  color: var(--primary-color);
}
</style>

<script>
import axios from 'axios';

export default {
  mounted() {},
  beforeMount() {
    this.fetchData();
  },
  data() {
    return {
      movie: {
        title: '',
        description: '',
        reviews: [],
      },
      title: 'Отзывы на фильм',
      newReview: {
        text: '',
        idArray: this.$route.params.id - 1,
        rating: '',
      },
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
    saveNewReview() {
      this.$store
        .dispatch('addReview', this.newReview)
        .then(() => {
          this.$router.push({ name: 'user' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
