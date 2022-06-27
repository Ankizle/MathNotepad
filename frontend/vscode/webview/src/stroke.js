import events from "./events";
import file from "./file";
import state from "./state";
import * as intersect from "path-intersection";

export default class Stroke {

    static tension = 1;

    constructor(typ, size, color, opacity) {
        this.typ = typ;
        this.size = size;
        this.color = color;
        this.opacity = opacity
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

    static setpath(elem, path, size, color) {
        path.setAttributeNS(null, "stroke-width", size ?? elem.size);
        path.setAttributeNS(null, "stroke", color ?? elem.color);
        path.setAttributeNS(null, "stroke-linecap", "round");
        path.setAttributeNS(null, "stroke-linejoin", "round");
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
        this.path.setAttributeNS(null, "d", this.fit());
    }

    erase() {
        this.path.remove();
        this.erased = true;
        file.strokes[this.strokeeidx] = null;
    }

    end() {
        this.draw();
        this.strokeidx = file.strokes.push(this);
    }

    add(c) {
        this.draw();
        this.paths.push(c);
    }

}
