import { componentType, componentProperty } from "../../const/componentType";
import { deepCopy } from '../../utils/lib';

const _headerNav = componentProperty.filter(item => componentType.HEADER_NAV == item.value)[0];
const _footerNav = componentProperty.filter(item => componentType.FOOTER_NAV == item.value)[0];

export default {
  namespaced: true,
  state: {
    currentComType: '', // 当前选中的组件
    selectedIndex: '-1', // 当前选中的组件 index
    templateInfo: {
      headerNav: deepCopy(_headerNav),
      pageLayout: [
      ],
      footerNav: deepCopy(_footerNav),
    }
  },
  mutations: {
    UPDATE_TEMPLATE_INFO(state, val) {
      state.templateInfo = val
      console.log('=========templateInfo=========', val);
    },
    UPDATE_CURRENT_COM(state, val) {
      state.currentComType = val
      console.log('=========currentComType=========', val);
    },
    UPDATE_SELECTED_INDEX(state, val) {
      state.selectedIndex = val
      console.log('=========selectedIndex=========', val);
    },
  },
  actions: {
    updateTemplateInfo({ commit }, val) {
      commit('UPDATE_TEMPLATE_INFO', val)
    },
    updateCurrentComType({ commit }, val) {
      commit('UPDATE_CURRENT_COM', val)
    },
    updateSelectedIndex({ commit }, val) {
      commit('UPDATE_SELECTED_INDEX', val)
    },
  },
}