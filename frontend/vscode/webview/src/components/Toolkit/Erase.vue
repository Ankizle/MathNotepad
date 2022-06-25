<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Erase" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";
// import events from "@/events";

export default {
    name: "Toolkit-Erase",
    components: {
        Icon,
    },
    mounted() {
        // events.listen("panmove", e => {
        //     if (this.state.active_toolkit != "Erase") return;
        // });
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
