import * as Vue from 'vue';

export default Vue.reactive({
    active_toolkit: "",
    mousedown: false,
    pen: {
        size: 6,
        stroke: [],
        strokes: [],
    },
    pan: {},
});