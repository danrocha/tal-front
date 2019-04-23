import store from '../store/store';

export const AuthGuard = (to, from, next) => {
  if (store.state.user.user) {
    //console.log('user found, next...');
    next();
  } else {
    next({
      name: 'auth',
      query: { redirect: to.fullPath },
      params: { to, message: 'You need to login to perform this action.' },
    });
  }
};

export const AdminGuard = (to, from, next) => {
  next();
};
