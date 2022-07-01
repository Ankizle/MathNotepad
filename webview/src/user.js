import * as Vue from "vue";

export default new Vue.reactive({
    size: {
        pen: 4,
        highlight: 30,
        erase: 20,
        graph: 15,
    },
    color: {
        pen: "#000000",
        highlight: "#ffea00",
    },
    opacity: {
        pen: 1,
        highlight: 0.3,
    },
    eraseop: .5, //what to multiply opacity by to get the (partially) erased version
    fontsize: 12,
    holdthresh: 300,
});