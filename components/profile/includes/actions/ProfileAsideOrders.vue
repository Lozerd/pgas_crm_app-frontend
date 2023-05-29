<template>
    <div class="action__orders">
        <!--        <NuxtLink :to="{ path: '/profile/orders' }" class="link">-->
        <!--            <div class="action__orders-header">-->
        <!--                <div class="action__orders-header__icon" v-html="personsIcon" />-->
        <!--                <div class="action__orders-header__title">Приказы</div>-->
        <!--            </div>-->
        <!--        </NuxtLink>-->
    </div>
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
