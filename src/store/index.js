import Vue from 'vue'
import Vuex from 'vuex'

import product from './product/index';
import cart from './cart/index';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    cart,
  },
  state: {
    header_user_info: 'Login',
    user_info: [ // 로그인 정보 저장 위치
      {
        name: null,
        id: null,
        token: null,
      },
    ]
  },
  mutations: {
    // login start
    user_login_N(state, user_name) {
      state.user_info[0].name = user_name;
      state.header_user_info = user_name;
      console.log(state.user_info[0].name);
    },
    user_login_I(state, user_id) {
      state.user_info[0].id = user_id;
      console.log(state.user_info[0].id);
    },
    user_login_T(state, user_token) {
      state.user_info[0].token = user_token;
      console.log(state.user_info[0].token);
    },
    // login end
  },
  actions: {
    // login start
    user_login_N(context, user_name) {
      context.commit('user_login_N', user_name);
    },
    user_login_I(context, user_id) {
      context.commit('user_login_I', user_id);
    },
    user_login_T(context, user_token) {
      context.commit('user_login_T', user_token);
    },
    // login end
  },
})
