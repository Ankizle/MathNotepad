<template>
    <div>
        <input ref="input" type="color" class="colorpicker" :value="curcolor" @input="changecolor">
    </div>
</template>

<script>
import user from '@/user'

export default {
    name: "Color-Picker",
    props: {
        typ: String,
    },
    data() {
        return {
            curcolor: user.color[this.typ],
        };
    },
    methods: {
        changecolor(e) {
            user.color[this.typ] = e.target.value;
        },
    },
}
</script>

<style scoped>
.colorpicker {
    border: none;
    width: 100%;
    height: 20px;
    border: none;
    padding: 0;
    margin: 0;
    background: none;
}
.colorpicker::-webkit-color-swatch-wrapper {
    padding: 0;
}
.colorpicker::-webkit-color-swatch {
    border-radius: 1em;
    border: none;
    background: none;
}
</style>