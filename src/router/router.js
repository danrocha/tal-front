import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import AuthGuard from './auth-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/map',
      name: 'home-map',
      component: () => import(/* webpackChunkName: "HomeMap" */ '../views/HomeMap.vue'),
    },
    {
      path: '/:country_iso/:city_name',
      name: 'city',
      props: true,
      component: () => import(/* webpackChunkName: "City" */ '../views/City.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "About" */ '../views/About.vue'),
    },
    {
      path: '/tos',
      name: 'tos',
      component: () => import(/* webpackChunkName: "ToS" */ '../views/ToS.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import(/* webpackChunkName: "Privacy" */ '../views/Privacy.vue'),
    },
    {
      path: '/add',
      name: 'add-office',
      beforeEnter: AuthGuard,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "AddOffice" */ '../views/AddOffice.vue'),
    },
    {
      path: '/dashboard',
      redirect: { name: 'favorites' },
    },
    {
      path: '/dashboard/favorites',
      name: 'favorites',
      props: { section: 'favorites' },
      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    },
    {
      path: '/dashboard/settings',
      name: 'settings',
      props: { section: 'settings' },

      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    },

    {
      path: '/auth',
      name: 'auth',
      props: true,
      component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue'),
    },
    {
      path: '/:country_iso',
      name: 'home_country',
      component: Home,
    },
    {
      path: '/:country_iso/:city_name',
      name: 'home_country_city',
      component: Home,
    },
    {
      path: '/:country_iso/:city_name/:location_id/:office_name',
      name: 'office_details',
      props: true,
      component: () => import(/* webpackChunkName: "OfficeDetails" */ '../views/OfficeDetails.vue'),
    },
    {
      path: '/:country_iso/:city_name/:location_id/:office_name/edit',
      name: 'office_details_edit',
      props: true,
      beforeEnter: AuthGuard,
      component: () =>
        import(/* webpackChunkName: "OfficeDetailsEdit" */ '../views/OfficeDetailsEdit.vue'),
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: () => import(/* webpackChunkName: "NetworkIssue" */ '../views/NetworkIssue.vue'),
    },
    {
      path: '/404',
      name: '404',
      props: true,
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } },
    },
  ],
});

export default router;
