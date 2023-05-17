<template>
    <div class="profile__aside-account">
        <div @click="fileInputOnClick" class="profile__aside-account-avatar">
            <img
                v-if="account.image"
                :src="account.image"
                :alt="account.username"
            />
            <img v-else src="/images/account_avatar.png" alt="Avatar" />
            <input
                type="file"
                name="file"
                ref="fileInput"
                @change="updateProfileImage"
                hidden
            />
        </div>
        <div class="profile__aside-account-info">
            <div class="profile__aside-account-info-name">
                <h1 v-if="account.full_name">
                    {{ account.full_name }}
                </h1>
                <h1 v-else>{{ account.username }}</h1>
            </div>
            <div class="profile__aside-account-info-email">
                <span>{{ account.email }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileAsideAccount",
    computed: {
        account() {
            return this.$store.getters["profile/getAccount"];
        }
    },
    methods: {
        fileInputOnClick() {
            this.$refs.fileInput.click();
        },
        updateProfileImage(e) {
            const image = e.target.files[0];
            if (!image) return;

            let formData = new FormData();
            formData.append("image", image);

            this.$store.dispatch("profile/updateAccount", formData);
        }
    }
};
</script>

<style scoped></style>
