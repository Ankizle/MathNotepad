<template>
    <div ref="settings" class="settings" :style="isactive">
        <slot></slot>
    </div>
</template>

<script>
import state from "@/state";

export default {
    name: "Settings-Tab",
    props: {
        typ: String,
    },
    computed: {
        isactive() {
            if (state.active_toolkit == this.typ) return `display: block !important; border-top: 1px solid rgb(77, 81, 86);`;
            return "";
        },
    },
}
</script>

<style scoped>

.settings {
    background-color: rgb(49, 53, 57);
    width: 8em;
    padding: 10pt;
    border-radius: 0 1em 1em 0;

    display: none;
    overflow: hidden;
}
</style>