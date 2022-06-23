<template>
    <div>
        <Icon :typ="typ" class="icon" :style="`background: ${background}`" />
    </div>
</template>

<script>
import Icon from "@/components/Icon"

export default {
    name: "Toolkit-Icon",
    components: {
        Icon,
    },
    props: {
        typ: String,
        background: String,
    },
}
</script>

<style scoped>
.icon {
    background: rgb(98, 159, 238);
}
</style>
