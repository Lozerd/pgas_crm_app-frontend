<template>
    <div class="auth">
        <div class="auth__header">
            <h1>{{ formTitle }}</h1>
        </div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "AuthForm",
    props: {
        formTitle: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/components/auth_form.scss";
</style>
