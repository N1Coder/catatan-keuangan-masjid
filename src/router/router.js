import { createRouter, createWebHistory } from "vue-router"
import { userSession } from "../utils/useAuth"
import DashboardView from "../views/DashboardView.vue"
import HistoryView from "../views/HistoryView.vue"
import AnalyticsView from "../views/AnalyticsView.vue"
import ReportView from "../views/ReportView.vue"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      auth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/report",
    name: "report",
    component: ReportView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/history",
    name: "history",
    component: HistoryView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/analytics",
    name: "analytics",
    component: AnalyticsView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/signin",
    name: "signin",
    component: LoginView,
    meta: {
      auth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "link-active",
  linkExactActiveClass: "link-exact-active",
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && userSession.value === null) {
    next({ name: "signin" })
  } else if (!to.meta.auth && userSession.value !== null) {
    next({ name: "dashboard" })
  } else {
    next()
  }
})

export default router
