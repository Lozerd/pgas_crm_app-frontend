<template>
    <main>
        <News />
        <section></section>
    </main>
</template>

<script>
import News from "@/components/index/News";

export default {
    name: "index",
    components: {
        News
    },
    async fetch() {
        try {
            await this.$store.dispatch("getNews");
        } catch (error) {
            this.$nuxt.error({
                statusCode: error.status,
                message: error.detail
            });
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";
</style>
