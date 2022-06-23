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
    },
    computed: {
        style() {
            return `--mask-image: url(${BaseUri.get()}/icons/${this.typ}.svg);`;
        },
    },
}
</script>

<style scoped>
.icon {
    display: inline-block;
    --size: 2em;

    width: var(--size);
    height: var(--size);

    --mask-size: cover;
    mask-size: var(--mask-size);
    -webkit-mask-size: var(--mask-size);
  
    mask-image: var(--mask-image);
    -webkit-mask-image: var(--mask-image);
}
</style>
