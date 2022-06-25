import * as Vue from "vue";

export default new Vue.reactive({
    size: {
        pen: 6,
        highlight: 30,
        erase: 10,
    },
    color: {
        pen: "black",
        highlight: "#ded420", //lol
    },
});