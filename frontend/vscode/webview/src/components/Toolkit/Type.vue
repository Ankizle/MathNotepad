<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Type" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";

export default {
    name: "Toolkit-Type",
    components: {
        Icon,
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Type";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
