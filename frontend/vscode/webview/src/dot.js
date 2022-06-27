import state from "./state";

export default class Dot {
    constructor(size, color, opacity, c) {
        this.size = size;
        this.color = color;
        this.opacity = opacity
        this.paths = [];

        console.log("SSS");

        this.circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.circle.setAttributeNS(null, "cx", c.x);
        this.circle.setAttributeNS(null, "cy", c.y);
        this.circle.setAttributeNS(null, "r", this.size / 1.5);
        this.circle.setAttributeNS(null, "fill", this.color);
        this.circle.style = `opacity:${opacity}`;
        state.maincvs.appendChild(this.circle);
    }
}