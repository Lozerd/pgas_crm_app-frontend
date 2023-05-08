<template>
    <div>
        <Header />
        <main class="container">
            <Nuxt />
        </main>
        <Footer />
    </div>
</template>

<script>
import Notification from "@/components/Notification";
// TODO прикрутить куда-то темный режим и продумать режим для слабовидящих
export default {
    name: "default",
    components: {
        Notification
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
