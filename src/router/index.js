import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Events from '../views/Events.vue'
import Performances from '../views/Performances.vue'
import CreateEvent  from '../views/CreateEvent.vue'
import CurrentEvent  from '../views/CurrentEvent.vue'
import Users from '../views/Users.vue'
import Organizations from '../views/Organizations.vue'
import EventsCategories from '../views/EventsCategories.vue'
import EventNews from '../views/EventNews.vue'
import CreateNews from '../views/CreateNews.vue'
import ChosenEvents from '../views/ChosenEvents.vue'
import ChosenPerformances from '../views/ChosenPerformances.vue'
import PrivateEventAccept from '../views/PrivateEventAccept.vue'
import Login from '../views/Login.vue'
// import { format } from 'core-js/fn/date'

// import Store from '../store'
// import requests from '../requests'  //Запросы

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/event-news',
    name: 'EventNews',
    component: EventNews,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: CreateNews,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/createEvent',
    name: 'CreateEvent',
    component: CreateEvent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/currentEvent',
    name: 'CurrentEvent',
    component: CurrentEvent,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/performances',
    name: 'Performances',
    component: Performances,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: Organizations,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/eventsCategories',
    name: 'EventsCategories',
    component: EventsCategories,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chosenEvents',
    name: 'ChosenEvents',
    component: ChosenEvents,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chosenPerformances',
    name: 'ChosenPerformances',
    component: ChosenPerformances,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/privateEventAccept',
    name: 'PrivatEventAccept',
    component: PrivateEventAccept,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next)=>{
  // var currentUser = '';
  // console.log(currentUser)
  // requests.checkAuthorization().then(data=>{
    // var currentUser = data // currentUser = true/false
    // console.log('cur user ', currentUser)
    
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
    // if (requiresAuth && !currentUser){ next('login'); console.log('NOOO')} 
    // else if (!requiresAuth && currentUser) {next('home'); console.log('welcome Home')}
    // else {next(); console.log('here')}
    console.log('router index', requiresAuth && ( localStorage.hash == undefined))

    if (requiresAuth && (localStorage.hash == '' || localStorage.hash == undefined)){ next('login'); console.log('NOOO')} 
    else if (!requiresAuth && localStorage.hash == undefined) {next('home'); console.log('welcome Home')}
    else {next(); console.log('here')}
    
  // })
})

//Сделать checkAuthorization() глобальной функцией и App.vue при монтировании запускать ее, и из расчета возвращаемого (true/false) отображать или нет sidebar
// function checkAuthorization(){
//   console.log('cookie', localStorage.hash)
//   return new Promise(function(resolve, reject){
//     fetch('/api/auth', {
//       credentials: 'same-origin',  // параметр определяющий передвать ли разные сессионные данные вместе с запросом
//         method: 'POST',              // метод POST 
//         // body: JSON.stringify(),  // типа запрашиаемого документа
//         headers: new Headers({
//           'Content-Type': 'application/json',
//           'Authorization': localStorage.hash
//         })
//     }).then(res=>{
//       var data = res.json()
//       return data
//     }).then(data=>{
//       // this.$root.isAuth = data.isLog
//       resolve(data.isLog) 
      
//       // this.isLog = true
//     }).catch(error=>{
//       reject(error)
//     })
//   })
// }

export default router
