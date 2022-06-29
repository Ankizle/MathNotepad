<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Pen" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import Stroke from "@/stroke";
import Dot from "@/dot";
import user from "@/user";
import events from "@/events"

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
    },
    mounted() {

        let stroke;

        events.listen("panstart", e => {
            if (state.active_toolkit != "Pen") return;
            stroke = new Stroke("pen", user.size.pen, user.color.pen, user.opacity.pen);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (state.active_toolkit != "Pen" || stroke == null) return;
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (state.active_toolkit != "Pen" || stroke == null) return;
            stroke.add(e.center);
            stroke.end();
            stroke = null;
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
            }
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Pen") return;
            stroke = new Dot(user.size.pen, user.color.pen, user.opacity.pen, e.center);
        });
    },
    methods: {
        click() {
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
