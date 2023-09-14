export const state = () => ({
  printableData: {
    reports: {},
    total_revenue: '',
    total_expanse: '',
    current_amount: ''
  }
})

export const actions = {
  printableData({ commit }, data) {
    commit('setPrintableData', data);
  }
}

export const mutations = {
  setPrintableData(state, data) {
    state.printableData.reports = data.reports
    state.printableData.total_revenue = data.total_revenue
    state.printableData.total_expanse = data.total_expanse
    state.printableData.current_amount = data.current_amount
  }
}

export const getters = {
  getPrintableData(state) {
    return state.printableData;
  }
}

export const strict = false;
