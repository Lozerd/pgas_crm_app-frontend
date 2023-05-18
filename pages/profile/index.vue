<template>
    <div class="wrapper">
        <div class="profile-edit">
            <div class="profile-edit__header">
                <h1 class="profile-edit__title">Редактирование профиля</h1>
            </div>
            <div class="profile-edit__content">
                <AppForm
                    :onSubmit="onSubmit"
                    :errors="errors"
                    :method="'post'"
                    :submitButtonText="
                        formUpdateState ? 'Сохранить' : 'Изменить'
                    "
                >
                    <AppInput
                        name="first_name"
                        :title="account.first_name || 'Имя'"
                        :required="false"
                        :disabled="!formUpdateState"
                        :initial="account.first_name"
                    />
                    <AppInput
                        name="last_name"
                        :required="false"
                        :title="account.last_name || 'Фамилия'"
                        :disabled="!formUpdateState"
                        :initial="account.last_name"
                    />
                    <AppInput
                        name="patronymic"
                        :required="false"
                        :title="account.patronymic || 'Отчество'"
                        :disabled="!formUpdateState"
                        :initial="account.patronymic"
                    />
                    <AppInput
                        name="phone"
                        :required="false"
                        :title="account.phone || 'Телефон'"
                        :disabled="!formUpdateState"
                        :initial="account.phone"
                    />
                    <h1>Дополнительная информация</h1>
                    <AppSelect
                        name="degree"
                        :title="account.degree_name || 'Образование'"
                        :required="false"
                        :disabled="!formUpdateState"
                        :options="account.degree_choices"
                        :rules="{ min: 1, max: 1 }"
                        :initial="account.degree"
                    />
                    <AppInput
                        name="record_book_code"
                        :required="false"
                        :title="
                            account.record_book_code || 'Номер зачётной книжки'
                        "
                        :disabled="!formUpdateState"
                        :initial="account.record_book_code"
                    />
                    <AppInput
                        name="group_code"
                        :required="false"
                        :title="account.group_code || 'Код группы'"
                        :disabled="!formUpdateState"
                        :initial="account.group_code"
                    />
                    <AppInput
                        name="course"
                        :required="false"
                        :title="account.course || 'Курс'"
                        :rules="{ min: 1, max: 5, numeric: true }"
                        :disabled="!formUpdateState"
                        :initial="account.course"
                    />
                    <AppSelect
                        name="institute"
                        :title="account.institute_name || 'Институт'"
                        :required="false"
                        :disabled="!formUpdateState"
                        :options="account.institute_choices"
                        :initial="account.institute"
                    />
                    <AppSelect
                        name="field_of_study"
                        :title="
                            account.field_of_study_name ||
                            'Направление подготовки'
                        "
                        :required="false"
                        :disabled="!formUpdateState"
                        :options="account.field_of_study_choices"
                        :initial="account.field_of_study"
                    />
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
    name: "index",
    layout: "profile",
    components: { AppSelect, AppInput, AppForm },
    data() {
        return {
            errors: [],
            formUpdateState: false
        };
    },
    computed: {
        account() {
            return this.$store.getters["profile/getAccount"];
        }
    },
    methods: {
        async onSubmit(formRef) {
            if (!this.formUpdateState) {
                this.formUpdateState = !this.formUpdateState;
                return;
            }

            let formData = new FormData(formRef);
            formData.append(
                "csrftokenmiddleware",
                this.$cookies.get("csrftoken")
            );
            console.log(formData, JSON.stringify(formData));
            await this.$store.dispatch("profile/updateAccount", formData);
            this.formUpdateState = !this.formUpdateState;
        }
    }
};
</script>

<style scoped lang="scss"></style>
