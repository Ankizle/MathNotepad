<template>
    <div id="wrapper">
        <canvas
            id="norm"
            :width="winwid"
            :height="winhei"
        ></canvas>
        <canvas
            id="highlighter"
            :width="winwid"
            :height="winhei"
        ></canvas>
    </div>
</template>

<script>
import Hammer from "hammerjs";
import state from "@/state";
import events from "@/events";
import Points from "@/points";

export default {
    name: "Notebook-Canvas",
    components: {},
    mounted() {
        this.wrap = document.getElementById("wrapper");

        this.canvas = document.getElementById("norm");
        this.ctx = this.canvas.getContext("2d");
        state.ctx = this.ctx;
        this.ctx.name = "pen";

        this.canvash = document.getElementById("highlighter");
        this.ctxh = this.canvash.getContext("2d");
        state.ctxh = this.ctxh;
        this.ctx.name = "highlight";
        
        this.ctx.lineCap = "round";
        this.ctxh.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctxh.lineJoin = "round";

        this.hammer = new Hammer.Manager(this.wrap);
        state.hammer = this.hammer;

        this.hammer.add(new Hammer.Pan({ threshold: 0, }));

        let points = new Points();

        this.hammer.on("panstart", e => {
            e = e.center;

            points.add(e);
            events.emit("panstart", points);
        });
        this.hammer.on("panmove", e =>{
            e = e.center;

            points.add(e);
            if (points.isfull()) events.emit("panmove", points);
        });
        this.hammer.on("panend", e => {
            e = e.center;

            points.add(e);
            events.emit("panend", points);
        });

        this.hammer.add(new Hammer.Tap());
        this.hammer.on("tap", e => events.emit("tap", e));
    },
    data() {
        return {
            winwid: document.documentElement.clientWidth,
            winhei: document.documentElement.clientHeight,
        };
    },
}
</script>

<style scoped>
#wrapper {
    height: 100vh;
    width: 100vw;
}
canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
#highlighter {
    opacity: .3;
}
</style>