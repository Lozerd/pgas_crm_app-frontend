<template>
    <AuthForm formTitle="Регистрация">
        <AppForm
            :onSubmit="onSubmit"
            v-bind:errors="errors"
            submitButtonText="Зарегистрироваться"
            class="auth__form"
        >
            <AppInput
                title="Имя пользователя"
                name="username"
                :required="true"
            />
            <AppInput
                title="Электронная почта"
                name="email"
                type="email"
                :required="true"
            />
            <AppInput
                title="Пароль"
                name="password"
                type="password"
                :required="true"
                :rules="{ min: 8 }"
            />
            <PasswordConfirmationInput />
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
import PasswordConfirmationInput from "@/components/auth/includes/PasswordConfirmationInput.vue";

export default {
    name: "RegisterForm",
    data() {
        return {
            errors: null
        };
    },
    components: {
        PasswordConfirmationInput,
        AppForm,
        AppInput
    },
    methods: {
        async onSubmit(formRef) {
            const data = new FormData(formRef),
                redirectUri = this.$route.fullPath;

            data.append("csrftokenmiddleware", this.$cookies.get("csrftoken"));
            data.append("redirectUri", redirectUri);

            await this.$axios
                .$post("/api/register", data)
                .then((res) => console.log(res))
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data);
                        this.errors = err.response.data.detail.split(", ");
                    } else if (err.request) {
                        console.log("Request error: ", err.request);
                    } else {
                        console.log("Unexpected error: ", err);
                    }
                });
        },
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

<style lang="scss"></style>
