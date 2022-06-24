<template>
    <canvas 
        id="canvas"
        v-on:mousedown="mousedown"
        v-on:mouseup="mouseup"
        :width="winwid"
        :height="winhei"
    ></canvas>
</template>

<script>
import state from "@/state";
import events from "@/events";
import Hammer from "hammerjs";

export default {
    name: "Notebook-Canvas",
    components: {},
    mounted() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.lineWidth = 5;
        state.ctx = this.ctx;

        this.hammer = new Hammer.Manager(this.canvas);
        state.hammer = this.hammer;

        this.hammer.add(new Hammer.Pan({ threshold: 0, pointers: 0, }));
        this.hammer.on("panstart", e => {
            events.emit("panstart", e);
        });
        this.hammer.on("panmove", e => {
            events.emit("panmove", e);
        });
        this.hammer.on("panend", e => {
            events.emit("panend", e);
        });
    },
    data() {
        return {
            state,
            winwid: document.documentElement.clientWidth,
            winhei: document.documentElement.clientHeight,
        };
    },
    methods: {
        mousedown(e) {
            events.emit("mouse down", { e, ctx: this.ctx, canvas: this.canvas, });
        },
        mouseup() {
            events.emit("mouse up");
        },
    },
}
</script>

<style scoped>
</style>