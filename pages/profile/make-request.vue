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
                        class="profile-make-request__content__group"
                    >
                        <!--                        TODO multiselect??-->
                        <AppSelect
                            name="activity_id"
                            title="Критерий отбора"
                            :required="false"
                            :options="activityCriterion"
                            :rules="{ min: 1, max: 1 }"
                            :labelless="true"
                            :visible="criterionVisible"
                            :onChange="onChange"
                        />
                    </div>
                    <button @click="addNewGroup">Добавить ещё</button>
                    <!--                    report_book_images-->
                    <!--                    achievements_images-->
                    <!--                    :initial="account?.degree"-->
                </AppForm>
            </div>
        </div>
    </div>
</template>

<script>
import AppForm from "@/components/common/AppForm.vue";
import AppInput from "@/components/common/AppInput.vue";
import AppSelect from "@/components/common/AppSelect.vue";
import Vue from "vue";

export default {
    name: "make-request",
    components: { AppSelect, AppInput, AppForm },
    layout: "profile",
    data() {
        return {
            errors: [],
            activity_id: null,
            criterionVisible: false
        };
    },
    computed: {
        activities() {
            return this.$store.getters["activity/getActivities"];
        },
        activityCriterion() {
            return this.$store.getters["activity/getActivityCriterion"];
        }
    },
    methods: {
        onSubmit(formRef) {},
        addNewGroup() {
            if (this.errors.length > 0 || !this.activityCriterion) {
                return;
            }

            console.log(this.$refs.smth.$validator);

            // this.$refs.smth.$validator.validate().then((valid) => {
            //     if (valid) {
            //         let selectClass = Vue.extend(AppSelect),
            //             instance = new selectClass({
            //                 propsData: {
            //                     name: "activity_id",
            //                     title: "Критерий отбора",
            //                     required: "false",
            //                     options: this.activityCriterion,
            //                     rules: { min: 1, max: 1 },
            //                     labelless: true,
            //                     visible: this.criterionVisible
            //                 }
            //             });
            //         instance.$mount();
            //         this.$refs.contentGroup.appendChild(instance.$el);
            //     }
            // });
        },
        async onActivityChange(event) {
            this.criterionVisible = true;
            await this.$store.dispatch("activity/getActivityCriterion", [
                event.target.value
            ]);
        },
        onChange(e) {
            console.log(e);
        }
    },
    async fetch() {
        await this.$store.dispatch("activity/getActivities");
    }
};
</script>

<style scoped></style>
