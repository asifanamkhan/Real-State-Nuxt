export const state = () => ({
    search: {},
})

export const mutations = {
  STORE_SEARCH(state, search) {
    state.search = search;
  }
}
export const actions = {
  storeSearch({commit}, search) {
    commit('STORE_SEARCH', search);
  }
}
export const getters = {
  getSearch(state) {
    return state.search;
  }
}

export const strict = false;
