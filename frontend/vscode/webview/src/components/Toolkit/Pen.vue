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
import Stroke from "@/stroke";
import user from "@/user";

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
    },
    mounted() {

        let stroke;

        events.listen("panstart", d => {
            if (state.active_toolkit != "Pen") return;

            stroke = new Stroke(file.pen.strokes, user.size.pen, user.color.pen, state.ctx);
            stroke.add(d[0], d[0]);
        });
        events.listen("panmove", d => {
            if (state.active_toolkit != "Pen") return;
            stroke.add(...d.points);
        });
        events.listen("panend", d => {
            if (state.active_toolkit != "Pen") return;

            stroke.add(...d);
            file.pen.strokes.push(stroke);
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Pen") return;

            stroke = new Stroke(file.pen.strokes, user.size.pen, user.color.pen, state.ctx);

            stroke.add(e, e);
            file.pen.strokes.push(stroke);
        });
    },
    methods: {
        click() {
            state.ctx.lineWidth = user.size.pen;
            state.ctx.strokeStyle = user.color.pen;

            state.active_toolkit = "Pen";
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
