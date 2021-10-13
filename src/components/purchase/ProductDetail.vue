<template>
    <div>
        <section class="banner bgwhite p-t-40 p-b-40">
            <div class="container">
                <div class="car_info">
                    <div class="car_img">
                        <img src="https://picsum.photos/1920/570/?image=814">
                    </div>
                    <div class="car_text">
                        <h3>모델명 : {{this.apiResponse[0].model}}</h3>
                        <h3>제조사 : {{this.apiResponse[0].maker}}</h3>
                        <h3>가격 : {{this.apiResponse[0].price}}</h3>
                        <h3>판매자 : {{this.apiResponse[0].walletid}}</h3>
                        <button id="purchaseCar" type="button" value="Purchase" class="btn btn-primary" @click="isModalViewed = true">구매하기</button>
                    </div>
                </div>
                <div class="car_detail">
                </div>
                <!-- modal start -->
                <h1>모달 컴포넌트 만들기 :)</h1>
                <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
                    <BuyCar />
                </ModalView>
                <!-- modal end -->
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';

import BuyCar from '@/components/purchase/BuyCar.vue';
import ModalView from "@/components/purchase/ModalView.vue";

export default {
    name: "ProductDetail",
    components: {
        BuyCar,
        ModalView,
    },
    created () {
        console.log(1);
        console.log(this.$route.params.productId);
        this.apiResponse = this.$route.params.productId;
        console.log(2);
        console.log(this.apiResponse);
        axios.get('/api/getCar', { // controller.js 의 /api/getWallet 를 호출
                params: { // parameter 전달 구문
                    carkey: this.$route.params.productId
                }
            }).then(response => {
                console.log(3);
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
                console.log(4);
                var array = []; // 데이터 정렬용 배열
                for (var i = 0; i < data.length; i++){
                    data[i].Key = this.carkey;
                    data[i].model = data[i].Model;
                    data[i].maker = data[i].Maker;
                    data[i].price = data[i].Price;
                    data[i].walletid = data[i].WalletID;
                    data[i].sellername = data[i].Sellername;
                    array.push(data[i]);
                }
                console.log(array);
                this.apiResponse = array; // 화면에 출력되는 부분에 저장
                console.log(5);
                console.log(this.apiResponse);
                console.log(6);
                console.log(this.apiResponse[0].maker);
                console.log(7);
            });
    },
    data() {
        return {
            isModalViewed: false,
        };
    },
    methods: {
        purchaseCar() { 
        },
    },
};
</script>

<style scoped>
.car_info{
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
}
.car_info>.car_img {
    order: 0;
    overflow:hidden;
    width: 600px;
    height: 600px;
    flex-grow: 3;
    margin-right: 10px;
    border: 1px solid black;
}
.car_img>img {
    width:100%;
    height:100%;
    object-fit:cover;
}
.car_info>.car_text {
    order: 1;
    height: 600px;
    width: 500px;
    text-align: left;
    font-size: 15px;
    flex-grow: 2;
    margin-left: 10px;
    padding: 15px;
    position:relative;
    border: 1px solid black;
}
.car_text>button {
    position: absolute; right: 0px; bottom: 0px;
    margin: 15px;
}
</style>