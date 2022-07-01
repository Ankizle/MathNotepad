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
            if (state.active_toolkit == this.typ) {
                return `
                    max-height: ${this.$refs.settings.scrollHeight}px !important;
                    width: 8em !important;
                    padding: 10pt !important;
                    border-top: 1px solid rgb(77, 81, 86);
                `;
            }
            return "";
        },
    },
}
</script>

<style scoped>

.settings {
    background-color: rgb(49, 53, 57);
    width: 0;
    box-sizing: border-box;
    padding: 0;
    border-radius: 0 1em 1em 0;
    user-select: none;

    max-height: 0;
    transition: all 1s ease;
    overflow: hidden;
}
</style>