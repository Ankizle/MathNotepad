import state from "./state";
import file from "./file";

export default function save() {
    state.vscode.postMessage({
        command: "save",
        text: JSON.stringify(file),
    });
}