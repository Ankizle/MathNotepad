import * as vscode from "vscode";
import { Editor } from "./editor";

const ref = require("ref-napi");

export class NotebookDoc implements vscode.CustomDocument {

    public editor: Editor;
    public uri: vscode.Uri;

    constructor(editor: Editor, uri: vscode.Uri) {
        this.editor = editor;
        this.uri = uri;
    }

    dispose(): void {
        //TODO
    }

}