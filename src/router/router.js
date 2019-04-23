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
      path: '/add',
      name: 'add-office',
      beforeEnter: AuthGuard,
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
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "Admin" */ '../views/Admin.vue'),
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
