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
    },
    methods: {
        overflowListener() {
            const body = document.querySelector("body");

            this.$nuxt.$on("enableOverflow", () => {
                if (!body.classList.contains("overflow")) {
                    body.classList.add("overflow");
                }
            });
            this.$nuxt.$on("disableOverflow", () => {
                if (body.classList.contains("overflow")) {
                    body.classList.remove("overflow");
                }
            });
        }
    },
    mounted() {
        this.overflowListener();
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/base.scss";
</style>
