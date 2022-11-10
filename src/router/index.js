import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LineCrimeView from '../views/LineCrimeView.vue'
import LoginView from '../views/LoginView.vue'
import store from '../store'


const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/line-crime',
    name: 'lineCrime',
    component: LineCrimeView
  },
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const ifLogin = !!store.state.account;
  if (ifLogin && to.name === 'login') {
    alert("您已登入，當您導回首頁");
    next({ name: 'home' });
  } else if (!ifLogin && to.name !== "login") {
    alert("你沒登入，不能去其他網址");
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
