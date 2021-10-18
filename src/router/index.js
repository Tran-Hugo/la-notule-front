import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import axios from 'axios'
import Home from '../views/Home.vue'
import Payment from '../views/cartPayment.vue'
import cart from '../views/cart.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import dashboard from '../views/Dashboard.vue'
import bookAdmin from '../views/bookAdmin.vue'
import addBook from '../views/addBook.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/login',
    name:'login',
    component: login
  },
  {
    path:'/cart',
    name:'cart',
    component:cart
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  },
  {
    path:'/admin',
    name:'admin',
    component:dashboard,
    beforeEnter(to, from, next) {
      if (store.state.loginModule.token) {
        let config = {
          headers: {
            Authorization: "Bearer " + store.state.loginModule.token,
          },
        };
        axios
          .get("https://127.0.0.1:8000/api/me", config)
          .then((data) => {
            if (data.data.roles[0] === "ROLE_ADMIN") {
              next();
            } else {
              router.push("/");
            }
            
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        router.push("/");
      }
    },
    children:[
      {
        path:'/admin/books',
        name:'booksAdmin',
        component:bookAdmin
      },
      {
        path:'/addBook',
        name:'addBook',
        component:addBook
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
