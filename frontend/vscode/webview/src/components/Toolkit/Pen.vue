<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Pen" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue";
import state from "@/state";

export default {
    name: "Toolkit-Pen",
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
            //TODO
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
