import * as vscode from "vscode"
import backend from "./backend";
import { NotebookDoc } from "./notebookdoc";

const viewtype = "mntb.notebook";

export class Editor implements vscode.CustomEditorProvider<NotebookDoc> {

    public ctx: vscode.ExtensionContext;
    public ntbdoc: any; //notebook document

    constructor(ctx: vscode.ExtensionContext) {
        this.ctx = ctx;
    }

    readonly onDidChangeCustomDocument: any;

    saveCustomDocument(document: NotebookDoc, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    saveCustomDocumentAs(document: NotebookDoc, destination: vscode.Uri, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    revertCustomDocument(document: NotebookDoc, cancellation: vscode.CancellationToken): Thenable<void> {
        throw new Error("Method not implemented.");
    }
    backupCustomDocument(document: NotebookDoc, context: vscode.CustomDocumentBackupContext, cancellation: vscode.CancellationToken): Thenable<vscode.CustomDocumentBackup> {
        throw new Error("Method not implemented.");
    }

    register() {
		return vscode.window.registerCustomEditorProvider(viewtype, this);
    }

    openCustomDocument(uri: vscode.Uri, octx: { backupId?: string }, cancel: vscode.CancellationToken) {
        this.ntbdoc = backend.OpenNotebook(uri.path); //open the document with the backend
        return new NotebookDoc(this, uri);
    }

    resolveCustomEditor(document: NotebookDoc, wv: vscode.WebviewPanel, cancel: vscode.CancellationToken) {
        wv.webview.options = {
			enableScripts: true,
		};
        wv.webview.html = this.getHtml(wv.webview);

        wv.webview.onDidReceiveMessage(this.onMessage);
    }

    private getHtml(wv: vscode.Webview) {

        const script = wv.asWebviewUri( 
            vscode.Uri.joinPath(this.ctx.extensionUri, "dist-webview", "js/app.js")
        );
        
        const vendor = wv.asWebviewUri(
            vscode.Uri.joinPath(this.ctx.extensionUri, "dist-webview", "js/chunk-vendors.js")
        );

        const styles = wv.asWebviewUri(
            vscode.Uri.joinPath(this.ctx.extensionUri, "dist-webview", "css/app.css")
        );

        const baseUri = wv.asWebviewUri(vscode.Uri.joinPath(
            this.ctx.extensionUri, 'dist-webview')
        ).toString().replace('%22', '');

        return `      
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, 
                    initial-scale=1" />
                <link href="${styles}" rel="stylesheet">
                <title>Notebook</title>
            </head>
            <body style="margin: 0;">
                <input hidden data-uri="${baseUri}">
                <div id="app"></div>
                <script type="text/javascript"
                    src="${vendor}"></script>  
                <script type="text/javascript"
                    src="${script}"></script>
            </body>
            </html> 
        `;  
    }

    private onMessage(e: any) {
        switch (e.command) {
            case "save":
                console.log(e.text);
                break;
        }
	}

}