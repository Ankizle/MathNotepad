<template>
    <ul class="toolkit-menu">
        <li id="Type" class="toolkit-item" :style="isactive(`Type`)"><Type/></li>
        <li id="Pen" class="toolkit-item" :style="isactive(`Pen`)"><Pen/></li>
        <li id="Highlight" class="toolkit-item" :style="isactive(`Highlight`)"><Highlight /></li>
        <li id="Erase" class="toolkit-item" :style="isactive(`Erase`)"><Erase /></li>
        <li id="Graph" class="toolkit-item" :style="isactive(`Graph`)"><Graph /></li>
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
            return state.active_toolkit == typ ? `width: 5em; border-radius: 0 1em 1em 0;` : ``
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
    width: 4em;
}
.toolkit-item {
    background-color: rgb(49, 53, 57);
}

/*make the first and last have the correct border radii*/
.toolkit-item:first-of-type {
    border-radius: 0 1em 0 0;
}
.toolkit-item:last-of-type {
    border-radius: 0 0 1em 0;
}
/****/

.toolkit-item:hover {
    filter: brightness(70%);
    background-color: rgb(44, 48, 53);
}
</style>
