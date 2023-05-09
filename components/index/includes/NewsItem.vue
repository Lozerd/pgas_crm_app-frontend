<template>
    <div v-if="item.description" class="news--item">
        <img :src="item.image" v-if="item.image" alt="" />
        <div class="item__content">
            <NuxtLink
                class="item__content--title"
                :to="{ path: 'news/' + item.id }"
            >
                {{ item.title }}
            </NuxtLink>
            <div
                class="item__content--description"
                v-html="item.description"
            ></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "NewsItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss"></style>
