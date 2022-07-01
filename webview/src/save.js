import state from "./state";
import file from "./file";

export default function save() {
    let encoded = {
        strokes: file.strokes.filter(i => i).map(i => i.encode()),
        textboxes: file.textboxes.filter(i => i).map(i => i.encode()),
    };


    state.vscode.postMessage({
        command: "save",
        text: JSON.stringify(encoded),
    });
}