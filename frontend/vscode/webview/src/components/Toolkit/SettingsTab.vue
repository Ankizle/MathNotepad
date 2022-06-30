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
            if (state.active_toolkit == this.typ) return `height: ${this.$refs.settings.scrollHeight}px !important; border-top: 1px solid rgb(77, 81, 86);`;
            return "";
        },
    },
}
</script>

<style scoped>

.settings {
    width: 4em;
    padding: 0;

    height: 0;
    overflow: hidden;
}
</style>