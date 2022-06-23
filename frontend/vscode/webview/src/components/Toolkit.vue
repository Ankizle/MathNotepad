<template>
    <ul class="toolkit-menu">
        <li class="toolkit-item">
            <Icon typ="Type" class="icon" />
        </li>
        <li class="toolkit-item">
            <Icon typ="Pen" class="icon" />
        </li>
        <li class="toolkit-item">
            <Icon typ="Highlight" class="icon" />
        </li>
        <li class="toolkit-item">
            <Icon typ="Erase" class="icon" />
        </li>
        <li class="toolkit-item">
            <Icon typ="Graph" class="icon" />
        </li>
    </ul>
</template>

<script>
import Icon from "./Icon"

export default {
    name: "Notebook-Toolkit",
    components: {
        Icon,
    },
}
</script>

<style scoped>
.toolkit-menu {
    list-style-type: none;
    padding: 0;
    background-color: rgb(49, 53, 57);
    margin: 0;
    display: inline-block;
    border-radius: 0 1em 1em 0;
    margin: 2em 0;
}
.toolkit-item {
    padding: 1em;
    margin: 0;
}

/*make the first and last have the correct border radii*/
.toolkit-item:first-of-type {
    border-radius: 0 1em 0 0;
}
.toolkit-item:last-of-type {
    border-radius: 0 0 1em 0;
}
/****/

.toolkit-item:hover {
    background-color: rgb(37, 40, 44);
}
.toolkit-item:hover > .icon {
    background: rgb(82, 140, 215);
}
.icon {
    background: rgb(125, 172, 234);
}
</style>
