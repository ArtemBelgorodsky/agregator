import { createMemoryHistory, createRouter } from 'vue-router'
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import AdminDashboard from "./views/AdminDashboard.vue";
import UserDashboard from "./views/UserDashboard.vue";
import MovieFormSave from "./views/MovieFormSave.vue";
import ReviewForm from "./views/ReviewForm.vue";
import Error from "@/views/Error.vue";
import MovieFormEdit from "@/views/MovieFormEdit.vue";



   const routes = [
       {
           path: '/',
           name: 'login',
           component: Login
       },
       {
           path: '/register',
           name:'register',
           component: Register
       },
       {
           path: '/admin',
           name: 'admin',
           component: AdminDashboard,
           meta: { requiresAuth: true, requiresAdmin: true }
       },
       {
           path: '/user',
           name: 'user',
           component: UserDashboard,
           meta: { requiresAuth: true, requiresUser: true }
       },
       {
           path: '/error',
           name: 'error',
           component: Error,
           meta: { requiresAuth: false, requiresUser: false }
       },
       {
           path: '/movies/add',
           name: 'add-movie',
           component: MovieFormSave,
           meta: { requiresAuth: true, requiresAdmin: true }
       },
       {
           path: '/movies/:id/edit',
           name: 'edit-movie',
           component: MovieFormEdit,
           meta: { requiresAuth: true, requiresAdmin: true }
       },
       {
           path: '/movies/:id/reviews/add',
           name: 'add-review',
           component: ReviewForm,
           meta: { requiresAuth: true, requiresUser: true }
       }
   ]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router