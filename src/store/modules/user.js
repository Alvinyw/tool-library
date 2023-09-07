import { setUserInfo } from "../../utils/session";

export default {
  namespaced: true,
  state: {
    userInfo: {}, // 用户信息
  },
  mutations: {
    UPDATE_USER_INFO(state, val) {
      state.userInfo = val
      setUserInfo(val)
      console.log('=========userInfo=========', val);
    },
  },
  actions: {
    updateUserInfo({ commit }, val) {
      commit('UPDATE_USER_INFO', val)
    },
  },
}