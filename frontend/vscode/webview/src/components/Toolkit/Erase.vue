<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Erase" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import Stroke from "@/stroke";
import user from "@/user";

export default {
    name: "Toolkit-Erase",
    components: {
        Icon,
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
            if (this.state.active_toolkit != "Erase") return;
            stroke = new Stroke("erase", user.size.erase, "white", 1);
            stroke.add(e.center);
        });
        events.listen("panmove", e => {
            if (this.state.active_toolkit != "Erase") return;
            stroke.add(e.center);
            events.emit("erase", stroke);
        });
        events.listen("panend", e => {
            if (this.state.active_toolkit != "Erase") return;
            stroke.add(e.center);
            stroke.end();
            stroke.erase();
            for (let i of toerase)
                i.erase();

            //reset
            curprec = 0;
            toerase = [];
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
            state,
        };
    },
    methods: {
        click() {
            this.state.active_toolkit = "Erase";
        }
    }
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
