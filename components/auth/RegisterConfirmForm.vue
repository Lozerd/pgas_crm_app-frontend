<template>
    <AuthForm :formTitle="formTitle">
        <form @submit.prevent="onSubmit" ref="AppFormRef" class="auth__form">
            <div class="notification">
                <span>
                    Мы отправили <b>код</b> на указанный вами адрес почты
                </span>
                <span
                    >Введите код из письма, чтобы закончить
                    {{ formBodyEnding }}</span
                >
            </div>
            <CodeInput />
            <ul class="error-list" v-if="errors">
                <li class="error-item" :key="error" v-for="error in errors">
                    {{ error }}
                </li>
            </ul>
            <button type="submit" class="btn button__submit">Отправить</button>
        </form>
    </AuthForm>
</template>

<script>
import AppForm from "@/components/common/AppForm.vue";
import CodeInput from "@/components/common/CodeInput.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import AppInput from "@/components/common/AppInput.vue";

export default {
    name: "RegisterConfirmForm",
    components: { AppInput, CodeInput, AppForm },
    data() {
        return {
            errors: null
        };
    },
    methods: {
        async onSubmit(e) {
            let formData = new FormData(this.$refs.AppFormRef),
                code = "",
                data = {};

            for (let [_, value] of formData.entries()) {
                code += value;
            }
            data.code = code;
            data.csrfmiddlewaretoken = this.$cookies.get("csrftoken");

            await this.$axios
                .$post("/api/registration_confirm", data)
                .then((res) => {
                    this.$modal.hideAll();
                    this.$modal.show(LoginForm);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        this.$modal.hideAll();
                        this.$modal.show(LoginForm);
                    } else if ([400, 500].includes(err.response.status)) {
                        this.errors = [err.response.data.detail];
                    } else {
                        throw {
                            message: err.response.data,
                            statusCode: err.status
                        };
                    }
                });
            console.log("Submit");
        }
    },
    props: {
        formTitle: {
            type: String,
            default: "Регистрация"
        },
        formBodyEnding: {
            type: String,
            default: "регистрацию"
        }
    }
};
</script>

<style scoped lang="scss">
.auth__form {
    align-items: center;

    & .notification {
        margin-bottom: 10px;

        display: flex;
        flex-flow: column wrap;
        justify-content: center;

        font-size: $fz-medium;

        & > span {
            font-size: 17px;
            word-spacing: 0.01rem;

            margin-bottom: 5px;
            text-align: center;
        }
    }

    & .button__wrapper .button__submit {
        min-width: 300px;
    }
}
</style>
