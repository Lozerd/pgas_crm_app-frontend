<template>
    <AppValidationProvider
        class="field"
        v-slot="{ errors }"
        name="criterion"
        ref="criterion"
        vid="criterion"
        rules="required"
    >
        <ul class="error-list" v-if="errors">
            <li class="error-item" :key="error" v-for="error in errors">
                {{ error }}
            </li>
        </ul>
        <multiselect
            label="title"
            trackBy="key"
            placeholder="Выберите деятельность"
            v-model="selectValue"
            selectLabel="Подробнее"
            deselectLabel=""
            selectedLabel="Выбран"
            :disabled="disabled"
            :searchable="true"
            :options="options"
            :closeOnSelect="true"
            :allowEmpty="false"
            :preserveSearch="true"
            @open="onOpen"
            @select="emitSelect"
        >
            <template slot="option" slot-scope="{ option }">
                {{ option.title }}
            </template>

            <template slot="noResult">
                Не найдено доступных опций по запросу
            </template>
            <template slot="noOptions"> Нет доступных опций</template>
        </multiselect>
    </AppValidationProvider>
</template>

<script>
export default {
    name: "CriterionSelect",
    data() {
        return {
            selectValue: null, // to display placeholder on non focused select.
            disabled: false
        };
    },
    methods: {
        onOpen() {
            document
                .querySelectorAll(".multiselect__option[data-select]")
                .forEach((el, index) => {
                    if (el.getAttribute("title") !== null) {
                        return;
                    }
                    el.setAttribute("title", this.options[index]?.description);
                });
        },
        emitSelect(selectedOption) {
            this.$nuxt.$emit("criterion-select", {
                uuid: this.uuid,
                selectValue: selectedOption
            });
        },
        disableListener() {
            this.$nuxt.$on("disableSelect", (uuid) => {
                if (this.uuid !== uuid) {
                    return;
                }
                this.disabled = true;
            });
        },
    },
    mounted() {
        this.disableListener();
    },
    props: {
        uuid: {
            type: String,
            required: false,
            default: Math.floor(Math.random() * 100).toString()
        },
        options: {
            type: Array[Object],
            required: true
        }
    }
};
</script>

<style lang="scss">
.multiselect--active .multiselect__select {
    top: 3px;
}
.multiselect {
    background: $color-primary-lightest_blue;

    &,
    &__tags {
        min-height: 48px;
    }

    &__tags {
        padding: 12px 40px 0 12px;
    }

    &__select {
        top: 0;
        height: 44px;
    }

    &__single,
    &__tags,
    &__option,
    &__input,
    &__placeholder {
        &::placeholder {
            color: #fff;
        }

        color: #fff;
        background: $color-primary-lightest_blue;
        //border: none;
    }

    &__input,
    &__placeholder {
        //padding-left: 5px;
    }

    &,
    &--above {
        border-radius: 5px;
    }

    &__option {
        &--highlight {
            background: $color-primary-lightblue;
            //outline: none;
            color: #fff;

            &:after {
                content: attr(data-select);
                background: $color-primary-lightblue;
                color: #fff;
            }
        }
    }
}
</style>
