<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Pen" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";
import events from "@/events";

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
    },
    mounted() {
        events.listen("panstart", e => {
            if (this.state.active_toolkit != "Pen") return;

            this.state.pan.stroke = [e.center]; //store the stroke in the state
            this.stroke(e.center, e.center);
        });
        events.listen("panmove", e => {
            if (this.state.active_toolkit != "Pen") return;

            let prev = this.state.pan.stroke.at(-1);

            this.state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
        });
        events.listen("panend", e => {
            if (this.state.active_toolkit != "Pen") return;

            let prev = this.state.pan.stroke.at(-1);

            this.state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
            this.state.pen.strokes.push(this.state.pen.stroke);
        });
        events.listen("tap", e => {
            if (this.state.active_toolkit != "Pen") return;
            this.stroke(e.center, e.center);
            this.state.pen.strokes.push([e.center]);
        });
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.ctx.lineWidth = this.state.pen.size;
            this.state.active_toolkit = "Pen";
        },
        stroke(c, p) {
            this.state.ctx.beginPath();
            this.state.ctx.arc(p.x, p.y, this.state.pen.size / 2, 2 * Math.PI, false);
            this.state.ctx.closePath();
            this.state.ctx.fill();

            this.state.ctx.beginPath();
            this.state.ctx.moveTo(p.x, p.y);
            this.state.ctx.lineTo(c.x, c.y);
            this.state.ctx.stroke();
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
