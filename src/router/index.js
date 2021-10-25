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
import book from '../views/book.vue'
import editBook from '../views/editBook.vue'
import catAdmin from '../views/catAdmin.vue'
import addCat from '../views/addCategory.vue'
import editCat from '../views/editCat.vue'
import ordersAdmin from '../views/orderAdmin.vue'
import order from '../views/order.vue'
import category from '../views/category.vue'
import userDashboard from '../views/userDashboard.vue'
import userInfo from '../views/userInfo.vue'
import ordersList from '../views/userOrders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/book/:id',
    name:'book',
    component:book
  },
  {
    path:'/category/:id',
    name:'category',
    component:category
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
    path:'/order/:id',
    name:'order',
    component:order
  },
  {
    path:'/myAccount',
    name:'account',
    component:userDashboard,
    children:[
      {
        path: '/myAccount/',
        redirect: '/myAccount/userInfo', // default child path
      },
      {
        path:'/myAccount/userInfo',
        name:'userInfo',
        component:userInfo
      },
      {
        path:'/myAccount/OrdersList',
        name:'ordersList',
        component:ordersList
      },
    ]
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
        router.push("/login");
      }
    },
    children:[
      {
        path: '/admin',
        redirect: '/admin/books', // default child path
      },
      {
        path:'/admin/books',
        name:'booksAdmin',
        component:bookAdmin
      },
      {
        path:'/admin/addBook',
        name:'addBook',
        component:addBook
      },
      {
        path:'/admin/edit/book/:id',
        name:'editBook',
        component:editBook
      },
      {
        path:'/admin/categories',
        name:'catAdmin',
        component:catAdmin
      },
      {
        path:'/admin/addCategory',
        name:'addCategory',
        component:addCat
      },
      {
        path:'/admin/edit/category/:id',
        name:'editCat',
        component:editCat
      },
      {
        path:'/admin/orders',
        name:'ordersAdmin',
        component:ordersAdmin
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
