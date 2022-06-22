import * as vscode from "vscode"
import backend from "./backend";
import { VSCDocument } from "./vscdocument";

const viewtype = "mntb.notebook";

export class Editor implements vscode.CustomEditorProvider<VSCDocument> {

    public ctx: vscode.ExtensionContext;
    public ntbdoc: any;

    constructor(ctx: vscode.ExtensionContext) {
        this.ctx = ctx;
    }

    readonly onDidChangeCustomDocument: any;

    saveCustomDocument(document: VSCDocument, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    saveCustomDocumentAs(document: VSCDocument, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    revertCustomDocument(document: VSCDocument, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    backupCustomDocument(document: VSCDocument, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Thenable<vscode.CustomDocumentBackup> {
        throw new Error("Method not implemented.");
    }

    register() {
		return vscode.window.registerCustomEditorProvider(viewtype, this);
    }

    openCustomDocument(uri: vscode.Uri, octx: { backupId?: string }, cancel: vscode.CancellationToken) {
        this.ntbdoc = backend.OpenDocument(uri.path); //open the document with the backend
        return new VSCDocument(this, uri);
    }

    resolveCustomEditor(doc: VSCDocument, wv: vscode.WebviewPanel, cancel: vscode.CancellationToken) {
        console.log(doc);
        wv.webview.options = {
			enableScripts: true,
		};
    }
}