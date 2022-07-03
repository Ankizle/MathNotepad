<template>
    <div class="cont" @mousedown="clickstart" @mouseup="clickend">
        <Icon typ="Scissors" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import Stroke from "@/stroke";
import user from "@/user";
import events from "@/events"
import file from '@/file';
import * as intersect from "path-intersection";

export default {
    name: "Toolkit-Pen",
    components: {
        Icon,
    },
    mounted() {

        let stroke;

        events.listen("panstart", e => {
            if (!state.active_toolkit.endsWith("Scissors")) return;
            if (stroke != null) {
                if (document.elementFromPoint(e.center.x, e.center.y) == stroke.path) {
                    //we're dragging somewhere
                    this.moving = true;

                    //get all stroke being dragged

                    this.orig = e.center;

                    this.movingwhat.push(stroke);

                    for (let i of file.strokes) {
                        if (intersect(stroke.path, i.path).length != 0)
                            this.movingwhat.push(i);
                    }

                    return;
                } else stroke.erase();
            }
            stroke = new Stroke("pen", 1, "blue", 1, [5, 10]);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (!state.active_toolkit.endsWith("Scissors") || stroke == null) return;
            if (this.moving) {
                for (let i = 0; i < this.movingwhat.length; i++) {
                    this.mvx = e.center.x - this.orig.x;
                    this.mvy = e.center.y - this.orig.y;
                    this.movingwhat[i].path.setAttribute("transform", `translate(${e.center.x - this.orig.x}, ${e.center.y - this.orig.y})`);
                }
                return;
            }
            stroke.add(e.center);
        });
        events.listen("panend", e => {
            if (!state.active_toolkit.endsWith("Scissors") || stroke == null) return;

            if (this.moving) {

                for (let i = 0; i < this.movingwhat.length; i++)
                    this.movingwhat[i].transform(this.mvx, this.mvy);


                this.moving = false;
                this.orig = { x: 0, y: 0, };
                this.mvx = 0;
                this.mvy = 0;
                this.movingwhat = [];

                return;
            }

            stroke.add(e.center);
            stroke.connect();
            stroke.path.style.animation = `dash 15s linear infinite`;
            stroke.path.style.fill = "blue";
            stroke.path.style.fillOpacity = .1;
        });
        events.listen("scrolling", () => {
            if (stroke != null) {
                stroke.erase();
                stroke = null;
            }
        });
        events.listen("tap", e => {
            if (stroke != null) {

                //only erase if we tap outside
                if (document.elementFromPoint(e.center.x, e.center.y) != stroke.path) {
                    stroke.erase();
                    stroke = null;
                }
            }
        })
    },
    data() {
        return {
            startcl: 0,
            moving: false,
            orig: { x: 0, y: 0, },
            mvx: 0,
            mvy: 0,
            movingwhat: [],
        };
    },
    methods: {
        clickstart() {
            this.startcl = Date.now();
        },
        clickend() {
            if (Date.now() - this.startcl < user.holdthresh) 
                state.active_toolkit = "Scissors"; //just a click
            else
                state.active_toolkit = "SettingsScissors"; //there are no settings for scissos, but still
        }
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>

<style>
@keyframes dash {
    to {
        stroke-dashoffset: 1000;
    }
}
</style>