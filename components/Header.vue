<template>
    <div class="header__wrapper">
        <Notification />
        <header class="header">
            <NuxtLink :to="{ path: '/' }" class="logo">
                <img src="@/assets/images/logo.png" alt="" />
            </NuxtLink>
            <h1 class="large">Система управления ПГАС</h1>
            <div
                @mouseenter="onMouseEnter"
                @mouseleave="onMouseLeave"
                class="wrapper"
            >
                <button
                    v-if="isAuthorized"
                    type="button"
                    aria-haspopup="true"
                    class="btn profile"
                    :style="borderRadiusBottom"
                >
                    <!-- prettier-ignore-start -->
                    <span class="authorize__icon">
                        <svg
                            version="1.0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="15.000000pt"
                            height="15.000000pt"
                            viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g
                                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                stroke="none"
                            >
                                <path
                                    d="M2435 5114 c-16 -2 -65 -9 -109 -15 -246 -33 -541 -172 -741 -349
-253 -223 -432 -545 -486 -875 -20 -120 -17 -390 5 -500 71 -361 275 -695 550
-903 l68 -52 -28 -10 c-121 -46 -173 -69 -276 -120 -444 -223 -805 -560 -1062
-990 -210 -352 -328 -745 -352 -1180 l-7 -120 201 0 202 0 0 49 c0 339 141
807 330 1095 291 445 681 750 1156 905 452 148 896 148 1348 0 475 -155 865
-460 1156 -905 189 -288 330 -756 330 -1095 l0 -49 202 0 201 0 -7 120 c-24
435 -142 828 -352 1180 -257 430 -618 767 -1062 990 -103 51 -155 74 -276 120
l-28 10 68 52 c275 208 479 542 550 903 22 110 25 380 5 500 -43 263 -176 542
-352 742 -219 247 -527 421 -848 479 -77 14 -332 26 -386 18z m294 -409 c588
-96 990 -650 896 -1234 -96 -588 -650 -990 -1234 -896 -588 96 -990 650 -896
1234 96 588 650 990 1234 896z"
                                />
                            </g>
                        </svg>
                    </span>
                    <!-- prettier-ignore-end -->
                    <span class="btn__text">Личный кабинет</span>
                </button>
                <button
                    v-else
                    type="button"
                    @click="showLoginModal"
                    class="btn authorize"
                >
                    <span class="btn__text">Авторизоваться</span>
                </button>
                <HeaderDropdownMenu
                    :on-mouse-enter="onMouseEnter"
                    :on-mouse-leave="onMouseLeave"
                    :dropdown-opened="isAuthorized && dropdownOpened"
                />
            </div>
        </header>
    </div>
</template>

<script>
import LoginForm from "~/components/auth/LoginForm.vue";

export default {
    name: "Header",
    data() {
        return {
            dropdownOpened: false,
            timeout: 300
        };
    },
    computed: {
        isAuthorized() {
            return this.$store.getters["session/isAuthorized"];
        },
        borderRadiusBottom() {
            return this.dropdownOpened ? { borderRadius: "5px 5px 0 0" } : null;
        }
    },
    methods: {
        showLoginModal() {
            this.$modal.hideAll();
            this.$modal.show(LoginForm);
        },
        redirectToProfile() {
            this.$router.push({ path: "/profile" });
        },
        onMouseEnter() {
            setTimeout(() => {
                this.dropdownOpened = true;
            }, this.timeout);
        },
        onMouseLeave() {
            setTimeout(() => {
                this.dropdownOpened = false;
            }, this.timeout);
        }
    }
};
</script>

<style lang="scss"></style>
