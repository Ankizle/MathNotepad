import * as Vue from 'vue';

let listeners = {};

export default new Vue.reactive({
    emit(e, v) {
        if (!listeners[e]) listeners[e] = [];
        for (let i of listeners[e])
            i(v);
    },
    listen(e, f) {
        if (!listeners[e]) listeners[e] = [f];
        else listeners[e].push(f);
    },
});