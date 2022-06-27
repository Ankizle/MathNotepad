import state from "./state";
import Stroke from "./stroke";

export default class Dot {
    constructor(size, color, opacity, c) {
        this.size = size;
        this.radius = this.size / 8;
        this.color = color;
        this.opacity = opacity

        this.c = c;

        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Stroke.setpath(this, this.path);
        this.path.style = `opacity:${opacity}`;
        state.maincvs.appendChild(this.path);

        this.draw();
    }

    changeopacity(f) {
        let newop = f(this.opacity);
        this.opacity = newop;
        this.path.style = `opacity:${this.opacity};`
    }

    make() {

        let
            cx = this.c.x,
            cy = this.c.y,
            cxr = cx + this.radius,
            cyr = cy + this.radius,
            cxe = cx - this.radius,
            cye = cy - this.radius;

        let d = `M${cx},${cy}`;
        d += `L${cx},${cyr}`; //line straight up by the radius
        d += `Q${cxr},${cyr},${cxr},${cy}`;
        d += `Q${cxr},${cye},${cx},${cye}`;
        d += `Q${cxe},${cye},${cxe},${cy}`;
        d += `Q${cxe},${cyr},${cx},${cyr}`;
        d += "Z";
        return d;
    }

    draw() {
        this.path.setAttributeNS(null, "d", this.make());
    }

    svgInf() {
        return this.setpath();
    }

    erase() {
        this.path.remove();
    }
}