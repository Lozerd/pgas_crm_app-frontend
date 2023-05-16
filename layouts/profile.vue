<template>
    <div>
        <Header />
        <main class="container">
            <ProfileAside />
            <Nuxt />
        </main>
        <!--        <Footer />-->
    </div>
</template>

<script>
import ProfileAside from "@/components/profile/ProfileAside";
export default {
    name: "profile",
    components: {
        ProfileAside
    },
    middleware: ["redirectUnauthorized"],
    async fetch() {
        await this.$store.dispatch("profile/getAccount");
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";
@import "@/assets/styles/profile.scss";
</style>
