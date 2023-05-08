<template>
    <aside class="news">
        <NewsItem
            :key="item.id"
            :item="item"
            v-for="item in news"
            v-if="item.description"
        />
    </aside>
</template>

<script>
import NewsItem from "@/components/index/includes/NewsItem";

export default {
    name: "News",
    components: {
        NewsItem
    },
    computed: {
        news() {
            return this.$store.getters["getNews"];
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/components/news.scss";
</style>
