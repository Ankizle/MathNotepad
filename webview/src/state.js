import * as Vue from 'vue';

let vsapi = window["acquireVsCodeApi"]; //get the vscode communication information

export default Vue.reactive({
    active_toolkit: "",
    pan: {
        stroke: [],
    },
    vscode: vsapi ? vsapi() : new class {
        //just to allow testing in browser
        postMessage() {
            Vue.warn("Cannot save in browser");
        }
    },
    strokes: [],
    textboxes: [],
    wrap: null,
});