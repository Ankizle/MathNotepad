const vscode = require("vscode");
const ffi = require("ffi-napi");
const path = require("path");
const ref = require("ref-napi");

const backend = ffi.Library(path.join(__dirname, "libmntb.so"), {
    "NewDocument": [ref.refType("void"), ["string"]],
    "OpenDocument": [ref.refType("void"), ["string"]],
});

module.exports.activate = ctx => {
    vscode.workspace.onDidOpenTextDocument(f => {
            if (path.extname(f.fileName) == ".mntb") {
            //user opened a mathnotebook file
            let document = backend.OpenDocument(f.fileName);
        }
    });
}