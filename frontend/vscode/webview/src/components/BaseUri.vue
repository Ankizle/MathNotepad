<script>
export default {
    name: "BaseUri",
    components: {},
    get() {
        const dataUri = document.querySelector('input[data-uri]'); 
        if (!dataUri) return; //something is broken
        return dataUri.getAttribute('data-uri');
    },
}
</script>
