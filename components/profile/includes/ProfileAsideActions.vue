<template>
    <div class="profile__aside-actions">
        <ProfileAsideRequests />
        <ProfileAsideStudentList />
        <ProfileAsideOrders />
    </div>
</template>

<script>
import ProfileAsideRequests from "@/components/profile/includes/actions/ProfileAsideRequests";
import ProfileAsideStudentList from "@/components/profile/includes/actions/ProfileAsideStudentList";
import ProfileAsideOrders from "@/components/profile/includes/actions/ProfileAsideOrders";

export default {
    name: "ProfileAsideActions",
    components: {
        ProfileAsideRequests,
        ProfileAsideStudentList,
        ProfileAsideOrders
    }
};
</script>

<style scoped></style>
