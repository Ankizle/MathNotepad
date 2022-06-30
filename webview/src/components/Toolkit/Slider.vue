<template>
    <div class="wrap">
        <input type="range" name="input" class="input" :min="minv" :max="maxv" :step="stepv" v-model="val">
        <label for="input" class="label">{{ label }}: {{ val }}</label>
    </div>
</template>

<script>
import user from "@/user";
import constants from "@/constants";

export default {
    name: "Edit-Slider",
    props: {
        typ: String,
        config: String,
        label: String,
    },
    data() {
        return {
            val: user[this.config][this.typ],
            minv: constants[this.config].min,
            maxv: constants[this.config].max,
            stepv: constants[this.config].step,
        };
    },
    watch: {
        val() {
            user[this.config][this.typ] = this.val;
        },
    },
}
</script>

<style scoped>
.wrap {
    width: 100%;
    text-align: center;
}
.label {
    color: #d9d3d3;
}
.input {
    width: 100%;
}
</style>