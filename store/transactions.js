export const state = () => ({
  deed: {}
})

export const actions = {
  deedInfo({commit}, data) {
    commit('getDeedInfo', data);
  }
}

export const mutations = {
  getDeedInfo(state, data) {
    state.deed = data;
  }
}

export const getters = {
  getDeedInfo(state) {
    return state.deed;
  }
}
export const strict = false;
