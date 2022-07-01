<template>
    <ul class="toolkit-menu">
        <li id="Type" :class="`toolkit-item ${isactive(`Type`)}`"><Type/></li>
        <li id="Pen" :class="`toolkit-item ${isactive(`Pen`)}`"><Pen/></li>
        <li id="Highlight" :class="`toolkit-item ${isactive(`Highlight`)}`"><Highlight /></li>
        <li id="Erase" :class="`toolkit-item ${isactive(`Erase`)}`"><Erase /></li>
        <li id="Graph" :class="`toolkit-item ${isactive(`Graph`)}`"><Graph /></li>
    </ul>
</template>

<script>
import Type from "./Toolkit/Type";
import Pen from "./Toolkit/Pen";
import Highlight from "./Toolkit/Highlight";
import Erase from "./Toolkit/Erase";
import Graph from "./Toolkit/Graph";

import state from "@/state";

export default {
    name: "Notebook-Toolkit",
    components: {
        Type,
        Pen,
        Highlight,
        Erase,
        Graph,
    },
    data() {
        return {
            state,
        };
    },
    methods: {
        isactive(typ) {
            return state.active_toolkit == typ ? "bigger-toolkit-item" : "";
        },
    },
}
</script>

<style scoped>
.toolkit-menu {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: inline-block;
    border-radius: 0 1em 1em 0;
    margin: 2em 0;
}
.toolkit-item {
    width: 4em;
    background-color: rgb(49, 53, 57);
    border-top: 1px solid rgb(77, 81, 86);

    transition: width .25s, border-radius .3s;
}
.bigger-toolkit-item {
    width: 5em;
    border-radius: 0 1em 1em 0 !important;
}

/*make the first and last have the correct border radii*/
.toolkit-item:first-of-type {
    border-radius: 0 1em 0 0;
}
.toolkit-item:last-of-type {
    border-radius: 0 0 1em 0;
}
/****/
</style>