import Stroke from "./stroke";

export default class Dot {
    static make(typ, size, color, opacity, c) {
        let stroke = new Stroke(typ, size, color, opacity);
        let r = size / 8;

        let
            cx = c.x,
            cy = c.y,
            cxr = cx + r,
            cyr = cy + r,
            cxe = cx - r,
            cye = cy - r;

        let paths = [
            c,
            { x: cx, y: cyr }, //line straight down from the radius
            { x: cx + (r / 2), y: cy + (r / 2)},
            { x: cxr, y: cy},
            { x: cx + (r / 2), y: cy - (r / 2)},
            { x: cx, y: cye},
            { x: cx - (r / 2), y: cy - (r / 2)},
            { x: cxe, y: cy},
            { x: cx - (r / 2), y: cy + (r / 2)},
            { x: cx, y: cyr}, //back to start
        ];

        for (let i of paths)
            stroke.add(i);

        stroke.draw();
        stroke.end();

        return stroke;
    }
}