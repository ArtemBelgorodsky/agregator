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
.nav {
  background-color: #141414;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  matgin-bottom: 2px;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
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
  color: #fff;
  text-decoration: none;
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
  color: #fff;
  text-decoration: none;
}

.main-content {
  padding: 2rem;
  background-color: #141414;
  color: #fff;
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
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>