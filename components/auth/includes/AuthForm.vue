<template>
    <div class="auth">
        <div class="auth__header">
            <h1>{{ computedFormTitle }}</h1>
        </div>

        // TODO

        <AppForm
            :onSubmit="onSubmit"
            :onError="onError"
            :submitButtonText="computedSubmitButtonText"
            class="auth__form"
        >
            <AppInput
                title="Имя пользователя"
                name="username"
                :required="true"
            />
            <AppInput
                title="Пароль"
                name="password"
                :type="'password'"
                :required="true"
            />
            <div class="auth__form--footer">
                <div class="footer--left">
                    <button>{{ computedFooterTextLeft }}</button>
                </div>
                <div class="footer--right">
                    <button>{{ computedFooterTextRight }}</button>
                </div>
            </div>
        </AppForm>
    </div>
</template>
<script>
import AppInput from "@/components/common/AppInput.vue";
import AppForm from "@/components/common/AppForm.vue";

export default {
    name: "AuthForm",
    components: { AppForm, AppInput },
    computed: {
        computedFormTitle() {
            return this.formTitle || "Авторизация";
        },
        computedFooterTextLeft() {
            return this.footerTextLeft || "Забыли пароль?";
        },
        computedFooterTextRight() {
            return this.footerTextLeft || "Авторизоваться";
        },
        computedSubmitButtonText() {
            return this.submitButtonText || "Войти";
        },
        methods: {
            async onSubmit(formRef) {},
            async onError(errorsRef) {}
        },
        props: {
            formTitle: {
                type: String,
                required: true
            },
            footerTextLeft: {
                type: String,
                required: false
            },
            footerTextRight: {
                type: String,
                required: false
            },
            submitButtonText: {
                type: String,
                required: false
            }
        }
    }
};
</script>

<style scoped lang="scss"></style>
