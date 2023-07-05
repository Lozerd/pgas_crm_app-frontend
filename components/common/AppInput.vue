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
        <ul
            class="error-list"
            v-if="errors && errors.length"
        >
            <li
                class="error-item"
                :key="error"
                v-for="error in errors"
            >
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
            @change="appInputFileHandler"
        />
        <span class="field__title">{{ title }}</span>
    </AppValidationProvider>
</template>
<script>

import debounce from "@/utils/debounce";

export default {
    name: "AppInput",
    emits: ['appInputEmit', 'appInputFileEmit'],
    data() {
        return {
            inputValue: this.initial ?? ""
        };
    },
    watch: {
        inputValue(...args) {
            console.log("CHANGED")
            this.debouncedAppInput(...args)
        }
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
    methods: {
        appInputFileHandler(e) {
            console.log(this.type, e.target.files)
            if (this.type !== "file" || e.target.files?.length === 0) {
                return
            }

            let files = []
            for (const file of e.target.files) {
                files.push(file)
            }

            this.$nuxt.$emit("appInputFileEmit", [this.name, files])
        }
    },
    created() {
        this.debouncedAppInput = debounce((newVal, oldVal) => {
            const vm = this
            if (vm.type === "file") {
                return
            }
            vm.$nuxt.$emit("appInputEmit", [this.uuid, this.name, newVal])
        }, 2000)
    },
    props: {
        uuid: {
            type: Number,
            required: false,
            default: Math.floor(Math.random() * 100)
        },
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
            default: () => {
            }
        }
    },
    mounted() {
    }
};
</script>

<style
    scoped
    lang="scss"
></style>
