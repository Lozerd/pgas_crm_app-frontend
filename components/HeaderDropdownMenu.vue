<template>
    <transition name="slide" mode="out-in">
        <div v-show="dropdownOpened" class="dropdown-menu">
            <NuxtLink
                :to="{ path: '/profile' }"
                class="link dropdown-item"
                @click="handleLogout"
            >
                <span class="dropdown-item__text">Профиль</span>
            </NuxtLink>
            <NuxtLink
                :to="{ path: '/reports' }"
                class="link dropdown-item"
                @click="handleLogout"
            >
                <span class="dropdown-item__text">Отчёты</span>
            </NuxtLink>
            <button class="link dropdown-item" @click.prevent="handleLogout">
                <span class="dropdown-item__text">Выйти</span>
            </button>
        </div>
    </transition>
</template>

<script>
export default {
    name: "HeaderDropdownMenu",
    methods: {
        handleLogout() {
            this.$store.dispatch("logout");
        }
    },
    props: {
        dropdownOpened: {
            type: Boolean,
            default: false,
            required: true
        },
        onMouseEnter: {
            type: Function,
            default: () => {}
        },
        onMouseLeave: {
            type: Function,
            default: () => {}
        }
    }
};
</script>

<style scoped lang="scss">
.slide-enter,
.slide-leave-to {
    top: -250px !important;
    opacity: 0 !important;
}

.slide-enter-active,
.slide-leave-active {
    transition: top 1s, opacity 0.3s linear;
}

.slide-leave,
.slide-enter-to {
    top: 50px !important;
    opacity: 1 !important;
}

.dropdown-menu {
    border: 1px solid $color-primary-lightblue;
    border-radius: 0 0 5px 5px;
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 50px;
    z-index: 1000;

    width: 150px;
    max-width: 180px;

    & .dropdown-item {
        @include btn-transition;
        min-height: 40px;
        //
        font-size: $fz-small;
        font-weight: 500;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;

        &,
        &:hover {
            border: none;
        }

        border-radius: 0;

        &:last-child {
            border-radius: 0 0 4px 4px;
        }

        & .dropdown-item__text {
            line-height: 50px;
            pointer-events: none;
        }
    }
}
</style>
