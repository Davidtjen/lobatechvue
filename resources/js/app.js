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
import Axios from "axios";
import { error } from "jquery";

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

window.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (401 == error.response.status) {
            store.dispatch('logout');
        }
        return Promise.reject(error);
    }
);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        index: Index
    },
    async beforeCreate() {
        this.$store.dispatch("loadStoredState");
        this.$store.dispatch('loadUser');
    }
});
