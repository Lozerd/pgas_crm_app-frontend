<template>
    <div>
        <!--        <Header />-->
        <main class="container">
            <Nuxt />
        </main>
        <!--        <Footer />-->
    </div>
</template>

<script>
export default {
    name: "profile",
    middleware: ["redirectUnauthorized"]
};
</script>

<style scoped></style>
