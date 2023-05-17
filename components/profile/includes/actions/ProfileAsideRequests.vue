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
            <div class="action__requests-content__item">Заявление №1</div>
            <div class="action__requests-content__item">Заявление №2</div>
            <div class="action__requests-content__item">Заявление №3</div>
            <div class="action__requests-content__item">Заявление №4</div>
            <div class="action__requests-content__item">Заявление №5</div>
            <div class="action__requests-content__item">Заявление №6</div>
            <div class="action__requests-content__item">Заявление №7</div>
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
    methods: {
        toggleDropDown() {
            this.isDroppedDown = !this.isDroppedDown;
        }
    }
};
</script>

<style scoped></style>
