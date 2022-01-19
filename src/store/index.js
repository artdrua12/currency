import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currency: [],
    allCurrency: ["all"],
    message: { color: 'info', text: 'default', run: false }
  },
  getters: {
    get: state => type => {
      return state[type]
    },
    currency: state => {
      return state.currency
    },
    allCurrency: state => {
      return state.allCurrency
    }
  },
  mutations: {
    set(state, obj) {
      state[obj.name] = obj.value;
    },
    setMessage(state, obj) {
      Vue.set(state, 'message', obj);
    },
    setArray(state, payload) {
      state.currency = [...state.currency, payload];
      console.log('s', state.currency);
    }
  },
  actions: {
    async getAllCurrency({ dispatch, commit }) {
      try {
        const response = await fetch(
          `https://www.nbrb.by/api/exrates/rates?periodicity=0`
        );
        const res = await response.json();
        commit('set', { name: 'allCurrency', value: res });
        commit('setMessage', { color: 'green', text: 'Данные валют успешно загружены', run: true });
        dispatch('initArray');
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка запроса валют', run: true });
      }
    },
    initArray({ commit }) {
      // const initAbbreviation = ['USD', 'EUR'];
      console.log(this.state);
      commit('set', { name: 'currency', value: "d" });
    }

  }
})
