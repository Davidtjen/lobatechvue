<template>
    <div class="d-flex">
        <i
            class="fas fa-star"
            v-for="star in fullStars"
            :key="'full' + star"
            @click="$emit('input', star)"
        ></i>
        <i class="fas fa-star-half-alt" v-if="halfStars"></i>
        <i
            class="far fa-star"
            v-for="star in emptyStars"
            :key="'empty' + star"
            @click="$emit('input', fullStars + star)"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        value: Number
    },
    computed: {
        halfStars() {
            const fraction = Math.round(
                (this.value - Math.floor(this.value)) * 100
            );

            return fraction > 0 && fraction < 50;
        },
        fullStars() {
            // > 4.5 = 5
            // 4.3 = 4.5
            return Math.round(this.value);
        },
        emptyStars() {
            // case 1.9, ceil(1.9) = 2 , 3 empty
            return 5 - Math.ceil(this.value);
        }
    },
    created() {
        // const numbers = [0.9, 4.0, 4.4, 4.5, 4.6, 4.9];
        // numbers.forEach(n => {
        //     console.log(`Round for ${n} is ${Math.round(n)}`);
        //     console.log(`Floor for ${n} is ${Math.floor(n)}`);
        //     console.log(`Ceil for ${n} is ${Math.ceil(n)}`);
        //     console.log(`===================================`);
        // });
    }
};
</script>
