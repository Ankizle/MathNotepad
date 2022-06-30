<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Graph" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";

export default {
    name: "Toolkit-Graph",
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
            this.state.active_toolkit = "Graph";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
