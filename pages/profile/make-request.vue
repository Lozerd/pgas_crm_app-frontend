<template>
    <div class="wrapper">
        <div class="profile-make-request">
            <div class="profile-make-request__header">
                <h1 class="profile-edit__title">Создать заявку</h1>
            </div>
            <div class="profile-make-request__content">
                <AppForm
                    :onSubmit="onSubmit"
                    :errors="errors"
                    method="post"
                    submitButtonText="Подать заявку"
                    ref="formValidatorRef"
                >
                    <AppSelect
                        name="activity_id"
                        title="Деятельность"
                        :required="false"
                        :options="activities"
                        :rules="{ min: 1, max: 1 }"
                        :labelless="true"
                        :onChange="onActivityChange"
                    />
                    <div
                        ref="contentGroup"
                        v-if="criterionVisible"
                        class="profile-make-request__content__group"
                    >
                        <CriterionSelect :options="activityCriterion" />
                    </div>
                    <button
                        ref="addMoreButton"
                        v-if="this.$refs.contentGroup"
                        @click="addCriterionSelect"
                    >
                        Добавить ещё
                    </button>
                </AppForm>
            </div>
        </div>
    </div>
</template>

<script>
import AppForm from "@/components/common/AppForm.vue";
import AppInput from "@/components/common/AppInput.vue";
import AppSelect from "@/components/common/AppSelect.vue";
import CriterionSelect from "@/components/common/CriterionSelect.vue";
import Vue from "vue";

export default {
    name: "make-request",
    components: { AppSelect, CriterionSelect, AppInput, AppForm },
    layout: "profile",
    data() {
        return {
            errors: [],
            activity_id: null,
            criterionVisible: false,
            selectsRegistry: {}
        };
    },
    computed: {
        activities() {
            return this.$store.getters["activity/getActivities"];
        },
        activityCriterion() {
            return this.$store.getters["activity/getActivityCriterion"];
        },
        validationObserver() {
            return this.$refs.formValidatorRef.$refs.validationObserver;
        }
    },
    methods: {
        onSubmit(formRef) {},
        async onActivityChange(event) {
            this.criterionVisible = true;
            await this.$store.dispatch("activity/getActivityCriterion", [
                event.target.value
            ]);
        },
        addCriterionSelect(e) {
            if (!("contentGroup" in this.$refs)) {
                return;
            }
            e.preventDefault();

            this.validationObserver.validate().then((valid) => {
                if (valid) {
                    let selectClass = Vue.extend(CriterionSelect),
                        instance = new selectClass({
                            propsData: {
                                options: this.activityCriterion
                            }
                        });
                    this.$nextTick(() => {
                        instance.$mount();
                        this.$refs.contentGroup.appendChild(instance.$el);
                    });
                }
            });
        },
        onCriterionSelect({ uid, selectValue }) {
            if (uid in this.selectsRegistry) {
                return;
            }

            this.selectsRegistry[uid] = selectValue;

            this.addCriterionSelectFields();
        },
        addCriterionSelectFields() {
            let appInputClass = Vue.extend(AppInput),
                documentNameInputInstance = new appInputClass({
                    propsData: {
                        title: "Наименование документа",
                        name: "document_name",
                        required: true
                    }
                }),
                documentDateInputInstance = new appInputClass({
                    propsData: {
                        title: "Дата или номер документа",
                        name: "document_date",
                        required: true
                    }
                });

            this.$nextTick(() => {
                documentNameInputInstance.$mount();
                documentDateInputInstance.$mount();
                this.$refs.contentGroup.appendChild(
                    documentNameInputInstance.$el
                );
                this.$refs.contentGroup.appendChild(
                    documentDateInputInstance.$el
                );
            });
        }
    },
    mounted() {
        this.$nuxt.$on("criterion-select", this.onCriterionSelect);
    },
    async fetch() {
        await this.$store.dispatch("activity/getActivities");
    }
};
</script>
