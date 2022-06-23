import * as path from "path";

const ffi = require("ffi-napi");
const ref = require("ref-napi");

export let voip = ref.refType("void"); //void pointer shorthand

export default ffi.Library(path.join(__dirname, "libmntb.so"), {
    "NewNotebook": [voip, ["string"]],
    "OpenNotebook": [voip, ["string"]],
    "CloseNotebook": ["void", [voip]],
    "NewPosition": [voip, ["double", "double"]],
    "NewTextBox": [voip, [voip]],
});