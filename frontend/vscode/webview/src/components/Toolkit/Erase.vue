<template>
    <div class="cont">
        <Icon typ="Erase" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";

export default {
    name: "Toolkit-Erase",
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
