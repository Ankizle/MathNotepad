<template>
    <div id="wrapper">

        <svg id="maincvs" xmlns="http://www.w3.org/2000/svg"></svg>

        <!-- for texboxes -->
        <template v-for="v in textboxes" :key="v">
            <component :is="v"></component>
        </template>

        <!-- for graphs -->
        <template v-for="v in graphs" :key="v">
            <component :is="v"></component>
        </template>
    </div>
</template>

<script>
import Hammer from "hammerjs";
import state from "@/state";
import events from "@/events";
import LoadData from "@/components/LoadData";
import Stroke from "@/stroke";

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
        this.hammer.add(new Hammer.Pinch());

        let panevents = ["panstart", "panmove", "panend"];
        for (let i of panevents)
            this.hammer.on(i, e => {
                e.center.y += document.documentElement.scrollTop;
                events.emit(i, e);
            });

        this.hammer.on("tap", e => events.emit("tap", e));

        //scroll with mouse
        window.onscroll = () => {
            this.maincvs.style.height = `${document.documentElement.scrollTop + 2 * this.winhei}px`;
        };
        window.onscroll();

        //scroll with two finger touch
        const scrollunits = 1;
        let lastp = 0;
        this.hammer.on("pinchstart", e => {
            lastp = e.center.y;
        })
        this.hammer.on("pinchmove", e => {
            e.preventDefault();
            window.scrollBy(0, (lastp - e.center.y) * scrollunits);
            lastp = e.center.y;
        });
        this.hammer.on("pinchend", e => {
            //TODO: momentum scroll
            console.log(e);
        });

        let loaded = decodeURIComponent(LoadData.get());
        if (loaded == "") loaded = `{"strokes":[],"textboxes":[]}`;

        let jsobj = JSON.parse(loaded);
        for (let i of jsobj.strokes)
            Stroke.load(i);

        state.winwid = this.winwid;
        state.winhei = this.winhei;
    },
    data() {
        return {
            winwid: document.documentElement.clientWidth,
            winhei: document.documentElement.clientHeight,
            textboxes: state.textboxes,
            strokes: state.strokes,
            graphs: state.graphs,
        };
    },
}
</script>

<style scoped>
#wrapper {
    height: 100vh;
    width: 100vw;
    font-family: Verdana;
    background-color: white;
    margin: 0;
    padding: 0;
}
#highlighter {
    opacity: .3;
}
#maincvs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
}
</style>
<style>
body {
    overflow-x: hidden;
}
body::-webkit-scrollbar {
    display: none;
}
svg > path {
    fill: none;
    z-index: 4;
}
</style>