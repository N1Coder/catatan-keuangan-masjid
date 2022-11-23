import { createRouter, createWebHistory } from "vue-router"
import { userSession } from "../utils/useAuth"
import DashboardView from "../views/DashboardView.vue"
import ReportTimeView from "../views/ReportTimeView.vue"
import AnalyticsView from "../views/AnalyticsView.vue"
import TransactionsView from "../views/TransactionsView.vue"
import AddPemasukanView from "../views/AddPemasukanView.vue"
import AddPengeluaranView from "../views/AddPengeluaranView.vue"
import ReportView from "../views/ReportView.vue"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: { name: "signin" },
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
    path: "/report/:time",
    name: "reporttime",
    component: ReportTimeView,
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
    path: "/add-transactions",
    name: "transactions",
    component: TransactionsView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/add-transactions/pemasukan",
    name: "addpemasukan",
    component: AddPemasukanView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/add-transactions/pengeluaran",
    name: "addpengeluaran",
    component: AddPengeluaranView,
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
