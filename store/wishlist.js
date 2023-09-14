export const state = () => ({
  wishlist_count: 0,
})

export const mutations = {
  STORE_WISHLIST(state, data) {
    state.wishlist_count  = data;
  },
  INCREASE_WISHLIST(state, data){
    state.wishlist_count++;
  }
}

export const actions = {
  storeWishlist({commit}, data) {
    commit('STORE_WISHLIST', data);
  },
  increaseWishlist({commit}, data) {
    commit('INCREASE_WISHLIST', data);
  },

}
export const getters = {
  getWishlist(state) {
    return state.wishlist_count;
  },

}
export const strict = false;
