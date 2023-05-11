<template>
    <div>
        <div v-if="success">Success</div>
        <div v-else>Failure</div>
    </div>
</template>

<script>
export default {
    name: "registrationConfirm",
    data() {
        return {
            success: false
        };
    },
    async fetch() {
        await this.$axios
            .$get("/api/registration_confirm/" + this.$route.params.uuid)
            .then((res) => {
                this.success = true;
            })
            .catch((err) => {
                this.success = false;
            });
    }
};
</script>

<style scoped></style>
