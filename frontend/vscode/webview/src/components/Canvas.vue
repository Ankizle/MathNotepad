<template>
    <div id="wrapper">
        <svg id="maincvs" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
</template>

<script>
import Hammer from "hammerjs";
import state from "@/state";
import events from "@/events";

export default {
    name: "Notebook-Canvas",
    components: {},
    mounted() {
        this.wrap = document.getElementById("wrapper");
        state.wrap = this.wrap;

        this.maincvs = document.getElementById("maincvs");
        state.maincvs = this.maincvs;

        this.hammer = new Hammer.Manager(this.wrap);
        state.hammer = this.hammer;

        this.hammer.add(new Hammer.Pan({ threshold: 0, }));
        this.hammer.add(new Hammer.Tap());

        let even = ["panstart", "panmove", "panend", "tap"];
        for (let i of even)
            this.hammer.on(i, e => events.emit(i, e));

        state.winwid = this.winwid;
        state.winhei = this.winhei;
    },
    data() {
        return {
            winwid: document.documentElement.clientWidth,
            winhei: document.documentElement.clientHeight,
        };
    },
}
</script>

<style scoped>
#wrapper {
    height: 100vh;
    width: 100vw;
}
#highlighter {
    opacity: .3;
}
</style>
<style>
#wrapper > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
#wrapper > input {
    position: absolute;
}
svg > path {
    fill: none;
}
</style>