import * as Vue from "vue"
import App from "./App.vue"
import VDragged from 'v-dragged'

const app = Vue.createApp(App);
app.use(VDragged);
app.mount("#app");
