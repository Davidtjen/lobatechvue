require("./bootstrap");

import router from "./routes";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Index from "./Index";
import moment from "moment";
import StarRating from "./shared/components/StarRating";
import FatalError from "./shared/components/FatalError";
import ValidationErrors from "./shared/components/ValidationErrors";
import Success from "./shared/components/Success";
import storeDefenition from "./store";

window.Vue = require("vue");

Vue.use(VueRouter);
Vue.use(Vuex);

// Global registration of filter
Vue.filter("fromNow", value => moment(value).fromNow());

// Global registration of components
Vue.component("star-rating", StarRating);
Vue.component("success", Success);
Vue.component("fatal-error", FatalError);
Vue.component("v-errors", ValidationErrors);

const store = new Vuex.Store(storeDefenition);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        index: Index
    },
    beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
});
