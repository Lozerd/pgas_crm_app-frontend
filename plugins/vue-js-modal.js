import Vue from "vue";

import VModal from "vue-js-modal/dist/ssr.nocss";
import "vue-js-modal/dist/styles.css";

Vue.use(VModal, {
    dynamicDefaults: {
        height: "400px",
        styles: { borderRadius: "35px", transition: "all .45s ease-in-out" }
    }
});
