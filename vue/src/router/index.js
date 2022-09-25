import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import Login from "../views/auth/Login.vue"
import Register from "../views/auth/Register.vue"
import Dashboard from "../views/Dashboard.vue"
import GuestLayout from '../components/GuestLayout.vue'
import AppLayout from '../components/AppLayout.vue'
import Surveys from "../views/Surveys.vue";
import SurveyView from "../views/SurveyView.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    redirect: "/dashboard",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {path:"/dashboard", component:Dashboard, name:"dashboard"},
          { path: "/surveys", name: "surveys", component: Surveys },
      { path: "/surveys/create", name: "SurveyCreate", component: SurveyView },
      { path: "/surveys/:id", name: "SurveyView", component: SurveyView },
    ]
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "auth",
    component: GuestLayout,
    meta: {isGuest: true},
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});
export default router;
