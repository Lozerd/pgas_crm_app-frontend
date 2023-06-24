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
                    <AppInput
                        v-if="criterionVisible"
                        name="report_book_images"
                        type="file"
                        title="Копия зачётной книжки"
                        accept="image/png, image/jpeg"
                        :required="true"
                        :multiple="true"
                    />
                    <div v-for="(group, index) in groups">{{index}}|{{group}}|{{group.inputsVisible}}|{{ group.inputsVisible ?? false }}</div>

                    <div
                        ref="contentGroup"
                        v-if="criterionVisible"
                        class="profile-make-request__content__group"
                        :key="group.criterionUID"
                        v-for="(group, index) in cmptGroups"
                    >
                        <CriterionSelect :uuid="index.toString()" :options="activityCriterion" />
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            title="Дата получения документа"
                            name="document_date"
                            :required="true"
                            :rules="{ date_format: 'dd.MM.yyyy' }"
                        />
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            title="Наименование документа"
                            name="document_title"
                            :required="true"
                        />
                        <br>
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            type="file"
                            title="Файл документа"
                            name="document_file"
                        />
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
            selectsRegistry: {},
            groups: [{}]
        };
    },
    computed: {
        cmptGroups() {
            return this.groups;
        },
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
        onSubmit(formRef) {
        },
        async onActivityChange(event) {
            this.criterionVisible = true;

            if (this.groups.length > 0) {
                this.groups = [{uuid: 0, inputsVisible: false}];
            } else {
                this.groups.push({});
            }

            await this.$store.dispatch("activity/getActivityCriterion", [
                event.target.value
            ]);
        },
        addCriterionSelect(e) {
            if (!("contentGroup" in this.$refs)) {
                return;
            }
            // e.preventDefault();

            this.validationObserver.validate().then((valid) => {
                if (valid) {
                    this.groups.push({});
                }
            });
        },
        onCriterionSelect({ uuid, selectValue }) {
            if (!(uuid in this.selectsRegistry)) {
                if (this.groups.length < 2) {
                    // this.groups[0].inputsVisible = true
                    // this.groups[0].criterionUID = uuid
                } else {
                    this.groups.push({ criterionUID: uuid, inputsVisible: true });
                }
            }

            this.selectsRegistry[uuid] = selectValue;
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
