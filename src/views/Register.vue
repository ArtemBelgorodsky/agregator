<template>
  <div class="container">
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Электронная почта</label>
        <input type="text" id="username" v-model="email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  background-color: #000;
  color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #333;
  color: #fff;
}

.btn-primary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #e50914;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #b2070e;
}
</style>

<script>
import axios from "axios";

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      axios.post('https://json-server-swart-rho.vercel.app/agregator_users', {
        email: this.email,
        password: this.password,
        role: "user"
      })
          .then(response => {
            this.$router.push({ name: 'user' });
            this.$store.dispatch('register', response.data);

          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>