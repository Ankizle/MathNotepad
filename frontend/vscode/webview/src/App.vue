<template>
    <div id="topl">
        <Toolkit class="toolkit"></Toolkit>
        <Canvas></Canvas>
    </div>
</template>

<script>
import Toolkit from "./components/Toolkit";
import Canvas from "./components/Canvas";

export default {
    name: "App",
    components: {
        Toolkit,
        Canvas,
    },
}
</script>

<style scoped>
#topl {
    height: 100%;
    width: 100%;
    background-color: white;
    margin: 0;
}
.toolkit {
    position: fixed;
}
</style>
