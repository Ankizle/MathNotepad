<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Erase" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";
import events from "@/events";
import Chunk from "@/chunk";
import user from "@/user";

export default {
    name: "Toolkit-Erase",
    components: {
        Icon,
    },
    mounted() {
        events.listen("panmove", e => {
            if (this.state.active_toolkit != "Erase") return;

            let chunks = Chunk.through(e.center.x, e.center.y, user.size.erase, null);

            for (let i of chunks) {
                events.emit(`erase ${i}`, {
                    coords: e.center,
                    size: user.size.erase,
                });
            }
        });
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
