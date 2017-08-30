import Login from '@/views/account/Login';

import TT from 'src/views/ro/TT.vue';
import Leng from 'src/views/Leng.vue';
import Xu from 'src/views/leng/Xu.vue';
import Bo from 'src/views/leng/Bo.vue';
import Sun from 'src/views/ro/Sun.vue';
const loginRoutes = {
  path: '/login',
  name: 'login',
  component: Login
};

export default [loginRoutes];