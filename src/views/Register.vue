<template>
  <div class="container">
    <h1>Регистрация</h1>
    <form @submit.prevent="register" class="form-c">
      <div class="form-group">
        <label for="username">Электронная почта</label>
        <input type="text" id="username" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');
.form-c {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.container {
  width: 400px;
  margin: auto;
  background-color: #f5f5f5;
  color: #333;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1rem;
}
.form-control {
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
  width: 50%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #1e88e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: auto;
}

.btn-primary:hover {
  background-color: #0d47a1;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      axios
        .post('https://json-server-swart-rho.vercel.app/agregator_users', {
          email: this.email,
          password: this.password,
          role: 'user',
        })
        .then((response) => {
          this.$router.push({ name: 'user' });
          this.$store.dispatch('register', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
