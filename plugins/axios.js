export default function ({ store, $axios }) {
    $axios.onRequest((config) => {
        config.headers.common.AUTHORIZATION = `Token ${store.state.session.auth_key}`;
    });
}
