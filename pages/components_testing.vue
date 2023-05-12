<template>
    <div></div>
    <!--    <RegisterConfirmForm />-->
</template>

<script>
import RegisterConfirmForm from "@/components/auth/RegisterConfirmForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

export default {
    name: "components_testing",
    components: { RegisterForm, RegisterConfirmForm },
    methods: {
        something() {
            this.$modal.show(RegisterConfirmForm);
        }
    },
    mounted() {
        this.something();
    }
};
</script>

<style scoped></style>
