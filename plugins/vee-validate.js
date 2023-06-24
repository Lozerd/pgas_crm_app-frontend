import Vue from "vue";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { confirmed, email, max, min, numeric, required } from "vee-validate/dist/rules";
import { format as formatDate, isValid, parse } from "date-fns";

Vue.component("AppValidationProvider", ValidationProvider);
Vue.component("AppValidationObserver", ValidationObserver);

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("confirmed", confirmed);
extend("numeric", numeric);

function parseDate(date, format) {
    if (typeof date !== "string") {
        return isValid(date) ? date : null;
    }
    console.log(date, format);

    const parsed = parse(date, format, new Date());

    // if date is not valid or the formatted output after parsing does not match
    // the string value passed in (avoids overflows)
    if (!isValid(parsed) || formatDate(parsed, format) !== date) {
        return null;
    }

    return parsed;
}

extend("date_format", {
    message: field => "Неправильный формат даты",
    validate: function date_format(value, args) {
        if (args.length === 0) {
            return;
        }
        return !!parseDate(value, args[0]);
    }
});
