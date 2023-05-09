<template>
    <AuthForm
        formTitle="Авторизация"
        footerTextLeft="Забыли пароль?"
        footerTextRight="Зарегистрироваться"
        submitButtonText="Войти"
    />
</template>

<script>
import AuthForm from "@/components/auth/includes/AuthForm";

export default {
    name: "LoginForm",
    components: {
        AuthForm
    },
    data() {
        return {
            errors: null
        };
    },
    methods: {
        async onSubmit(formRef) {
            let formData = new FormData(formRef);
            try {
                await this.$axios
                    .$post("/api/login", formData)
                    .then((res) => {
                        console.log(res);
                        this.$store.commit(
                            "session/setSessionId",
                            res.sessionid
                        );
                    })
                    .catch((err) => {
                        if (err.response.status === 404) {
                            this.$modal.show("modal__registration");
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
        }
    }
};
</script>
<style lang="scss">
@import "@/assets/styles/components/auth/login_form.scss";
</style>
