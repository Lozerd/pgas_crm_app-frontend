<template>
    <AppValidationObserver
        v-slot="{ handleSubmit }"
        ref="validationObserver"
        slim
    >
        <form
            ref="AppFormRef"
            :action="action"
            :enctype="enctype"
            @submit.prevent="handleSubmit(formOnSubmit)"
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
        enctype: {
            type: String,
            required: false,
            default: "application/x-www-form-urlencoded"
        },
        onSubmit: {
            type: Function,
            required: false
        },
        errors: {
            type: Array,
            required: false
        },
        method: {
            type: String,
            required: false,
            default: "get"
        },
        action: {
            type: String,
            required: false,
            default: ""
        },
        customSubmitButton: {
            type: Boolean,
            required: false,
            default: false
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
