<template>
    <div class="action__students">
        <NuxtLink :to="{ path: '/profile/students' }" class="link">
            <div class="action__students-header">
                <div class="action__students-header__icon" v-html="infoIcon" />
                <div class="action__students-header__title">
                    Список студентов
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
import infoIcon from "@/assets/images/info-icon.svg?raw";

export default {
    name: "ProfileAsideStudentList",
    data() {
        return {
            infoIcon
        };
    },
    computed: {
        isSuperUser() {
            return this.$store.getters["session/isSuperUser"];
        }
    }
};
</script>

<style scoped lang="scss"></style>
