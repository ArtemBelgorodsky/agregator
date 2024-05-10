
import axios from "axios";
import { createStore } from 'vuex'

const store = createStore({
    state: {
        isAuthenticated: false,
        isError: false,
        isAdmin: false,
        isUser: false,
        movies: [],
        reviews: [],
        users:[]
    },
    mutations: {
        SET_ERROR(state, isError) {
            state.isError = isError;
        },
        SET_AUTHENTICATED(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        SET_ADMIN(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
        SET_USER(state, isUser) {
            state.isUser = isUser;
        },
        SET_MOVIES(state, movies) {
            state.movies = movies;
        },
        SET_REVIEWS(state, reviews) {
            state.reviews = reviews;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
    },
    actions: {
        logout({ commit }) {
            return axios.get('https://json-server-swart-rho.vercel.app/agregator_users')
                .then(() => {
                    commit('SET_AUTHENTICATED', false);
                    commit('SET_ADMIN', false);
                    commit('SET_USER', false);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        login({ commit }, credentials) {
            let user = store.state.users.find(user => user.email == credentials.email)

            if (user.password == credentials.password && user.role == "user") {
                return axios.get('https://json-server-swart-rho.vercel.app/agregator_users', credentials)
                .then(response => {
                    commit('SET_AUTHENTICATED', true);
                    commit('SET_USER',true);
                })
                .catch(error => {
                    console.error(error);
                });}
            else if (user.password == credentials.password && user.role == "admin") {
                return axios.get('https://json-server-swart-rho.vercel.app/agregator_users', credentials)
                .then(response => {
                    commit('SET_AUTHENTICATED', true);
                    commit('SET_ADMIN',true);
                })
                .catch(error => {
                    console.error(error);
                });}



        },
        register({ commit }, credentials) {
                 commit('SET_AUTHENTICATED', true);
                commit('SET_USER', true);
                },


        getMovies({ commit }) {
            return axios.get('https://json-server-swart-rho.vercel.app/agregator_movies')
                .then(response => {
                    commit('SET_MOVIES', response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        getUsers({ commit }) {
            return axios.get('https://json-server-swart-rho.vercel.app/agregator_users')
                .then(response => {
                    commit('SET_USERS', response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addMovie({ commit }, movie) {
            return axios.post('https://json-server-swart-rho.vercel.app/agregator_movies', movie)
                .then(response => {
                    commit('SET_MOVIES', [...state.movies, response.data]);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        editMovie({ commit }, movie) {
            return axios.put(`https://json-server-swart-rho.vercel.app/agregator_movies/${movie.id}`, {
                title: movie.title,
                poster: movie.poster,
                description: movie.description,
                rating: movie.rating,
                reviews: movie.reviews,
            })
                .then(response => {
                    commit('SET_MOVIES', [...state.movies, response.data]);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteMovie({ commit }, id) {
            return axios.delete(`https://json-server-swart-rho.vercel.app/agregator_movies/${id}`)
                .then(() => {
                    commit('SET_MOVIES', state.movies.filter(m => m.id!== id));
                })
                .catch(error => {
                    console.error(error);
                });
        },
        addReview({ commit }, review) {
            return axios.put(`https://json-server-swart-rho.vercel.app/agregator_movies/${review.idArray + 1}`,
                {
                    title: this.state.movies[review.idArray].title,
                    poster: this.state.movies[review.idArray].poster,
                    description: this.state.movies[review.idArray].description,
                    rating: this.state.movies[review.idArray].rating,
                    reviews: [...this.state.movies[review.idArray].reviews, review],
                }
         )
                .then(response => {
                    commit('SET_REVIEWS', [...state.reviews, response.data]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
});

export default store