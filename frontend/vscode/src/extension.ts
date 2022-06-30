import * as vscode from "vscode"
import * as path from "path";
import { Editor } from "./editor";

export function activate(ctx: vscode.ExtensionContext) {
    let editor = new Editor(ctx);
    ctx.subscriptions.push(editor.register());
}
