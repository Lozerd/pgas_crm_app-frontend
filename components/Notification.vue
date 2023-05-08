<template>
    <div class="notification" :class="isActive ? 'active' : null">
        Notification
    </div>
</template>

<script>
export default {
    name: "Notification",
    computed: {
        isActive() {
            return this.$store.getters["getNotificationIsActive"];
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/notification";
</style>
