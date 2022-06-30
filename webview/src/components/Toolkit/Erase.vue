<template>
    <div class="cont" @mousedown="clickstart" @mouseup="clickend">
        <Icon typ="Erase" />
    </div>
    <SettingsTab typ="SettingsErase">
        <Slider typ="erase" config="size" label="Erase Size"></Slider>
    </SettingsTab>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import Stroke from "@/stroke";
import user from "@/user";
import SettingsTab from "./SettingsTab";
import Slider from "./Slider";
import save from '@/save';

export default {
    name: "Toolkit-Erase",
    components: {
        Icon,
        SettingsTab,
        Slider,
    },
    mounted() {
        let stroke;

        //erase precedence
        const eraseprec = {
            "pen": 0,
            "highlight": 1,
        };
        let curprec = 0;
        let toerase = [];

        events.listen("panstart", e => {
            if (!state.active_toolkit.endsWith("Erase")) return;
            stroke = new Stroke("erase", user.size.erase, "white", 1);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (!state.active_toolkit.endsWith("Erase")) return;
            stroke.add(e.center);
            events.emit("erase", stroke);
        });
        events.listen("panend", e => {
            if (!state.active_toolkit.endsWith("Erase")) return;
            stroke.add(e.center);
            stroke.end();
            stroke.erase();
            for (let i of toerase)
                i.erase();

            //reset
            curprec = 0;
            toerase = [];
            save();
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
                curprec = 0;
                toerase = [];
            }
        });
        events.listen("toerase", stroke => {
            if (eraseprec[stroke.typ] < curprec || toerase.includes(stroke)) return;
            else if (eraseprec[stroke.typ] > curprec) {
                curprec = eraseprec[stroke.typ];
                for (let i of toerase)
                    if (i != null) i.changeopacity(o => o / user.eraseop);
                toerase = [];
            }

            stroke.changeopacity(o => o * user.eraseop);
            toerase.push(stroke);
        })
    },
    data() {
        return {
            startcl: 0,
        };
    },
    methods: {
        clickstart() {
            this.startcl = Date.now();
        },
        clickend() {
            if (Date.now() - this.startcl < user.holdthresh) 
                state.active_toolkit = "Erase"; //just a click
            else
                state.active_toolkit = "SettingsErase"; //accessing settings
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
