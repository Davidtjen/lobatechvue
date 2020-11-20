<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div class="container">
        <a class="navbar-brand ml-2">
          <router-link class="navbar-brand" :to="{ name: 'home' }"
            >Lobatech Vue API</router-link
          >
        </a>
        <button
          class="navbar-toggler mr-sm-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item ml-2">
              <span>
                <router-link class="nav-link" :to="{ name: 'home' }"
                  >Home</router-link
                >
                <span class="sr-only">(current)</span>
              </span>
            </li>
            <!-- <li class="nav-item">
              <span
                ><router-link class="nav-link" :to="{ name: 'home' }"
                  >Home</router-link
                >
                <span class="sr-only">(current)</span></span
              >
            </li> -->
          </ul>
          <span>
            <router-link
              class="nav-link text-white ml-0 mr-2"
              :to="{ name: 'basket' }"
            >
              Basket
              <span v-if="itemsInBasket" class="badge badge-info ml-1">
                {{ itemsInBasket }}
              </span>
            </router-link>
          </span>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <div class="container mt-4 mb-4 pr-4 pl-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<!-- Javascript -->
<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      lastSearch: this.$store.state.lastSearch,
    };
  },
  computed: {
    ...mapState({
      lastSearchComputed: " lastSearch",
    }),
    ...mapGetters({
      itemsInBasket: "itemsInBasket",
    }),
    somethingElse() {
      return 1 + 3;
    },
  },
};
</script>
