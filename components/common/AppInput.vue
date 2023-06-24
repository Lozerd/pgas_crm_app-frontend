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
            :disabled="disabled"
            :multiple="multiple"
            :accept="accept"
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
            inputValue: this.initial ?? ""
        };
    },
    computed: {
        computedRules() {
            return {
                ...this.defaultRules,
                ...this.rules
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
            type: [String, Number],
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
        initial: {
            type: [String, Number],
            required: false,
            default: null
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
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        accept: {
            type: String,
            required: false,
            default: ""
        },
        multiple: {
            type: Boolean,
            required: false,
            default: true
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
