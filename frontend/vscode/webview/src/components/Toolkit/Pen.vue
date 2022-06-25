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

        events.listen("panstart", e => {
            if (state.active_toolkit != "Pen") return;

            stroke = new Stroke(user.size.pen, user.color.pen, state.ctx);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (state.active_toolkit != "Pen") return;
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (state.active_toolkit != "Pen") return;

            stroke.add(e.center);
            file.pen.strokes.push(stroke);
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Pen") return;

            stroke = new Stroke(user.size.pen, user.color.pen, state.ctx);

            stroke.add(e.center);
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
