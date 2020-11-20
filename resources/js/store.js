export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload;
        },
        addToBasket(state, payload) {
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload) {
            state.basket.items = state.basket.items.filter(
                item => item.bookable.id != payload
            );
        },
        setBasket(state, payload) {
            state.basket = payload;
        }
    },
    actions: {
        setLastSearchAction(context, payload) {
            context.commit("setLastSearch", payload);
            localStorage.setItem("lastSearched", JSON.stringify(payload));
        },
        loadStoredState(context) {
            const lastStoredSearch = localStorage.getItem("lastSearched");
            if (lastStoredSearch) {
                context.commit("setLastSearch", JSON.parse(lastStoredSearch));
            }

            const basket = localStorage.getItem("basket");
            if (basket) {
                context.commit("setBasket", JSON.parse(basket));
            }
        },
        addToBasket({ commit, state }, payload) {
            // context.commit, context.status
            commit("addToBasket", payload);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        removeFromBasket({ commit, state }, payload) {
            commit("removeFromBasket", payload);
            localStorage.setItem("basket", JSON.stringify(state.basket));
        },
        clearBasket({commit, state},payload){
        commit('setBasket', { items: [] });
        localStorage.setItem('basket', JSON.stringify(state.basket));
        }
    },
    getters: {
        itemsInBasket: state => state.basket.items.length,

        inBasketAlready(state) {
            return function(id) {
                return state.basket.items.reduce(
                    (result, item) => result || item.bookable.id == id,
                    false
                );
            };
        }
    }
};
