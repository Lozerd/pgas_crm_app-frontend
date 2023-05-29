<template>
    <aside v-if="account !== null" class="profile__aside">
        <ProfileAsideAccount />
        <ProfileAsideActions />
    </aside>
</template>

<script>
import ProfileAsideAccount from "@/components/profile/includes/ProfileAsideAccount";
import ProfileAsideActions from "@/components/profile/includes/ProfileAsideActions";

export default {
    name: "ProfileAside",
    components: { ProfileAsideAccount, ProfileAsideActions },
    computed: {
        account() {
            return this.$store.getters["profile/getAccount"];
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/components/profile/profile-aside.scss";
</style>
