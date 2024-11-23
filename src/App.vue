<template>
  <div id="app">
    <nav class="nav">
      <div class="nav-brand">
        <div>Киноагрегатор</div>
      </div>
      <div class="nav-links">
        <ul>
          <li class="nav-item" v-if="isAdmin">
            <RouterLink to="/admin">Администратор</RouterLink>
          </li>
          <li class="nav-item" v-if="isUser">
            <RouterLink to="/">Пользователь</RouterLink>
          </li>
          <li class="nav-item" v-if="isUser">
            <RouterLink to="/user">Главная</RouterLink>
          </li>
        </ul>
      </div>
      <div class="nav-actions">
        <ul>
          <li class="nav-item" v-if="!isAuthenticated">
            <RouterLink to="/">Войти</RouterLink>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <RouterLink to="/register">Зарегистрироваться</RouterLink>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <RouterLink to="/" @click="logout">Выйти</RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>
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

.nav {
  background-color: var(--primary-color);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.nav-brand {
  font-size: 1.8rem;
  font-weight: 600;
  color: #000000;
  transition: color 0.3s ease;
}

.nav-brand:hover {
  color: var(--secondary-color);
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #000000;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--secondary-color);
}

.nav-actions {
  display: flex;
  align-items: center;
}

.nav-actions ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-actions li {
  margin-right: 20px;
}

.nav-actions a {
  color: #000000;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.nav-actions a:hover {
  color: var(--secondary-color);
}

.main-content {
  padding: 2rem;
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: calc(100vh - 80px);
}
</style>

<script>
export default {
  computed: {
    inError() {
      return this.$store.state.isError;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    isUser() {
      return this.$store.state.isUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
