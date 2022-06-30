import { debug } from "console";
import * as vscode from "vscode";
import { NotebookDoc } from "./notebookdoc";
import * as fs from "fs";

const viewtype = "mntb.notebook";
let uri: any;

export class Editor implements vscode.CustomEditorProvider<NotebookDoc> {

    public ctx: vscode.ExtensionContext;

    constructor(ctx: vscode.ExtensionContext, ) {
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

    openCustomDocument(uriv: vscode.Uri, octx: { backupId?: string }, cancel: vscode.CancellationToken) {
        uri = uriv;
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
                <input id="baseuri" hidden data-uri="${baseUri}">
                <input id="toload" hidden data-uri="${encodeURIComponent(fs.readFileSync(uri.path).toString())}">
                <div id="app"></div>
                <script type="text/javascript"
                    src="${vendor}"></script>  
                <script type="text/javascript"
                    src="${script}"></script>
            </body>
            </html>
        `;  
    }

    onMessage(e: any) {
        switch (e.command) {
            case "save":
                let urip = uri.path;
                fs.writeFileSync(urip, e.text);
                break;
        }
	}

}