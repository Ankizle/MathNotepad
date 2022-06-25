<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Highlight" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";

export default {
    name: "Toolkit-Highlight",
    components: {
        Icon,
    },
    mounted() {},
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Highlight";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
