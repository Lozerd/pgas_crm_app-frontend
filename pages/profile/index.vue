<template>
    <div v-show="account !== null" class="wrapper">
        <div class="profile-edit">
            <div class="profile-edit__header">
                <h1 class="profile-edit__title">Редактирование профиля</h1>
            </div>
            <transition name="fade">
                <div class="profile-edit__content">
                    <AppForm
                        :onSubmit="onSubmit"
                        :errors="errors"
                        :method="'post'"
                        :submitButtonText="
                            formUpdateState ? 'Сохранить' : 'Изменить'
                        "
                    >
                        <div class="profile-edit__content__group primary">
                            <h1>Основная информация</h1>
                            <AppInput
                                name="username"
                                title="Имя пользователя"
                                :required="false"
                                :disabled="!formUpdateState"
                                :initial="account?.username"
                            />
                            <AppInput
                                name="first_name"
                                title="Имя"
                                :required="false"
                                :disabled="!formUpdateState"
                                :initial="account?.first_name"
                            />
                            <AppInput
                                name="last_name"
                                :required="false"
                                title="Фамилия"
                                :disabled="!formUpdateState"
                                :initial="account?.last_name"
                            />
                            <AppInput
                                name="patronymic"
                                :required="false"
                                title="Отчество"
                                :disabled="!formUpdateState"
                                :initial="account?.patronymic"
                            />
                            <AppInput
                                name="phone"
                                :required="false"
                                title="Телефон"
                                :disabled="!formUpdateState"
                                :initial="account?.phone"
                            />
                        </div>
                        <div class="profile-edit__content__group secondary">
                            <h1>Дополнительная информация</h1>
                            <AppSelect
                                name="degree"
                                title="Образование"
                                :required="false"
                                :disabled="!formUpdateState"
                                :options="account?.degree_choices"
                                :rules="{ min: 1, max: 1 }"
                                :initial="account?.degree"
                                :labelless="false"
                            />
                            <AppInput
                                name="record_book_code"
                                :required="false"
                                title="Номер зачётной книжки"
                                :disabled="!formUpdateState"
                                :initial="account?.record_book_code"
                            />
                            <AppInput
                                name="group_code"
                                :required="false"
                                title="Код группы"
                                :disabled="!formUpdateState"
                                :initial="account?.group_code"
                            />
                            <AppInput
                                name="course"
                                :required="false"
                                title="Курс"
                                :rules="{ min: 1, max: 5, numeric: true }"
                                :disabled="!formUpdateState"
                                :initial="account?.course"
                            />
                            <AppSelect
                                name="institute"
                                title="Институт"
                                :required="false"
                                :disabled="!formUpdateState"
                                :options="account?.institute_choices"
                                :initial="account?.institute"
                                :labelless="false"
                            />
                            <AppSelect
                                name="field_of_study"
                                title="Направление подготовки"
                                :required="false"
                                :disabled="!formUpdateState"
                                :options="account?.field_of_study_choices"
                                :initial="account?.field_of_study"
                                :labelless="false"
                            />
                        </div>
                    </AppForm>
                </div>
            </transition>
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

            try {
                await this.$store.dispatch("profile/updateAccount", formData);
                this.$nuxt.$emit("toggleNotification", {
                    success: true,
                    message: "Профиль успешно обновлен"
                });
            } catch (e) {
                this.$nuxt.$emit("toggleNotification", {
                    success: false,
                    message: "Произошла ошибка при обновлении профиля"
                });
            } finally {
                this.formUpdateState = !this.formUpdateState;
            }
        }
    }
};
</script>

<style lang="scss">
.field {
    &__input {
        &::placeholder {
            color: #fff !important;
        }
    }

    &__title {
        color: $color-profile-font-primary;
        display: block;
        position: static !important;
        top: 0 !important;
        padding: 0 0 0 20px !important;
    }
}
</style>
