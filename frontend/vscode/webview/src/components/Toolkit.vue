<template>
    <ul class="toolkit-menu">
        <li class="toolkit-item Type"><Type/></li>
        <li class="toolkit-item Pen"><Pen/></li>
        <li class="toolkit-item Highlight"><Highlight /></li>
        <li class="toolkit-item Erase"><Erase /></li>
        <li class="toolkit-item Graph"><Graph /></li>
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
    watch: {
        "state.active_toolkit": function(n, o) {
            console.log(n, o)
        }
    },
}
</script>

<style scoped>
.toolkit-menu {
    list-style-type: none;
    padding: 0;
    background-color: rgb(49, 53, 57);
    margin: 0;
    display: inline-block;
    border-radius: 0 1em 1em 0;
    margin: 2em 0;
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
    transition: 0.3s;
    filter: brightness(70%);
    background-color: rgb(44, 48, 53);
}
</style>
