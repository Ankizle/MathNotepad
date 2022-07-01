<template>
    <div class="cont" v-on:click="click">
        <Icon typ="Type" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"
import state from "@/state";
import events from "@/events";
import DocumentType from "@/components/Document/Type";
import file from '@/file';
import * as Vue from "vue";
import save from '@/save';

export default {
    name: "Toolkit-Type",
    components: {
        Icon,
    },
    mounted() {
        events.listen("tap", e => {
            if (state.active_toolkit != "Type") return;

            for (let i of file.textboxes)
                if (i != null && i.clickin(e.center.x, e.center.y))
                    return i.edit();

            state.textboxes.push(Vue.h(DocumentType, {
                x: e.center.x,
                y: e.center.y,
            }));
            save();
        });
    },
    data() {
        return {};
    },
    methods: {
        click() {
            state.active_toolkit = "Type";
        },
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
