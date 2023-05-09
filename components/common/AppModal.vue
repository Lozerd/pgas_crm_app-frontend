<template>
    <modal
        :height="400"
        :adaptive="true"
        :name="name"
        :styles="styles"
        @opened="handleOpened"
        @closed="handleClosed"
    >
        <slot></slot>
    </modal>
</template>
<script>
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
    name: "AppModal",
    components: { LoginForm },
    methods: {
        handleOpened() {
            this.$nuxt.$emit("enableOverflow");
        },
        handleClosed() {
            this.$nuxt.$emit("disableOverflow");
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        height: {
            type: Number,
            required: false,
            default: 400
        },
        styles: {
            type: Object,
            required: false
        }
    }
};
</script>

<style scoped lang="scss"></style>
