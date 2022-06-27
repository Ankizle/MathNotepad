import * as Vue from "vue";

export default new Vue.reactive({
    size: {
        pen: 4,
        highlight: 30,
        erase: 10,
    },
    color: {
        pen: "black",
        highlight: "rgb(255, 234, 0)",
    },
    opacity: {
        pen: 1,
        highlight: 0.3,
    },
});