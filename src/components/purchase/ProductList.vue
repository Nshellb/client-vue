<template>
    <div>
        <template v-for="product in products">
            <div>
                <Product :product="product" />
            </div>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Product from '@/components/Product.vue';

export default {
    computed: {
        ...mapState('product', {
            products: state => state.products // 상품 정보를 가져옴.
        })
    },
    created() {
        this.$store.dispatch('product/setProducts');
    },
    components: {
        Product,
    }
}
</script>