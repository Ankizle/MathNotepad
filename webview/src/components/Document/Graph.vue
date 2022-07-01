<template>
    <div class="boxg" :style="boxstyle">
        <!-- Graph -->
        <svg class="graph" :style="graphstyle" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <!-- Functions -->
        <ul class="flist">
            <li><Type position="relative" :movable="false"></Type></li>
            <li><Icon typ="Add" size="1em"></Icon></li>
        </ul>
    </div>
</template>

<script>
import user from "@/user"
import Type from "./Type.vue";
import Icon from "@/components/Icon";

export default {
    name: "Document-Graph",
    components: {
        Icon,
        Type,
    },
    props: {
        x: Number,
        y: Number,
    },
    data() {
        return {
            size: user.size.graph,
            xv: this.x,
            yv: this.y - user.size.graph / 2,
            relations: [],
        };
    },
    computed: {
        boxstyle() {
            return `
                --x: calc(${this.xv}px - ${user.size.graph}vw);
                --y: calc(${this.yv}px - ${user.size.graph}vw);
            `;
        },
        graphstyle() {
            return `
                --size: ${this.size * 2}vw;
            `;
        },
    },
}
</script>

<style scoped>
.boxg {
    position: absolute;
    top: var(--y);
    left: var(--x);
    padding: 0;
    display: grid;
    grid-auto-flow: column;
}
.graph {
    width: var(--size);
    height: var(--size);
}
.flist {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: center;
    min-width: 200px;
}
.flist > li {
    padding: 5pt;
}
</style>