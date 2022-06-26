import events from "./events";
import Chunk from "./chunk";

export default class Stroke {
    constructor(sto, size, color, ctx) {
        this.sto = sto;
        this.idx = sto.length;
        this.size = size;
        this.color = color;
        this.ctx = ctx;
        this.paths = [];
        this.chunks = new Set();
    }

    dist(c1, c2) {
        return Math.sqrt(
            (c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2
        );
    }

    redraw(chunk) {
        if (this.iserased) return;

        let prev = this.paths[0];
        for (let i of this.paths) {
            if (chunk.has(i.x, i.y))
                this.draw(i, prev);
            prev = i;
        }
    }

    addPath(c, p) {
        this.paths.push(c);
        let touched = Chunk.through(c.x, c.y, this.size, this.ctx);

        for (let i of touched) {
            if (!this.chunks.has(i)) {
                this.chunks.add(i);
                events.listen(`${this.ctx.name} redraw ${i}`, () => this.redraw(i));
            }

            events.listen(`erase ${i}`, v => {
                if (this.iserased) return;
    
                /*
                    determine if the circle overlaps with the path's line segment
                    connect center of circle, first endpoint of path, and second endpoint of path
                    find area using heron's formula
                    solve for h in A = (bh)/2
                    check if the height is less than the width
                    (also account for the stroke size by subtracting it from the final height/dist)
                */
    
                let
                    A = this.dist(c, v.coords),
                    B = this.dist(p, v.coords),
                    C = this.dist(c, p),
                    S = (A + B + C) / 2;
                
                let area = Math.sqrt(S * (S - A) * (S - B) * (S - C));
                let dist = 2 * area / C;
    
                if (dist - this.size / 2 < v.size / 2) this.erase();
            });
        }
    }

    erase() {
        if (this.iserased) return; //already being erased
        this.iserased = true;
        this.sto[this.idx] = [];

        for (let i of this.chunks)
            i.clear();
        for (let i of this.chunks)
            events.emit(`${this.ctx.name} redraw ${i}`);
    }

    draw(c, p) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.quadraticCurveTo(p.x - 10, p.y - 10, c.x, c.y);
        this.ctx.stroke();
    }

    add(c, p) {
        this.draw(c, p);
        this.addPath(c, p);
    }
}
