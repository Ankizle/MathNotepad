<template>
    <div class="cont" @mousedown="clickstart" @mouseup="clickend">
        <Icon typ="Highlight" />
    </div>
    <SettingsTab typ="SettingsHighlight">
        <ColorPicker typ="highlight"></ColorPicker>
        <Slider typ="highlight" config="opacity" label="Opacity"></Slider>
        <Slider typ="highlight" config="size" label="Stroke Size"></Slider>
    </SettingsTab>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import Stroke from "@/stroke";
import Dot from "@/dot";
import user from "@/user";
import SettingsTab from "./SettingsTab";
import ColorPicker from "./ColorPicker";
import Slider from "./Slider";
import save from '@/save';

export default {
    name: "Toolkit-Highlight",
    components: {
        Icon,
        SettingsTab,
        ColorPicker,
        Slider,
    },
    mounted() {
        let stroke;

        events.listen("panstart", e => {
            if (!state.active_toolkit.endsWith("Highlight")) return;
            stroke = new Stroke("highlight", user.size.highlight, user.color.highlight, user.opacity.highlight);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (!state.active_toolkit.endsWith("Highlight")) return;
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (!state.active_toolkit.endsWith("Highlight")) return;
            stroke.add(e.center);
            stroke.end();
            save();
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
            }
        });
        events.listen("tap", e => {
            if (!state.active_toolkit.endsWith("Highlight")) return;
            stroke = new Dot(user.size.highlight, user.color.highlight, user.opacity.highlight, e.center);
            save();
        });
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
                state.active_toolkit = "Highlight"; //just a click
            else
                state.active_toolkit = "SettingsHighlight"; //accessing settings
        }
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
