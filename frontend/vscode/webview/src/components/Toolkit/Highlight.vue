<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Highlight" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";
import events from "@/events";
import Stroke from "@/stroke";
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
            stroke = new Stroke(user.size.highlight, user.color.highlight, user.opacity.highlight);
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
