import state from "./state";

export default function stroke(c, p) {

    let ctx = state.ctx;

    if (state.active_toolkit == "Highlight") ctx = state.ctxh;

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(c.x, c.y);
    ctx.stroke();
}