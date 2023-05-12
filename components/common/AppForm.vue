<template>
    <AppValidationObserver
        v-slot="{ handleSubmit }"
        ref="validationObserver"
        slim
    >
        <form
            @submit.prevent="handleSubmit(formOnSubmit)"
            ref="AppFormRef"
            :action="action"
        >
            <slot></slot>
            <ul class="error-list" v-if="errors">
                <li class="error-item" :key="error" v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
            <button type="submit" class="btn button__submit">
                {{ submitButtonText }}
            </button>
        </form>
    </AppValidationObserver>
</template>

<script>
export default {
    name: "AppForm",
    methods: {
        formOnSubmit() {
            this.onSubmit(this.$refs.AppFormRef);
        },
        modalOpenedListener() {
            this.$nuxt.$on("modalOpened", (e) => {
                document.querySelector("form").reset();
            });
        }
    },
    mounted() {
        this.modalOpenedListener();
    },
    props: {
        onSubmit: {
            type: Function,
            required: false
        },
        errors: {
            type: Array,
            required: false
        },
        action: {
            type: String,
            required: false,
            default: ""
        },
        submitButtonText: {
            type: String,
            required: false,
            default: "Отправить"
        }
    }
};
</script>

<style lang="scss"></style>
