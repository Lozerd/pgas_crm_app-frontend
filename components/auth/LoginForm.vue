<template>
    <AuthForm formTitle="Авторизация">
        <AppForm
            :onSubmit="onSubmit"
            :errors="errors"
            submitButtonText="Войти"
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
                    <button
                        type="button"
                        @click="footerLeftClicked"
                        class="btn__link"
                    >
                        Забыли пароль?
                    </button>
                </div>
                <div class="footer--right">
                    <button
                        type="button"
                        @click="footerRightClicked"
                        class="btn__link"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </AppForm>
    </AuthForm>
</template>

<script>
import AuthForm from "@/components/auth/includes/AuthForm";
import AppForm from "~/components/common/AppForm.vue";
import AppInput from "~/components/common/AppInput.vue";
import RegisterForm from "~/components/auth/RegisterForm.vue";
import RegisterConfirmForm from "@/components/auth/RegisterConfirmForm.vue";

export default {
    name: "LoginForm",
    components: {
        AppInput,
        AppForm,
        AuthForm
    },
    data() {
        return {
            errors: null
        };
    },
    methods: {
        footerLeftClicked() {
            // this.$modal.show("modal__forgot");
        },
        footerRightClicked() {
            this.$modal.hideAll();
            this.$modal.show(
                RegisterForm,
                null,
                { height: "600px" },
                {
                    opened: (e) => {
                        console.log("emit");
                        this.$nuxt.$emit("modalOpened");
                    }
                }
            );
        },
        async onSubmit(formRef) {
            let formData = new FormData(formRef);
            formData.append(
                "csrftokenmiddleware",
                this.$cookies.get("csrftoken")
            );

            try {
                await this.$axios
                    .$post("/api/login", formData)
                    .then((res) => {
                        this.$store.dispatch(
                            "session/setAuthKey",
                            res.auth_key
                        );
                        this.$modal.hideAll();
                        this.$router.push({ path: "/profile" });
                    })
                    .catch(async (err) => {
                        if (err.response.status === 403) {
                            formData.delete("password");
                            await this.onForbidden(formData);
                        } else if (err.response.status === 404) {
                            this.onNotFound();
                        } else if (err.response.status === 500) {
                            this.errors = [err.response.data.detail];
                        } else {
                            throw {
                                message: err.response.data,
                                statusCode: err.status
                            };
                        }
                    });
            } catch (e) {
                console.log(e);
                alert(e);
            }
        },
        async onForbidden(formData) {
            this.$axios
                .$post("/api/resend_confirmation", formData)
                .then((res) => {
                    this.$modal.hideAll();
                    this.$modal.show(RegisterConfirmForm, {
                        formTitle: "Подтверждение",
                        formBodyEnding: "авторизацию"
                    });
                })
                .catch((err) => this.onNotFound());
        },
        onNotFound() {
            this.$modal.hideAll();
            this.$modal.show(RegisterForm, null, {
                height: "600px"
            });
        }
    }
};
</script>
<style lang="scss"></style>
