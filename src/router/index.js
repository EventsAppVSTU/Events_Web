import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Events',
    component: Events
  },
  {
    path: '/event-news',
    name: 'EventNews',
    component: EventNews
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: CreateNews
  },
  {
    path: '/createEvent',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/currentEvent',
    name: 'CurrentEvent',
    component: CurrentEvent
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/performances',
    name: 'Performances',
    component: Performances
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/organizations',
    name: 'Organizations',
    component: Organizations
  },
  {
    path: '/eventsCategories',
    name: 'EventsCategories',
    component: EventsCategories
  },
  {
    path: '/chosenEvents',
    name: 'ChosenEvents',
    component: ChosenEvents
  },
  {
    path: '/chosenPerformances',
    name: 'ChosenPerformances',
    component: ChosenPerformances
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
  routes
})

export default router
