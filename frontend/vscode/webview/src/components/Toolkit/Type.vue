<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Type" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";
import events from "@/events";

export default {
    name: "Toolkit-Type",
    components: {
        Icon,
    },
    mounted() {
        events.listen("mouse down", (t) => {
            if (this.state.active_toolkit != "Type") return;
            let coords = [t.e.layerX, t.e.layerY];
            console.log(coords);
        });
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Type";
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
