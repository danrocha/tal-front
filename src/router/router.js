import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import Home from '../views/Home.vue';
import { AuthGuard } from './auth-guard';

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
      path: '/admin',
      component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "AdminHome"*/ '../components/AdminHome.vue'),
        },
        {
          path: 'cities',
          component: () =>
            import(/* webpackChunkName: "AdminCities"*/ '../components/AdminCities.vue'),
        },
        {
          path: 'offices',
          component: () =>
            import(/* webpackChunkName: "AdminOffices"*/ '../components/AdminOffices.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
      children: [
        {
          path: '',
          redirect: 'favorites',
        },
        {
          path: 'favorites',
          component: () =>
            import(/* webpackChunkName: "DashboardFavorites" */ '../components/DashboardFavorites.vue'),
        },
        {
          path: 'settings',
          component: () =>
            import(/* webpackChunkName: "DashboardSettings" */ '../components/DashboardSettings.vue'),
        },
      ],
    },
    {
      path: '/add',
      beforeEnter: AuthGuard,
      component: () => import(/* webpackChunkName: "AddOffice" */ '../views/AddOffice.vue'),
      children: [
        {
          path: '',
          component: () =>
            import(/* webpackChunkName: "AddOfficeHome" */ '../components/AddOfficeHome.vue'),
        },
        {
          path: 'finalize',
          props: true,
          component: () =>
            import(/* webpackChunkName: "AddOfficeHome" */ '../components/AddOfficeFinalize.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      props: true,
      component: () => import(/* webpackChunkName: "Auth" */ '../views/Auth.vue'),
    },
    {
      path: '/auth/callback',
      name: 'authCallback',
      props: true,
      component: () => import(/* webpackChunkName: "AuthCallback" */ '../views/AuthCallback.vue'),
    },

    {
      path: '/:country_iso/:city_name',
      name: 'city',
      props: true,
      component: () => import(/* webpackChunkName: "City" */ '../views/City.vue'),
    },
    {
      path: '/:country_iso/:city_name/:location_id/:office_name',
      props: true,
      component: () => import(/* webpackChunkName: "OfficeDetails" */ '../views/OfficeDetails.vue'),
      children: [
        {
          path: 'edit',
          props: { edit: true },
          beforeEnter: AuthGuard,
          component: () =>
            import(/* webpackChunkName: "OfficeDetails" */ '../views/OfficeDetails.vue'),
        },
      ],
    },

    {
      path: '/about',
      name: 'about',
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

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
