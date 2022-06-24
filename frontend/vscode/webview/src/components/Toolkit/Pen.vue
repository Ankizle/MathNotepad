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

            this.state.ctx.beginPath();
            this.state.ctx.moveTo(e.center.x, e.center.y);
            this.state.ctx.lineTo(e.center.x, e.center.y);
            this.state.ctx.stroke();
        });
        events.listen("panmove", e => {
            if (this.state.active_toolkit != "Pen") return;

            this.state.pan.stroke.push(e.center);

            this.state.ctx.lineTo(e.center.x, e.center.y);
            this.state.ctx.stroke();
        });
        events.listen("panend", e => {
            if (this.state.active_toolkit != "Pen") return;

            this.state.pan.stroke.push(e.center);

            this.state.ctx.lineTo(e.center.x, e.center.y);
            this.state.ctx.stroke();
        });
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Pen";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
