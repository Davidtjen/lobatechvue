<template>
  <div>
    <div class="row">
      <div class="col-md-8 pb-4">
        <div class="card" v-if="!loading">
          <div class="card-body">
            <h4>{{ bookable.title }}</h4>
            <hr />
            <article>{{ bookable.description }}</article>
          </div>
        </div>
        <div class="spinner-border text-secondary mt-2 text-center" v-else>
          <span class="sr-only">Loading...</span>
        </div>
        <review-list :bookable-id="this.$route.params.id"></review-list>
      </div>
      <div class="col-md-4 pb-4">
        <availability
          :bookable-id="this.$route.params.id"
          @availability="checkPrice($event)"
          class="mb-2"
        ></availability>

        <transition name="fade">
          <price-breakdown
            v-if="price"
            :price="price"
            class="mt-4"
          ></price-breakdown>
        </transition>

        <transition name="fade">
          <button
            class="btn btn-outline-secondary btn-block"
            v-if="price"
            @click="addToBasket"
            :disabled="inBasketAlready"
          >
            Book now !
          </button>
        </transition>

        <button
          class="btn btn-outline-secondary btn-block"
          v-if="inBasketAlready"
          @click="removeFromBasket"
        >
          Remove from basket !
        </button>

        <div v-if="inBasketAlready" class="mt-4 text-muted warning">
          Seems like you've already added this object to the basket. If you want
          to change dates, first remove from the basket.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState } from "vuex";

export default {
  data() {
    return {
      bookable: null,
      loading: false,
      price: null,
    };
  },
  created() {
    this.loading = true;

    axios.get(`/api/bookables/${this.$route.params.id}`).then((response) => {
      this.bookable = response.data.data;
      this.loading = false;
    });
  },
  components: {
    Availability,
    ReviewList,
    PriceBreakdown,
  },
  computed: {
    ...mapState({
      lastSearch: "lastSearch",
    }),
    inBasketAlready() {
      if (null == this.bookable) {
        return false;
      }
      return this.$store.getters.inBasketAlready(this.bookable.id);
    },
  },
  methods: {
    async checkPrice(hasAvailability) {
      if (!hasAvailability) {
        this.price = null;
        return;
      }

      try {
        this.price = (
          await axios.get(
            `/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`
          )
        ).data.data;
      } catch (err) {
        this.price = null;
      }
    },
    addToBasket() {
      this.$store.dispatch("addToBasket", {
        bookable: this.bookable,
        price: this.price,
        dates: this.lastSearch,
      });
    },
    removeFromBasket() {
      this.$store.dispatch("removeFromBasket", this.bookable.id);
    },
  },
};
</script>
<style scoped>
.warning {
  font-size: 0.7rem;
}
</style>
