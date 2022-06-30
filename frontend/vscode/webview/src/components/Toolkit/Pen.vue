<template>
    <div class="cont" @mousedown="clickstart" @mouseup="clickend">
        <Icon typ="Pen" />
    </div>
    <SettingsTab typ="SettingsPen">
        <ColorPicker typ="pen"></ColorPicker>
        <Slider typ="pen" config="size" label="Stroke Size"></Slider>
    </SettingsTab>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import Stroke from "@/stroke";
import Dot from "@/dot";
import user from "@/user";
import events from "@/events"
import SettingsTab from "./SettingsTab";
import ColorPicker from "./ColorPicker";
import Slider from "./Slider";

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
        SettingsTab,
        ColorPicker,
        Slider,
    },
    mounted() {

        let stroke;

        events.listen("panstart", e => {
            if (!state.active_toolkit.endsWith("Pen")) return;
            stroke = new Stroke("pen", user.size.pen, user.color.pen, user.opacity.pen);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (!state.active_toolkit.endsWith("Pen") || stroke == null) return;
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (!state.active_toolkit.endsWith("Pen") || stroke == null) return;
            stroke.add(e.center);
            stroke.end();
            stroke = null;
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
            }
        });
        events.listen("tap", e => {
            if (!state.active_toolkit.endsWith("Pen")) return;
            stroke = new Dot(user.size.pen, user.color.pen, user.opacity.pen, e.center);
            stroke = null;
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
                state.active_toolkit = "Pen"; //just a click
            else
                state.active_toolkit = "SettingsPen"; //accessing settings
        }
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
