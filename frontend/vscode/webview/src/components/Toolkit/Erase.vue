<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Erase" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";
import events from "@/events";

export default {
    name: "Toolkit-Erase",
    components: {
        Icon,
    },
    mounted() {
        events.listen("panstart", () => {
            if (this.state.active_toolkit != "Erase") return;
            this.state.erasing = true;
        });
        events.listen("panend", () => {
            if (this.state.active_toolkit != "Erase") return;
            this.state.erasing = false;
        })
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Erase";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
