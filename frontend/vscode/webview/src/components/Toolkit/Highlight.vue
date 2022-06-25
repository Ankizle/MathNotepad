<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Highlight" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";
import file from "@/file";
import events from "@/events";
import stroke from "@/stroke";

export default {
    name: "Toolkit-Highlight",
    components: {
        Icon,
    },
    mounted() {
        events.listen("panstart", e => {
            if (state.active_toolkit != "Highlight") return;

            state.pan.stroke = [e.center]; //store the stroke in the state
            this.stroke(e.center, e.center);
        });
        events.listen("panmove", e => {
            if (state.active_toolkit != "Highlight") return;

            let prev = state.pan.stroke.at(-1);

            state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
        });
        events.listen("panend", e => {
            if (state.active_toolkit != "Highlight") return;

            let prev = state.pan.stroke.at(-1);

            state.pan.stroke.push(e.center);
            this.stroke(e.center, prev);
            file.highlighter.strokes.push(state.pan.stroke);
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Highlight") return;
            this.stroke(e.center, e.center);
            file.highlighter.strokes.push([e.center]);
        });
    },
    methods: {
        click() {

            let sty = `rgb(${file.highlighter.color.join(",")})`;

            state.ctxh.strokeStyle = sty;
            state.ctxh.lineWidth = file.highlighter.size;

            state.active_toolkit = "Highlight";
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
