import { createStore } from 'vuex'

export default createStore({
  state: {
    account: "",
    accountId: "",
  },
  getters: {
  },
  mutations: {
    setAccount (state, account) {
      state.account = account
    },
    setAccountId (state, accountId) { // 目前登入者在資料庫裡面的隨機id
      state.accountId = accountId
    },
  },
  actions: {
  },
  modules: {
  }
})
