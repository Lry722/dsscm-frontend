import { createStore } from 'vuex'
import vueCookies from 'vue-cookies'

const store = createStore({
  state () {
    return {
      logged: vueCookies.isKey('token'),
      userId: vueCookies.get('userId'),
    }
  },
  mutations: {
    login (state) {
      state.logged = true
      state.userId = vueCookies.get('userId')
    },
    logout (state) {
      state.logged = false
      state.userId = null
    }
  }
})

export default store