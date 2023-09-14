export const state = () => ({
  printableData: {
    reports: {},
    total_pay_amount: ''
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
    state.printableData.total_pay_amount = data.total_pay
  }
}

export const getters = {
  getPrintableData(state) {
    return state.printableData;
  }
}

export const strict = false;
