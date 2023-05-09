import { configure } from "vee-validate";

export default function ({ app }) {
    configure({
        defaultMessage: (field, values) => {
            return app.i18n.t(`validationRules.${values._rule_}`, values);
        }
    });
}
