import store from '../store/store';

export default (to, from, next) => {
  if (store.state.user.user) {
    console.log('user found, next...');
    next();
  } else {
    next({
      name: 'auth',
      query: { redirect: to.fullPath },
      params: { to, message: 'You need to login to perform this action.' },
    });
  }
};
