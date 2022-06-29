<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Highlight" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import Stroke from "@/stroke";
import Dot from "@/dot";
import user from "@/user";

export default {
    name: "Toolkit-Highlight",
    components: {
        Icon,
    },
    mounted() {
        let stroke;

        events.listen("panstart", e => {
            if (state.active_toolkit != "Highlight") return;
            stroke = new Stroke("highlight", user.size.highlight, user.color.highlight, user.opacity.highlight);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (state.active_toolkit != "Highlight") return;
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (state.active_toolkit != "Highlight") return;
            stroke.add(e.center);
            stroke.end();
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
            }
        });
        events.listen("tap", e => {
            if (state.active_toolkit != "Highlight") return;
            stroke = new Dot(user.size.highlight, user.color.highlight, user.opacity.highlight, e.center);
        });
    },
    methods: {
        click() {
            state.active_toolkit = "Highlight";
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
