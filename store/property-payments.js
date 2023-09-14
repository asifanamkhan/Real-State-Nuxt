export const state = () => ({
  printableData: {}
})

export const actions = {
  printableData({ commit }, data) {
    commit('setPrintableData', data);
  }
}

export const mutations = {
  setPrintableData(state, data) {
    state.printableData = data
  }
}

export const getters = {
  getPrintableData(state) {
    return state.printableData;
  }
}

export const strict = false;
