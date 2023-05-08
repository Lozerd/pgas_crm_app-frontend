<template>
    <div class="header--wrapper">
        <Notification />
        <header class="header">
            <NuxtLink :to="{ path: '/' }" class="logo">
                <img src="@/assets/images/logo.png" alt="" />
            </NuxtLink>
            <h1 class="large">Система управления ПГАС</h1>
            <button class="authorize btn">Авторизоваться</button>
        </header>
    </div>
</template>

<script>
export default {
    name: "Header"
};
</script>

<style lang="scss">
@import "@/assets/styles/header.scss";
</style>
