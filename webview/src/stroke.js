import events from "./events";
import file from "./file";
import state from "./state";
import * as intersect from "path-intersection";

export default class Stroke {

    static tension = 1;

    constructor(typ, size, color, opacity, dasharray) {
        this.typ = typ;
        this.size = size;
        this.color = color;
        this.opacity = opacity
        this.dasharray = dasharray
        this.paths = [];

        this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Stroke.setpath(this, this.path);
        this.path.style = `opacity:${opacity}`;
        state.maincvs.appendChild(this.path);

        events.listen("erase", eraser => {
            if (typ == "erase" || this.erased) return; //we don't want to erase the eraser
            if (intersect(eraser.fit(), this.fit()).length != 0)
                events.emit("toerase", this);
        });
    }

    static setpath(elem, path) {
        path.setAttributeNS(null, "stroke-width", elem.size);
        path.setAttributeNS(null, "stroke", elem.color);
        path.setAttributeNS(null, "stroke-linecap", "round");
        path.setAttributeNS(null, "stroke-linejoin", "round");
        path.setAttributeNS(null, "stroke-dasharray", elem.dasharray ? elem.dasharray.join(",") : "1");
    }

    changeopacity(f) {
        let newop = f(this.opacity);
        this.opacity = newop;
        this.path.style = `opacity:${this.opacity};`
    }

    mid(a, b) {
        return {
            x: a.x + (b.x - a.x) / 2,
            y: a.y + (b.y - a.y) / 2,
        };
    }

    //taken and modified from here
    //https://codepen.io/osublake/pen/BowJed?editors=0010
    fit() {
        let path = `M${this.paths[0].x},${this.paths[0].y}`;

        for (let i = 0; i < this.paths.length - 1; i++) {
            let p = i == 0 ? this.paths[i] : this.paths[i - 1];
            let c = this.paths[i];
            let n = this.paths[i + 1];
            let f = i >= this.paths.length - 2 ? n : this.paths[i + 2];
            
            let cp1 = {
                x: c.x + (n.x - p.x) / 6 * Stroke.tension,
                y: c.y + (n.y - p.y) / 6 * Stroke.tension,
            };

            let cp2 = {
                x: n.x - (f.x - c.x) / 6 * Stroke.tension,
                y: n.y - (f.y - c.y) / 6 * Stroke.tension,
            };
         
            path += "C" + [cp1.x, cp1.y, cp2.x, cp2.y, n.x, n.y].join(",");
        }

        return path;
    }

    async draw() {
        if (this.paths.length <= 1) return;
        this.path.setAttributeNS(null, "d", this.fit()
            + (this.doConnect ? 
            `L${this.paths.at(-1).x},${this.paths.at(-1).y},${this.paths[0].x},${this.paths[1].y}` : "")
        );
    }

    getd() {
        return this.path.getAttributeNS(null, "d");
    }

    parsed() {
        this.path.removeAttribute("transform");

        let d = this.getd();

        //list all coordinates used
        let coords = d.match(
            /((\d+(\.?)\d+),(\d+(\.?)\d+)(?=,))|((?<=,)(\d+(\.?)\d+),(\d+(\.?)\d+))|((?<!,)(\d+(\.?)\d+),(\d+(\.?)\d+)(?!,))/g
        );

        let coordsm = coords.map(v => v.split(",").map(parseFloat)).map(v => {
            return {
                x: v[0],
                y: v[1],
            };
        });

        this.paths = coordsm;
    }

    transform(x, y) {
        this.path.removeAttribute("transform");
        this.paths = this.paths.map(v => {
            return {
                x: v.x + x,
                y: v.y + y,
            };
        });
        this.draw();
    }

    connect() {
        this.doConnect = true;
        this.draw();
    }

    erase() {
        this.path.remove();
        this.erased = true;
        file.strokes[this.strokeidx] = null;
    }

    pushto() {
        this.strokeidx = file.strokes.push(this) - 1;
    }

    end() {
        this.draw();
        this.pushto();
    }

    add(c) {
        this.draw();
        this.paths.push(c);
    }

    encode() {
        return {
            typ: this.typ,
            size: this.size,
            color: this.color,
            opacity: this.opacity,
            path: this.path.getAttributeNS(null, "d"),
        };
    }

    //determine if a line segment (with width) overlaps with the stroke
    intersects(p1, p2, w) {
        p1, p2, w;
    }

    static load(data) {
        let stroke = new Stroke(data.typ, data.size, data.color, data.opacity);
        stroke.path.setAttributeNS(null, "d", data.path);
        stroke.parsed();
        stroke.fit();
        stroke.pushto();
        return stroke;
    }

}
