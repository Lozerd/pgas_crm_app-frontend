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

        <div class="action__requests-content">
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
import RegisterConfirmForm from "@/components/auth/RegisterConfirmForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

export default {
    name: "components_testing",
    components: { RegisterForm, RegisterConfirmForm },
    data() {
        return {
            todos: [
                { text: "Заявление №1" },
                { text: "Заявление №2" },
                { text: "Заявление №3" }
            ]
        };
    },
    methods: {
        something() {
            this.$modal.show(RegisterConfirmForm);
        }
    },
    mounted() {
        // this.something();
    }
};
</script>

<style scoped lang="scss"></style>
