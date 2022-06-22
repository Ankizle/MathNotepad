import * as Vue from "vue"
import App from "./App.vue"
import ExtractBaseUri from "./mixins/ExtractBaseUri"

Vue.mixin(ExtractBaseUri);
Vue.createApp(App).mount("#app")
