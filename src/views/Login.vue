<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h2>Войти</h2>
      </div>
      <div class="login-body">
        <form @submit.prevent="login" v-if="!isAuthenticated">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              class="form-control"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Войти</button>
        </form>
        <div v-if="isError" class="error-message">
          Неправильный логин или пароль!
        </div>
        <div v-if="inAdmin" class="login-message">
          Вы зашли за Администратора
        </div>
        <div v-if="inUser" class="login-message">Вы зашли за Пользователя</div>
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, var(--primary-color), var(--hover-color));
  color: #fff;
}

.login-card {
  background: rgba(0, 0, 0, 0.75);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-size: 28px;
  font-weight: bold;
}

.login-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 15px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1) !important;
  color: #fff;
  transition: background 0.3s ease;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.2);
  outline: none;
}

.btn-primary {
  margin-top: 10px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background: #1e88e5;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #0d47a1;
}

.error-message {
  color: #ff0000;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.login-message {
  font-size: 18px;
  text-align: center;
  margin-top: 30px;
}
</style>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('getMovies');
    this.$store.dispatch('getUsers');
  },
  beforeUpdate() {},

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    inAdmin() {
      return this.$store.state.isAdmin;
    },
    inUser() {
      return this.$store.state.isUser;
    },
    isError() {
      return this.$store.state.isError;
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          if (this.inAdmin) {
            this.$router.push({ name: 'admin' });
          } else if (this.inUser) {
            this.$router.push({ name: 'user' });
          } else this.$router.push({ name: 'error' });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
