<template>
    <div id="topl">
        <Toolkit></Toolkit>
    </div>
</template>

<script>
import Toolkit from "./components/Toolkit"

export default {
    name: "App",
    components: {
        Toolkit,
    },
}
</script>

<style scoped>
#topl {
    height: 100vh;
    width: 100vw;
    background-color: white;
    margin: 0;
}
</style>
