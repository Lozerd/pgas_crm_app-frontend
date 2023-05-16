<template>
    <aside class="profile__aside">
        <div class="profile__aside-account">
            <div
                @click="fileInputOnClick"
                class="profile__aside-account-avatar"
            >
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
                <div class="profile__aside-account-name">
                    <span v-if="account.full_name">
                        {{ account.full_name }}
                    </span>
                    <span v-else>{{ account.username }}</span>
                </div>
                <div class="profile__aside-account-email">
                    <span>{{ account.email }}</span>
                </div>
            </div>
        </div>
        <div v-html="calendarIcon"></div>
        <div v-html="docIcon"></div>
        <div v-html="infoIcon"></div>
        <div v-html="personsIcon"></div>
        <div class="profile__aside-actions">
            <div class="profile__aside-actions-item">
                <a href="#" class="profile__aside-actions-item-action">
                    <i class="fa fa-pencil"></i>
                </a>
            </div>
            <div class="profile__aside-actions-item">
                <a href="#" class="profile__aside-actions-item-action">
                    <i class="fa fa-trash"></i>
                </a>
            </div>
        </div>
    </aside>
</template>

<script>
import calendarIcon from "@/assets/images/calendar-icon.svg?raw";
import docIcon from "@/assets/images/doc-icon.svg?raw";
import infoIcon from "@/assets/images/info-icon.svg?raw";
import personsIcon from "@/assets/images/persons-icon.svg?raw";

export default {
    name: "ProfileAside",
    data() {
        return {
            calendarIcon,
            docIcon,
            infoIcon,
            personsIcon
        };
    },
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

<style lang="scss">
@import "@/assets/styles/components/profile/profile-aside.scss";
</style>
