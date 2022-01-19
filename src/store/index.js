import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currency: [],
    allCurrency: [],
    message: { color: 'info', text: 'default', run: false }
  },
  getters: {
    get: state => type => {
      return state[type]
    }
  },
  mutations: {
    set(state, obj) {
      state[obj.name] = obj.value;
    }
  },
  actions: {
    async getAllCurrency({ commit }) {
      try {
        const response = await fetch(
          `https://www.nbrb.by/api/exrates/rates?periodicity=0`
        );
        const res = await response.json();
        commit('set', { name: 'allCurrency', value: res });
        commit('set', { name: 'message', value: { color: 'green', text: 'Данные валют успешно загружены', run: true } });
      } catch (e) {
        commit('set', { name: 'message', value: { color: 'error', text: 'Ошибка запроса валют', run: true } });
      }
    },
    isDublicate({ commit, state }, findItem) {
      const dublicate = state.currency.find(item => item == findItem);

      if (dublicate) {
        commit('set', { name: 'message', value: { color: 'orange', text: 'Валюта уже добавлена', run: true } });
      } else {
        const updateArrayCurrency = [...state.currency, findItem];
        commit('set', { name: 'currency', value: updateArrayCurrency });
      }
    },
  }
})
