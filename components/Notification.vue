<template>
    <transition name="slide-down">
        <div
            v-if="notification.isActive"
            class="notification"
            :class="{
                success: notification.isSuccess === true,
                error: notification.isSuccess === false
            }"
            @click="() => (notification.isActive = false)"
        >
            <span class="notification__text">
                {{ notification.message ?? "Уведомление" }}
            </span>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Notification",
    computed: {
        notification() {
            return this.$store.getters["getNotification"];
        }
    },
    methods: {
        notificationListener() {
            this.$nuxt.$on("toggleNotification", ({ success, message }) => {
                this.$store.dispatch("toggleNotification", {
                    success,
                    message
                });

                setTimeout(() => {
                    this.$store.dispatch("resetNotification");
                }, 1700);
            });
        }
    },
    mounted() {
        this.notificationListener();
    }
};
</script>

<style scoped lang="scss">
.notification {
    height: 30px;
    overflow: hidden;
    text-align: center;
    line-height: 30px;

    &.success {
        background-color: green;
    }

    &.error {
        background-color: $color-secondary;
    }

    &__text {
        color: white;
        font-size: 14px;
    }
}
</style>
