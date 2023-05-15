import Vue from "vue";

import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required, min, max, confirmed } from "vee-validate/dist/rules";

Vue.component("AppValidationProvider", ValidationProvider);
Vue.component("AppValidationObserver", ValidationObserver);

extend("required", required);
extend("email", email);
extend("min", min);
extend("max", max);
extend("confirmed", confirmed);
