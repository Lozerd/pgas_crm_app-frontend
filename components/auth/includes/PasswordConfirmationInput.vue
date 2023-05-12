<template>
    <AppValidationProvider
        class="field"
        tag="label"
        :rules="'required|min:8|confirmed:' + confirmedTo"
        v-slot="{ errors }"
    >
        <ul class="error-list" v-if="errors && errors.length">
            <li class="error-item" :key="error" v-for="error in errors">
                {{ error }}
            </li>
        </ul>
        <input
            type="password"
            :required="true"
            :placeholder="'Повторите пароль'"
            v-model="inputValue"
            class="field__input"
        />

        <span class="field__title">Повторите пароль</span>
    </AppValidationProvider>
</template>

<script>
export default {
    name: "PasswordConfirmationInput",
    data() {
        return {
            inputValue: ""
        };
    },
    props: {
        confirmedTo: {
            type: String,
            required: false,
            default: "password"
        }
    }
};
</script>

<style></style>
