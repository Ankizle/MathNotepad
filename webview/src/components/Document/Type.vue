<template>
    <div class="box" :style="style" ref="box" v-if="!erased">
        <textarea class="input" v-show="typing || mv.dragging" v-model="tex" ref="input" @blur="blur" @input="input"></textarea>
        <span class="rendered" v-show="!typing && !mv.dragging" ref="rendered"></span>
        <span class="measure input" ref="measure"></span>

        <div class="util" v-if="movable">
            <Icon typ="Move" size="1.1em" v-show="typing || mv.dragging" class="move" ref="move" @touchstart="touch_dragstart" @touchend="touch_dragend" @mousedown="dragstart" @mouseup="dragend" />
        </div>
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import katex from "katex";
import file from '@/file';
import events from '@/events';

export default {
    name: "Document-Type",
    components: {
        Icon,
    },
    props: {
        x: Number,
        y: Number,
        position: {
            type: String,
            default: "absolute",
        },
        movable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            tex: "",
            typing: true,
            id: 0,
            erased: false,

            xv: this.x,
            yv: this.y,

            clickedtv: false,

            mv: {
                x: 0,
                y: 0,
                dragging: false,
            },
        };
    },
    mounted() {
        this.id = file.textboxes.push(this) - 1;
        this.edit();

        events.listen("panmove", e => {
            if (!this.mv.dragging) return;
            this.xv -= this.mv.x - e.center.x;
            this.yv -= this.mv.y - e.center.y;

            this.mv.x = e.center.x;
            this.mv.y = e.center.y;
        });

        events.listen("erase", e => {
            console.log(e);
        });
    },
    computed: {
        style() {
            return `--x: ${this.xv - 10}px; --y: ${this.yv - 10}px; --position: ${this.position};`;
        },
    },
    methods: {
        blur() {
            this.typing = false;
            this.$nextTick(() => {
                if (this.tex == "" && !this.mv.dragging) return this.erase();
                katex.render(this.tex, this.$refs.rendered);
            });
        },
        input() {
            let spl = this.tex.split("\n");
            let wid = 200;
            let hei = 0;

            let meas = this.$refs.measure;
            for (let i of spl) {
                meas.textContent = i + "-";
                if (meas.clientWidth > wid) wid = meas.clientWidth;
                hei += meas.clientHeight;
            }
            meas.textContent = "";

            this.$refs.input.style.width = `${wid}px`;
            this.$refs.input.style.height = `${hei < 20 ? 20 : hei}px`;
        },
        bounds() {
            return [this.xv, this.yv, this.xv + this.$refs.box.clientWidth, this.$refs.box.clientHeight]
        },
        clickin(x, y) {
            let bounds = this.bounds();
            return (
                x >= bounds[0] && y >= bounds[1] &&
                x <= bounds[2] && y <= bounds[3]
            );
        },
        infocus() {
            return document.activeElement == this.$refs.input;
        },
        edit() {
            this.typing = true;
            this.$nextTick(() => this.$refs.input.focus());
            this.input();
        },
        erase() {
            file.textboxes[this.id] = null;
            this.erased = true;
        },
        touch_dragstart(e) {
            this.dragstart(e.touches[0]);
        },
        touch_dragend(e) {
            this.dragend(e.touches[0]);
        },
        dragstart(e) {
            this.mv.dragging = true;
            this.mv.x = e.clientX;
            this.mv.y = e.clientY;
        },
        dragend() {
            this.mv.dragging = false;
            this.edit();
        },
        encode() {
            return {
                x: this.xv,
                y: this.yv,
                tex: this.tex,
            }
        },
        load(data) {
            this.xv = data.xv;
            this.yv = data.yv;
            this.tex = data.tex;
            this.typing = false;
        },
    },
}
</script>

<style scoped>
.box {
    position: var(--position);
    left: var(--x);
    top: var(--y);
    display: grid;
}
.input {
    resize: none;
    overflow: hidden;
    font: inherit;
    outline: 3px;
    z-index: 2;
    border-radius: 5pt;
}
.measure {
    position: absolute;
}
.util {
    display: flex;
    justify-content: center;
    justify-self: center;
    z-index: 2;
}
</style>
