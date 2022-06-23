<template>
    <div class="cont">
        <Icon typ="Highlight" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";

export default {
    name: "Toolkit-Highlight",
    components: {
        Icon,
    },
    data() {
        return {
            state,
        };
    },
}
</script>

<style scoped>
.cont {
    padding: 1em;
}
</style>
