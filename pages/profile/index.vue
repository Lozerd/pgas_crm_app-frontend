<template>
    <div class="wrapper"></div>
</template>

<script>
export default {
    name: "index",
    layout: "profile",
    computed: {
        is_superuser() {
            return this.$store.getters["session/isSuperUser"];
        }
    }
};
</script>

<style lang="scss"></style>
