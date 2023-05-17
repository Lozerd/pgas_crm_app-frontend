<template>
    <div v-html="personsIcon"></div>
</template>

<script>
import personsIcon from "@/assets/images/persons-icon.svg?raw";

export default {
    name: "ProfileAsideOrders",
    data() {
        return {
            personsIcon
        };
    }
};
</script>

<style scoped></style>
