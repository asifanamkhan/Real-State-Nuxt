export const state = () => ({
  frontend_data: {},
  logo: '',
  areas: '',
  banner: '',
  footer_logo: '',
  property_types: '',
  divisions: '',
  properties: '',
  worksWidgets: ''
})
export const actions = {
  getData({commit}, data) {
    commit('storeAreas', data.areas);
    commit('storeData', data.frontendData);
    commit('storeTypes', data.propertyTypes);
    commit('storeDivisions', data.divisions);
    commit('storeProperties', data.properties);
    commit('storeWorksWidgets', data.worksWidgets);
  }
}
export const mutations = {
  storeData(state, data) {
    state.frontend_data = data;
    state.banner = data.media[0].original_url;
    state.logo = data.media[1].original_url;
    state.footer_logo = data.media[2].original_url;
  },
  storeAreas(state, data) {
    state.areas = data;
  },
  storeTypes(state, data) {
    state.property_types = data;
  },
  storeDivisions(state, data) {
    state.divisions = data;
  },
  storeProperties(state, data) {
    state.properties = data;
  },
  storeWorksWidgets(state, data) {
    state.worksWidgets = data;
  },
}
export const getters = {
  getFrontend(state) {
    return state.frontend_data;
  },
  getLogo(state) {
    return state.logo;
  },
  getBanner(state) {
    return state.banner;
  },
  getFooterLogo(state) {
    return state.footer_logo;
  },
  getAreas(state) {
    return state.areas;
  },
  getTypes(state) {
    return state.property_types;
  },
  getDivisions(state) {
    return state.divisions;
  },
  getProperties(state) {
    return state.properties;
  },
  getWorksWidgets(state) {
    return state.worksWidgets;
  },
}

export const strict = false;
