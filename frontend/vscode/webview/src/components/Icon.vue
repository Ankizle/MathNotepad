<template>
    <i class="icon" :style="style"></i>
</template>

<script>
import BaseUri from "./BaseUri"

export default {
    name: "Notebook-Icon",
    components: {},
    props: {
        typ: String,
        size: {
            type: String,
            default: "2em",
        },
        background: {
            type: String,
            default: "rgb(98, 159, 238)",
        },
    },
    computed: {
        style() {
            return `--size: ${this.size}; --mask-image: url(${BaseUri.get()}/icons/${this.typ}.svg); background: ${this.background}`;
        },
    },
}
</script>

<style scoped>
.icon {
    display: inline-block;

    width: var(--size);
    height: var(--size);

    --mask-size: cover;
    mask-size: var(--mask-size);
    -webkit-mask-size: var(--mask-size);
  
    mask-image: var(--mask-image);
    -webkit-mask-image: var(--mask-image);
}
</style>
