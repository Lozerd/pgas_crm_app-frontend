<template>
    <AuthForm formTitle="Регистрация">
        <AppForm
            :onSubmit="onSubmit"
            v-bind:errors="errors"
            submitButtonText="Отправить"
            class="auth__form"
        >
            <div class="notification">
                <span>Мы отправили код на указанный вами адрес почты</span>
                <span>Введите код из письма, чтобы закончить регистрацию</span>
            </div>
            <AppInput title="Код подтверждения" name="code" />
        </AppForm>
    </AuthForm>
</template>

<script>
import AppForm from "@/components/common/AppForm.vue";
import AppInput from "@/components/common/AppInput.vue";

export default {
    name: "RegisterConfirmForm",
    components: { AppInput, AppForm },
    data() {
        return {
            errors: null
        };
    },
    methods: {
        onSubmit() {}
    }
};
</script>

<style scoped lang="scss">
.notification {
}
</style>
