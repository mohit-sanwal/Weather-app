import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Api from "./Api";
import VueTouch from 'vue-touch';

Vue.use(VueTouch);

Vue.config.productionTip = false;

Api.init();


let filesLoaded = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

require("./assets/scss/style.scss");

function updateOnlineStatus() {
  if (navigator.onLine) {
    document.body.classList.remove("ofl");
  } else {
    document.body.classList.add("ofl");
  }
  const condition = navigator.onLine ? "online" : "offline";
  window.showToast(`You are ${condition}`, 2000);
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
