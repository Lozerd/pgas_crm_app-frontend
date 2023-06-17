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
                    <div class="profile-make-request__content__group">
                        <!--                        <AppInput name="title" title="ПРИКОЛ" />-->
                        <AppSelect
                            name="activity_id"
                            title="Деятельность"
                            :required="false"
                            :options="activities"
                            :rules="{ min: 1, max: 1 }"
                            :labelless="true"
                            :onChange="onChange"
                        />
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
                        <button>Добавить ещё</button>
                    </div>
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

export default {
    name: "make-request",
    components: { AppSelect, AppInput, AppForm },
    layout: "profile",
    data() {
        return {
            errors: [],
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
        async onChange(event) {
            await this.$store.dispatch("activity/getActivityCriterion", [
                event.target.value
            ]);
        }
    },
    async fetch() {
        await this.$store.dispatch("activity/getActivities");
    }
};
</script>

<style scoped></style>
