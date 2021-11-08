import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import axios from 'axios'
import Home from '../views/Home.vue'
import Payment from '../views/cart/cartPayment.vue'
import cart from '../views/cart/cart.vue'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import dashboard from '../views/admin/Dashboard.vue'
import bookAdmin from '../views/admin/books/bookAdmin.vue'
import addBook from '../views/admin/books/addBook.vue'
import book from '../views/book.vue'
import editBook from '../views/admin/books/editBook.vue'
import catAdmin from '../views/admin/categories/catAdmin.vue'
import addCat from '../views/admin/categories/addCategory.vue'
import editCat from '../views/admin/categories/editCat.vue'
import ordersAdmin from '../views/admin/orders/orderAdmin.vue'
import order from '../views/order.vue'
import category from '../views/category.vue'
import userDashboard from '../views/user/userDashboard.vue'
import userInfo from '../views/user/userInfo.vue'
import ordersList from '../views/user/userOrders.vue'
import search from '../views/search.vue'
import contact from '../views/contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/book/:id',
    name:'book',
    component:book,
  },
  {
    path:'/category/:id',
    name:'category',
    component:category
  },
  {
    path:'/search/:search',
    name:'search',
    component:search
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
    component:cart,
    beforeEnter(to, from, next) {
      if (store.state.loginModule.token) {
        let config = {
          headers: {
            Authorization: "Bearer " + store.state.loginModule.token,
          },
        };
        axios
          .get("https://127.0.0.1:8000/api/me", config)
          .then(res=>{
            if(res.status!==401){
              next()
            }
          }
            
            )}
      else {router.push("/")}
      },
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
    beforeEnter(to, from, next) {
      if (store.state.loginModule.token) {
        let config = {
          headers: {
            Authorization: "Bearer " + store.state.loginModule.token,
          },
        };
        axios
          .get("https://127.0.0.1:8000/api/me", config)
          .then(res=>{
            if(res.status!==401){
              next()
            }
          }
            
            )}
      else {router.push("/")}
      },
    children:[
      {
        path: '/myAccount/',
        name:'accountDefault',
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
        name:'adminDefault',
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
  {
    path:'/contact',
    name:'contact',
    component:contact
  }
]
const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition ||
      {
          top: 0,
      }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior
})

export default router
