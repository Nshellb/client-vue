<template>
    <div>
        <section class="banner bgwhite p-t-40 p-b-40">
            <div class="container">
                <div class="car_info">
                    <div class="car_img">
                        <img class="car_img" :src="this.apiResponse[0].thumbnail" alt="IMG-PRODUCT">
                    </div>
                    <div class="car_text">
                        <div class="car_title_d">{{this.apiResponse[0].title}}</div>

                        <div class="car_price_box_d">
                            <span class="car_price_d">{{ this.carPrice }}</span>
                            <span class="car_price_unit_d"> 만원</span>
                        </div>

                        <div class="car_desc">
                            <div class="car_desc_sub_d">연식 : {{ this.apiResponse[0].yeardetail }}</div>
                            <div class="car_desc_sub_d">색상 : {{ this.apiResponse[0].color }}</div>
                            <div class="car_desc_sub_d">주행거리 : {{ this.carDistancedriven }}km</div>
                            <div class="car_desc_sub_d">연료 : {{ this.apiResponse[0].fuel }}</div>
                            <div class="car_desc_sub_d">변속기 : {{ this.apiResponse[0].gearbox }}</div>
                            <div class="car_desc_sub_d">차종 : {{ this.apiResponse[0].cartype }}</div>
                            <div class="car_desc_sub_d">지역 : {{ this.apiResponse[0].region }}</div>
                            <div class="car_desc_sub_d">판매자 : {{ this.apiResponse[0].WalletID }}</div>
                        </div>

                        <!-- 수리 이력 : N회
                        수리 상세 이력 :  -->
                        
                        <button id="purchaseCar" type="button" value="Purchase" class="btn btn-primary" @click="isModalViewed = true" :disabled="this.user_info[0].name === null">구매하기</button>
                        <div class="isLogin" v-if="this.user_info[0].name === null">* 로그인을 먼저 진행해 주세요.</div>
                    </div>
                </div>
                <div class="car_detail">
                </div>
                <!-- modal start -->
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
import { mapState } from 'vuex';

import BuyCar from '@/components/purchase/BuyCar.vue';
import ModalView from "@/components/purchase/ModalView.vue";

export default {
    name: "ProductDetail",
    data() {
        return {
            apiResponse: [],
            isModalViewed: false,
            carPrice: '',
            carDistancedriven: '',
        };
    },
    computed: {
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
        }),
        payCalculate() {
            this.payPrice = this.user_info[0].token - this.apiResponse[0].price;
        }
    },
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
                data[i].thumbnail = data[i].Thumbnail;
                data[i].title = data[i].Title;
                data[i].country = data[i].Country;
                data[i].cartype = data[i].CarType;
                data[i].manufacturer = data[i].Manufacturer;
                data[i].model = data[i].Model;
                data[i].modelgen = data[i].ModelGen;
                data[i].modeldetail = data[i].ModelDetail;
                data[i].year = data[i].Year;
                data[i].yeardetail = data[i].YearDetail;
                data[i].distanceDriven = data[i].DistanceDriven;
                data[i].price = data[i].Price;
                data[i].sellercategory = data[i].SellerCategory;
                data[i].color = data[i].Color;
                data[i].fuel = data[i].Fuel;
                data[i].gearbox = data[i].Gearbox;
                data[i].option = data[i].Option;
                data[i].accident = data[i].Accident;
                data[i].seaters = data[i].Seaters;
                data[i].region = data[i].Region;
                data[i].badge = data[i].Badge;
                data[i].insurancehistory = data[i].InsuranceHistory;
                data[i].shipping = data[i].Shipping;
                data[i].walletid = data[i].WalletID;
                data[i].sellername = data[i].SellerName;
                data[i].purchasecount = data[i].PurchaseCount;
                data[i].repaircount = data[i].RepairCount;
                array.push(data[i]);
            }
            console.log(array);
            this.apiResponse = array; // 화면에 출력되는 부분에 저장
            console.log(5);
            console.log(this.apiResponse);
            console.log(6);
            console.log(this.apiResponse[0].price);
            console.log(7);

            // 주행거리 , 추가
            this.carDistancedriven = this.apiResponse[0].DistanceDriven.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            console.log(this.carDistancedriven);
            console.log(8);


            // 차량 가격 , 추가 
            const temp_num = this.apiResponse[0].price * 0.0001;
            console.log(temp_num);
            this.carPrice = temp_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            console.log(this.carPrice);
        });
    },
};
</script>

<style scoped>
.car_info{
    display: flex;
    justify-content: space-between;
    /* border: 1px solid black; */
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


.car_price_box_d {
    font-family: Nanum Gothic;
    text-align: right;
    left:0; right:0; margin-left:auto; margin-right:auto;
    top: 0; bottom:0; margin-top:auto; margin-bottom:auto;
}

.car_price_d {
    font-weight: bold;
    font-size: 30px;
    color: #e65540;
}

.car_price_unit_d {
    font-weight: bold;
    font-size: 20px;
}


.car_title_d {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 22px;
    color: #141414;
}

.car_desc_sub_d {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 16px;
    margin-top: 15px;
    color: #444444;
}


.isLogin {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 15px;
    color: #e65540;
    position: absolute; left: 0px; bottom: 0px;
    margin: 15px;
}

</style>