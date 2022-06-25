export default class Stroke {
    constructor(size, color, ctx) {
        this.size = size;
        this.color = color;
        this.ctx = ctx;
        this.paths = []
    }

    addPath(x, y) {
        this.paths.push({ x, y });
    }

    add(c) {
        let p = this.paths.length == 0 ? c : this.paths.at(-1); //get the previously drawn point

        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(c.x, c.y);
        this.ctx.stroke();
        this.addPath(c.x, c.y);
    }
}
