export default function ({ store }) {
    // Получение сессии и авторизации при каждом запросе, т.к. store сбрасывается при инициализации компонента
    if (!store.state.session.session_key) {
        store.dispatch("session/getSessionKey");
    }
    if (!store.state.session.auth_key) {
        store.dispatch("session/getAuthKey");
    }
    if (!store.state.session.is_superuser) {
        store.dispatch("session/getIsSuperuser");
    }
}
