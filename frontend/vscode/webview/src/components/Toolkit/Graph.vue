<template>
    <div class="cont">
        <Icon typ="Graph" />
    </div>
</template>

<script>
import Icon from "./ToolkitIcon.vue"
import state from "@/state";

export default {
    name: "Toolkit-Graph",
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
