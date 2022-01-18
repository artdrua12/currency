import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currency: ["1", '2'],
  },
  getters: {
    get: state => {
      return state.cyrrency
    }
  },
  mutations: {
    setCurrency(state, payload) {
      state.currency = payload
    },

    set(state, obj) {
      state.cyrrency = obj;
    },

    setTabs(state, obj) {
      const dublicate = state.tabs.findIndex(item => item.login == obj.login);
      if (dublicate == -1) {
        state.tabs.push(obj);
        Vue.set(state, 'tab', state.tabs.length)
      } else {
        Vue.set(state, 'tab', dublicate + 1);
      }
    },

    setRepositories(state, obj) {
      Vue.set(state.repositories, obj.name, obj.value)
    },

    setTab(state, value) {
      Vue.set(state, 'tab', value)
    },
    deleteTabs(state, i) {
      state.tabs.splice(i, 1);
    },

    setFavorite(state, obj) {
      state.favorites.push(obj);
      state.message = { color: 'success', text: 'Добавлено в избранное', run: true }
    },
    deleteFavorite(state, obj) {
      const i = state.favorites.findIndex(item => item.id == obj.id);
      Vue.delete(state.favorites, i);
    },

    setMessage(state, obj) {
      Vue.set(state, 'message', obj);
    }
  },
  actions: {
    async getCurrency({ commit }) {
      try {
        const response = await fetch(
          `https://www.nbrb.by/api/exrates/rates?periodicity=0`
        );
        const res = await response.json();
        commit('setCurrency', res);
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка запроса', run: true });
      }
    },

    async search({ commit }, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${obj.users}&per_page=${obj.visible}&page=${obj.page}`
        );
        const res = await response.json();
        commit('set', { name: 'searchUsers', value: res });
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка запроса', run: true });
      }
    },

    async searchRepositories({ commit }, user) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${user}/repos`
        );
        const res = await response.json();
        commit('setRepositories', { name: 'repositories', value: res });
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка запроса', run: true });
      }
    },

    async getFork({ commit }, obj) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${obj.owner.login}/${obj.name}/forks`
        );
        const res = await response.json();
        commit('set', { name: 'forks', value: res });
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка запроса', run: true });
      }
    },

    async addFavorites({ commit, state }, obj) {
      const dublicate = state.favorites.findIndex(item => item.id == obj.id);
      if (dublicate == -1) {
        commit('setFavorite', obj);
        try {
          true
        } catch (e) {
          commit('setMessage', { color: 'error', text: 'Ошибка записи в FireBase', run: true });
          commit('deleteFavorite', obj); // если ошибка записи в FireBase
        }
      } else {
        commit('setMessage', { color: 'info', text: 'Fork уже добавлен', run: true });
      }
    },
    async getFireBase({ commit, state }) {
      let forksData = null;
      try {
        true
      } catch {
        commit('setMessage', { color: 'error', text: 'Ошибка чтения из FireBase', run: true });
      }
      if (forksData == null) return

      Object.keys(forksData).forEach(key => {
        const item = forksData[key];
        state.favorites.push({ ...item, 'fbKey': key });
      })
    },
    async deleteFavorite({ commit }, obj) {
      try {
        commit('deleteFavorite', obj);
      } catch (e) {
        commit('setMessage', { color: 'error', text: 'Ошибка доступа к FireBase', run: true });
      }
    }
  }
})
