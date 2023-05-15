export default function ({ store, $axios }) {
    $axios.onRequest((config) => {
        store.state.auth_key
            ? (config.headers.common.AUTHORIZATION = `Token ${store.state.auth_key}`)
            : (config.headers.common.AUTHORIZATION = `Token ${store.state.session_key}`);
    });
}
