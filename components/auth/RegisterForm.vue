<template>
    <AuthForm formTitle="Регистрация">
        <AppForm
            :onSubmit="onSubmit"
            :errors="errors"
            submitButtonText="Зарегистрироваться"
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
                    <button @click="footerLeftClicked" class="btn__link">
                        Забыли пароль?
                    </button>
                </div>
                <div class="footer--right">
                    <button @click="footerRightClicked" class="btn__link">
                        Уже есть аккаунт? Войти
                    </button>
                </div>
            </div>
        </AppForm>
    </AuthForm>
</template>

<script>
import AppInput from "@/components/common/AppInput.vue";
import AppForm from "@/components/common/AppForm.vue";
import LoginForm from "~/components/auth/LoginForm.vue";

export default {
    name: "RegisterForm",
    data() {
        return {
            errors: null
        };
    },
    components: {
        AppForm,
        AppInput
    },
    methods: {
        onSubmit() {},
        footerLeftClicked() {
            // this.$modal.show(ModalLogin);
        },
        footerRightClicked() {
            this.$modal.hideAll();
            this.$modal.show(LoginForm);
        }
    }
};
</script>

<style scoped lang="scss"></style>
