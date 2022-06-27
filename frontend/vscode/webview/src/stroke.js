import file from "./file";
import state from "./state";

export default class Stroke {
    constructor(size, color, opacity) {
        this.size = size;
        this.color = color;
        this.opacity = opacity
        this.paths = [];

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.style = `opacity:${opacity}`;
        state.maincvs.appendChild(this.svg);
    }

    setpath(path) {
        path.setAttributeNS(null, "stroke-width", this.size);
        path.setAttributeNS(null, "stroke", this.color);
        path.setAttributeNS(null, "stroke-linecap", "round");
        path.setAttributeNS(null, "stroke-linejoin", "round");
    }

    mid(a, b) {
        return {
            x: a.x + (b.x - a.x) / 2,
            y: a.y + (b.y - a.y) / 2,
        };
    }

    draw(c) {
        if (this.paths.length <= 1) return;

        let p = this.paths.at(-1);
        let midp = this.mid(p, c);

        //TODO get velocity and make the midpoint the intersection of the line perpendicular at the midpoint and the span of the velocity

        //for debugging
        let ce = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let pe = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let me = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        for (let o of [[c, ce, "blue"], [p, pe, "red"], [midp, me, "green"]]) {
            //cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" 
            let i = o[1];
            i.setAttributeNS(null, "cx", o[0].x);
            i.setAttributeNS(null, "cy", o[0].y);
            i.setAttributeNS(null, "r", "2");
            i.setAttributeNS(null, "stroke", o[2]);
            i.setAttributeNS(null, "stroke-width", "3");
            i.setAttributeNS(null, "fill", "red");
            this.svg.appendChild(i);
        }
        //////////////////

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", `M${p.x} ${p.y} Q${midp.x} ${midp.y} ${c.x} ${c.y}`);
        this.setpath(path);
        this.svg.appendChild(path);
    }

    erase() {
        this.svg.remove();
    }

    end() {
        file.strokes.push(this);
    }

    add(c) {
        this.draw(c);
        this.paths.push(c);
    }

}
