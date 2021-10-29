<template>
    <div class="car-info-container bor-bo">
        <!-- 이미지 box -->
        
        <div class="car_img_box block2-img wrap-pic-w of-hidden pos-relative" :class="{'block2-labelnew': product.badge === 'new', 'block2-labelsale': product.badge === 'sale'}">
            <img class="car_img" :src="product.Record.thumbnail" alt="IMG-PRODUCT">

            <div class="block2-overlay trans-0-4">
                <div class="block2-btn-addcart w-size1 trans-0-4">
                    <!-- Button -->
                    <button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" @click="addToCart(product)">
                        <span class="">관심목록에 추가</span>
                    </button>
                </div>
            </div>
        </div>


        <div class="car_info_box">
            <router-link :to="{name: 'productdetail', params: {productId: product.Key}, props: true}" class="block2-name dis-block s-text3 p-b-5">
                <span class="car_title">{{ product.Record.title }}</span>
            </router-link>
            <div class="car_desc">
                <span class="car_desc_sub">{{ product.Record.yeardetail }}</span>
                <span class="car_desc_sub">{{ this.carDistancedriven }}km</span>
                <span class="car_desc_sub">{{ product.Record.fuel }}</span>
                <span class="car_desc_sub">{{ product.Record.gearbox }}</span>
                <span class="car_desc_sub">{{ product.Record.region }}</span>
            </div>
        </div>

        <div class="car_price_box">
            <span class="car_price">{{ this.carPrice }}</span>
            <span class="car_price_unit"> 만원</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            carPrice: '',
            carDistancedriven: '',
        }
    },
    mounted() {
        // 주행거리 , 추가
        this.carDistancedriven = this.product.Record.distancedriven.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        // 차량 가격 , 추가
        const temp_num = parseInt(this.product.Record.price) * 0.0001;
        this.carPrice = temp_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    },
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