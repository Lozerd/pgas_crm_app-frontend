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
import LoginForm from "@/components/auth/LoginForm";
import AppModal from "@/components/common/AppModal.vue";

export default {
    name: "ModalLogin",
    components: { AppModal, LoginForm }
};
</script>

<style scoped lang="scss"></style>
