import * as Vue from 'vue';

let listeners = {};

export default new Vue.reactive({
    async emit(e, v) {
        if (!listeners[e]) listeners[e] = [];
        for (let i of listeners[e])
            i(v);
    },
    async listen(e, f) {
        if (!listeners[e]) listeners[e] = [f];
        else listeners[e].push(f);
    },
});