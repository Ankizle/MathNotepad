<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Graph" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import * as Vue from "vue";
import save from "@/save";
import DocumentGraph from '@/components/Document/Graph.vue';

export default {
    name: "Toolkit-Graph",
    components: {
        Icon,
    },
    mounted() {
        events.listen("tap", e => {
            if (state.active_toolkit != "Graph") return;

            state.graphs.push(Vue.h(DocumentGraph, {
                x: e.center.x,
                y: e.center.y,
            }));
            save();
        });
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
