<script>
export default {
    name: "BaseUri",
    components: {},
    get() {
        const dataUri = document.getElementById("baseuri"); 
        if (!dataUri) return; //something is broken
        return dataUri.getAttribute("data-uri");
    },
}
</script>
