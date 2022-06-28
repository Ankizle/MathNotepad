import state from "./state";
import katex from "katex";
import user from "./user";

//i know this is all so messy, but i'll make this project clean later i promise
export default class TextBox {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.box = document.createElement("div");
        this.box.className = "textbox";

        this.input = document.createElement("textarea");
        this.input.className = "textinput";
        this.input.oninput = function() {
            this.parentNode.dataset.replicatedValue = this.value;
        }
        this.box.appendChild(this.input);

        this.tex = document.createElement("div");
        this.tex.className = "texttex";
        this.tex.style.fontSize = `${user.fontsize}pt`;

        this.box.style.left = `${x}px`;
        this.box.style.top = `${y}px`;

        this.box.addEventListener("click", () => {
            console.log("SSSSSSs");
        });
        this.input.addEventListener("focusout", () => {
            this.box.removeChild(this.input);
            this.render();
            this.box.appendChild(this.tex);
        });

        state.wrap.appendChild(this.box);
        this.input.focus();

        this.file.textboxes.push(this);
    }

    render() {
        let dat = this.input.value;
        try {
            katex.render(dat, this.tex, {
                displayMode: true,
                output: "html",
            });
        } catch (e) {
            console.log(e);
        }
    }
}