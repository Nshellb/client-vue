<template>
    <div class="car-info-container bor-bo">
        <!-- 이미지 box -->
        <div class="car_img_box">
            <img class="car_img" :src="product.thumbnail" alt="IMG-PRODUCT">
        </div>

        <div class="car_info_box">
            <router-link :to="{name: 'productdetail', params: {productId: product.Key}, props: true}" class="block2-name dis-block s-text3 p-b-5">
                <span class="car_title">{{ product.Record.title }}</span>
            </router-link>
            <div class="car_desc">
                <span class="car_desc_sub">{{ product.Record.yearDetail }}</span>
                <span class="car_desc_sub">{{ product.Record.distanceDriven }}km</span>
                <span class="car_desc_sub">{{ product.Record.fuel }}</span>
                <span class="car_desc_sub">{{ product.Record.gearbox }}</span>
                <span class="car_desc_sub">{{ product.Record.region }}</span>
            </div>
        </div>

        <div class="car_price_box">
            <span class="car_price">{{ product.Record.price }}</span>
            <span class="car_price_unit"> 만원</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        addToCart(product){
            this.$store.dispatch('cart/addItem', product);
        }
    },

}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

.car-info-container {
    display: grid;
    grid-template-columns: 3fr 8fr 2fr;
    gap: 50px;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
}

.car_img_box {
    min-width: 300px;
}

.car_img {
    width: 300px;
    height: 200px;
    object-fit: cover;
}

.car_info_box {
    text-align: left;
    margin-left: 30px;
}

.car_title {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 20px;
    color: #141414;
}

.car_desc {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 16px;
    margin-top: 15px;
    color: #7e7e7e;
}

.car_desc_sub {
    margin-right: 18px;
}

.car_price_box {
    font-family: Nanum Gothic;
    text-align: center;
    left:0; right:0; margin-left:auto; margin-right:auto;
    top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
}

.car_price {
    font-weight: bold;
    font-size: 30px;
    color: #e65540;
}

.car_price_unit {
    font-weight: bold;
    font-size: 20px;
}

</style>