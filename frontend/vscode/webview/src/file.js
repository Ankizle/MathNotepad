import onchange from "on-change"
import state from "./state"

export default onchange({
    strokes: [],
    textboxes: [],
}, function() {
    state.vscode.postMessage({
        command: "save",
        text: JSON.stringify(this),
    });
})