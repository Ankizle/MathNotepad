<script>
export default {
    name: "LoadData",
    components: {},
    get() {
        const dataUri = document.getElementById("toload"); 
        if (!dataUri) return; //something is broken
        return dataUri.getAttribute("data-uri");
    },
}
</script>
