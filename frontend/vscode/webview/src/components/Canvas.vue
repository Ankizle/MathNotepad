<template>
    <div id="wrapper">
        <!-- for texboxes -->
        <template v-for="v in textboxes" :key="v">
            <component :is="v"></component>
        </template>
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

        this.hammer.add(new Hammer.Tap());

        let panevents = ["touchstart", "touchmove", "touchend"];
        for (let i of panevents)
            this.wrap.addEventListener(i, e => {
                e.preventDefault()
                if (e.touches.length != 1) return;
                e = e.touches[0];
                e.center = {
                    x: e.clientX,
                    y: document.documentElement.scrollTop + e.clientY,
                }
                events.emit(i.replace("touch", "pan"), e);
            });

        this.hammer.on("tap", e => {
            console.log("SSSSSSSS")
            events.emit("tap", e)
        });

        //for scrolling

        //scroll with mouse
        window.onscroll = () => {
            this.maincvs.style.height = `${document.documentElement.scrollTop + 2 * this.winhei}px`;
        };
        window.onscroll();

        //scroll with two finger touch
        let touchp = 0;
        this.wrap.addEventListener("touchstart", e => {
            e.preventDefault()
            if (e.touches.length != 2) return;
            events.emit("scrolling");
            touchp = e.touches[0].clientY;
        });
        this.wrap.addEventListener("touchmove", e => {
            e.preventDefault()
            if (e.touches.length != 2) return;
            events.emit("scrolling");
            let delta = touchp - e.touches[0].clientY;
            touchp = e.touches[0].clientY;
            window.scrollBy({
                left: 0,
                top: delta * 40,
                behavior: "smooth",
            });
        });

        state.winwid = this.winwid;
        state.winhei = this.winhei;
    },
    data() {
        return {
            winwid: document.documentElement.clientWidth,
            winhei: document.documentElement.clientHeight,
            textboxes: state.textboxes,
            strokes: state.strokes,
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
#maincvs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
}
</style>