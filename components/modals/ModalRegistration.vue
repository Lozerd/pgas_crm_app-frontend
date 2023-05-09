<template>
    <AppModal
        :name="'modal__login'"
        :styles="{
            borderRadius: '35px'
        }"
    >
        <LoginForm />
    </AppModal>
</template>
<script>
import AppInput from "@/components/common/AppInput.vue";
import AppForm from "@/components/common/AppForm.vue";
import LoginForm from "@/components/auth/LoginForm.vue";
import AppModal from "@/components/common/AppModal.vue";

export default {
    name: "ModalRegistration",
    components: { AppModal, LoginForm, AppForm, AppInput }
};
</script>

<style scoped lang="scss"></style>
