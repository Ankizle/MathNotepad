import * as Vue from 'vue';

export default Vue.reactive({
    pen: {
        size: 6,
        color: "black",
        strokes: [],
    },
    highlighter: {
        size: 20,
        color: [12, 155, 102],
        strokes: [],
    },
});