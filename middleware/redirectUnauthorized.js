export default function ({ store, redirect, $cookies }) {
    if (!store.state.session.auth_key) {
        $cookies.set("showLoginModal", true, { path: "/" });
        redirect("/");
    }
}
