<template>
    <AppValidationProvider
        tag="label"
        class="field"
        :name="name"
        :ref="name"
        :vid="name"
        v-slot="{ errors }"
    >
        <!--        :rules="computedRules"-->
        <ul class="error-list" v-if="errors && errors.length">
            <li class="error-item" :key="error" v-for="error in errors">
                {{ error }}
            </li>
        </ul>
        <select
            :ref="name"
            :name="name"
            :required="required"
            :class="className"
            :disabled="disabled"
            v-model="selectValue"
            class="field__input"
        >
            <option value="" disabled selected v-if="!!title">
                {{ title }}
            </option>
            <option
                :disabled="initial && index === 0"
                :value="key"
                v-for="(name, key, index) in options"
            >
                {{ name }}
            </option>
        </select>
    </AppValidationProvider>
</template>
<script>
export default {
    name: "AppSelect",
    data() {
        return {
            selectValue: this.initial ?? this.options[0]
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
                required: this.required
            };
        }
    },
    props: {
        options: {
            type: Object,
            required: true
        },
        title: {
            type: [String, Number],
            required: false,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: null
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
        rules: {
            type: Object,
            required: false,
            default: () => {}
        }
    }
};
</script>
