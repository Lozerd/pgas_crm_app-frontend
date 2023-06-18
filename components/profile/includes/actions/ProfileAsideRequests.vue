<template>
    <div class="action__requests" :class="isDroppedDown ? 'active' : null">
        <div class="action__requests-header" @click="toggleDropDown">
            <div class="action__requests-header__icon" v-html="docIcon" />
            <div class="action__requests-header__title">Мои заявления</div>
            <div
                class="action__requests-header__icon"
                v-show="isDroppedDown"
                v-html="downArrow"
            />
        </div>

        <div class="action__requests-content" v-show="isDroppedDown">
            <div
                class="action__requests-content__item"
                v-for="request in requests"
                :key="request.id"
            >
                {{ request.title }}
            </div>
            <div class="action__requests-content__item"></div>
        </div>
        <div
            v-if="!isDroppedDown || !isRequests"
            class="action__requests-content small"
        >
            <span>Вы не подали ни одного заявления!</span>
            <NuxtLink
                :to="{ path: '/profile/make-request' }"
                class="action__requests-content__make-request"
            >
                Подать заявление
            </NuxtLink>
        </div>
    </div>
</template>

<script>
import docIcon from "@/assets/images/doc-icon.svg?raw";
import downArrow from "@/assets/images/arrow-down.svg?raw";

export default {
    name: "ProfileAsideRequests",
    data() {
        return {
            docIcon,
            downArrow,
            isDroppedDown: false
        };
    },
    computed: {
        requests() {
            return this.$store.getters["profile/getRequests"];
        },
        isRequests() {
            return this.requests.length !== 0;
        }
    },
    methods: {
        toggleDropDown() {
            this.isDroppedDown = this.isRequests && !this.isDroppedDown;
        }
    },
    async fetch() {
        await this.$store.dispatch("profile/getRequests");
    }
};
</script>

<style scoped lang="scss">
.small {
    height: fit-content !important;

    &:hover {
        overflow-y: auto !important;
    }
}
</style>
