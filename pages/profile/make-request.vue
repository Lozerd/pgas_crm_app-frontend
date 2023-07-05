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
                    enctype="multipart/form-data"
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
                    <div
                        ref="contentGroup"
                        v-if="criterionVisible"
                        class="profile-make-request__content__group"
                        :key="group.criterionUID"
                        v-for="(group, index) in groups"
                    >
                        <CriterionSelect
                            :uuid="index"
                            :options="activityCriterion"
                            :initial="selectsRegistry[group.criterionUID]"
                        />
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            title="Дата получения документа"
                            name="document_date"
                            :uuid="index"
                            :required="true"
                            :rules="{ date_format: 'dd.MM.yyyy' }"
                        />
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            title="Наименование документа"
                            name="document_title"
                            :uuid="index"
                            :required="true"
                        />
                        <AppInput
                            v-if="group.inputsVisible ?? false"
                            type="file"
                            title="Файл документа"
                            name="achievements_images"
                            :uuid="index"
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

export default {
    name: "make-request",
    components: {AppSelect, CriterionSelect, AppInput, AppForm},
    layout: "profile",
    data() {
        return {
            errors: [],
            activity_id: null,
            report_book_images: [],
            achievements_images: [],
            criterionVisible: false,
            selectsRegistry: {},
            groups: [{}]
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
        async onSubmit(formRef) {
            let data = new FormData(formRef);

            data.delete("document_file")
            data.delete("document_title")
            data.delete("report_book_images")
            data.delete("achievements_images")

            const results = this.groups.map(group => group.data)

            data.append("results", JSON.stringify(results))

            for (let report_book_image of this.report_book_images) {
                data.append("report_book_images", report_book_image)
            }

            for (let achievement_image of this.achievements_images) {
                data.append("achievements_images", achievement_image)
            }

            await this.$store.dispatch("profile/postRequest", data)
        },
        async onActivityChange(event) {
            this.criterionVisible = true;

            if (this.groups.length > 0) {
                this.groups = [{data: {}, criterionUID: 0, inputsVisible: false}];
            } else {
                this.groups = [...this.groups, {}];
            }

            await this.$store.dispatch("activity/getActivityCriterion", [
                event.target.value
            ]);
        },
        addCriterionSelect(e) {
            if (!("contentGroup" in this.$refs)) {
                return;
            }

            this.validationObserver.validate().then((valid) => {
                if (valid) {
                    this.groups = [...this.groups, {data: {}, criterionUID: this.groups.length, inputsVisible: false}];
                }
            });
        },
        onCriterionSelect({uuid, selectValue}) {
            if (uuid in this.groups && (this.groups[uuid].data.criteria_key === selectValue.key ?? true)) {
                return
            }

            let groups = Array.from(this.groups)

            groups[uuid] = {
                data: {criteria_key: selectValue.key},
                criterionUID: uuid,
                inputsVisible: true,
            };

            this.groups = groups
        },
        onAppInputEmit([criterionUID, inputName, newVal]) {
            if (["report_book_images", "achievements_images"].includes(inputName)) {
                return
            }

            let groups = this.groups

            groups[criterionUID]["data"][inputName] = newVal

            this.groups = groups
        },
        onAppInputFileEmit([inputName, files]) {
            console.log(inputName, files, )
            if (files?.length === 0) {
                return
            }

            this[inputName] = files
        }
    },
    created() {
        this.$nuxt.$on("criterion-select", this.onCriterionSelect);
        this.$nuxt.$on("appInputEmit", this.onAppInputEmit)
        this.$nuxt.$on("appInputFileEmit", this.onAppInputFileEmit)
    },
    beforeDestroy() {
        this.$nuxt.$off("criterion-select", this.onCriterionSelect);
        this.$nuxt.$off("appInputEmit", this.onAppInputEmit)
        this.$nuxt.$off("appInputFileEmit", this.onAppInputFileEmit)
    },
    async fetch() {
        await this.$store.dispatch("activity/getActivities");
    }
};
</script>
