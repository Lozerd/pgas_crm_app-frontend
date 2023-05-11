<template>
    <AppValidationProvider
        class="field"
        tag="label"
        :rules="computedRules"
        :name="name"
        :ref="name"
        :vid="name"
        v-slot="{ errors }"
    >
        <ul class="error-list" v-if="errors && errors.length">
            <li class="error-item" :key="error" v-for="error in errors">
                {{ error }}
            </li>
        </ul>
        <input
            :ref="name"
            :name="name"
            :type="type"
            :required="required"
            :class="className"
            :placeholder="title"
            v-model="inputValue"
            class="field__input"
        />
        <span class="field__title">{{ title }}</span>
    </AppValidationProvider>
</template>
<script>
export default {
    name: "AppInput",
    data() {
        return {
            inputValue: ""
        };
    },
    computed: {
        computedRules() {
            return {
                ...this.rules,
                ...this.defaultRules
            };
        },
        defaultRules() {
            return {
                required: this.required,
                email: this.type === "email"
            };
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        type: {
            type: String,
            required: false,
            default: "text"
        },
        required: {
            type: Boolean,
            required: false,
            default: true
        },
        className: {
            type: String,
            required: false,
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        rules: {
            type: Object,
            required: false,
            default: () => {}
        }
    }
};
</script>

<style scoped lang="scss"></style>
