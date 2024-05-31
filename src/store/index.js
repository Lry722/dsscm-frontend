import { createStore } from "vuex";
import vueCookies from "vue-cookies";

const store = createStore({
  state() {
    return {
      logged: vueCookies.isKey("token"),
      userId: vueCookies.get("userId"),
      userName: vueCookies.get("userName"),
    };
  },
  mutations: {
    login(state) {
      state.userId = vueCookies.get("userId");
      state.userName = vueCookies.get("userName");
      state.logged = true;
    },
    logout(state) {
        vueCookies.remove("token");
        state.logged = false;
        state.userId = null;
    },
  },
});

export default store;
