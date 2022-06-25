<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Pen" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";
import file from "@/file";
import events from "@/events";
import stroke from "@/stroke";

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
    },
    mounted() {
        events.listen("panstart", e => {
            if (state.active_toolkit != "Pen") return;

            state.pan.stroke = [e.center]; //store the stroke in the state
            this.stroke(e.center, e.center);
        });
        events.listen("panmove", e => {
            if (state.active_toolkit != "Pen") return;

            let prev = state.pan.stroke.at(-1);

            state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
        });
        events.listen("panend", e => {
            if (state.active_toolkit != "Pen") return;

            let prev = state.pan.stroke.at(-1);

            state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
            file.pen.strokes.push(state.pan.stroke);
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Pen") return;
            this.stroke(e.center, e.center);
            file.pen.strokes.push([e.center]);
        });
    },
    methods: {
        click() {
            state.ctx.strokeStyle = file.pen.color;
            state.ctx.lineWidth = file.pen.size;

            state.active_toolkit = "Pen";
        },
        stroke: (c, p) => stroke(c, p),
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
