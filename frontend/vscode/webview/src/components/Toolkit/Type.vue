<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Type" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";
import events from "@/events";
import TextBox from "@/textbox";

export default {
    name: "Toolkit-Type",
    components: {
        Icon,
    },
    mounted() {
        events.listen("tap", e => {
            if (this.state.active_toolkit != "Type") return;

            new TextBox(e.center.x, e.center.y);
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
