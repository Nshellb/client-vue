<template>
    <div>
        <section class="banner bgwhite p-t-40 p-b-40">
            <div class="container">
                <!-- addressAndpay_car start -->
                <div class="addressAndpay_car">
                    <form>
                        <!-- 주소 -->
                        <h1>구매 진행</h1>
                        <div class="address_text">
                            <span>주소:</span>
                            <input type="text" placeholder="Ex: 대전광역시 동서대로 125 한밭대학교 N4동" v-model="shipping_address">
                        </div>

                        <!-- 현재 금액 -->
                        <div class="moneyArea">
                            <h3>현재 로그인 계정 : {{this.user_info[0].name}}</h3>
                            <h3>잔액 : {{this.user_info[0].token}} 원</h3>
                            <h3>결제 금액 : {{this.apiResponse[0].price}} 원</h3>
                            <!-- 잔액이 결제 금액보다 적으면 결제버튼 비활성화 -->
                            <h3>결제 후 잔액 : {{this.payPrice}} 원</h3>
                            <!-- 충전을 모달창에서 진행 -->
                        </div>

                        <div v-if="this.payPrice < 0">금액이 부족합니다. 금액을 먼저 충전해 주세요.</div>

                        <button id="chargeToken" type="button" value="chargeToken" class="chargeToken btn btn-primary" 
                        @click="isModalViewed = true" :disabled="this.user_info[0].name === null"
                        v-if="this.payPrice < 0">충전</button>

                        <button id="paymentCar" type="button" value="PaymentCar" class="paymentCar btn btn-primary" 
                        @click="payCar" :disabled="this.user_info[0].name === null || this.payPrice < 0"
                        v-if="this.payPrice > 0">결제</button>
                    </form>
                </div>
                <!-- addressAndpay_car end -->

                <!-- modal start -->
                <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
                    <ChargeMoney 
                        :insufficientAmount="this.payPrice" 
                        :walletid="this.user_info[0].name"
                        @close-modal="isModalViewed = false"
                    />
                </ModalView>
                <!-- modal end -->
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import ModalView from "@/components/purchase/ModalView.vue";
import ChargeMoney from "@/components/purchase/ChargeMoney.vue";

export default {
    name: "shipping",
    data() {
        return {
            apiResponse: [],
            isModalViewed: false,
            carPrice: '',
            shipping_address: '',
            payPrice: 0, // 지불 금액
            purchaseCarkey: '',
            sellerID: '',
        };
    },
    components: {
        ModalView,
        ChargeMoney,
    },
    computed: {
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
        }),
    },
    // mounted () {
    //     this.payPrice = parseInt(this.user_info[0].token) - parseInt(this.apiResponse[0].price);
    // },
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


            // 차량 가격 , 추가 
            const temp_num = this.apiResponse[0].price * 0.0001;
            console.log(temp_num);
            this.carPrice = temp_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            console.log(this.carPrice);

            this.payPrice = parseInt(this.user_info[0].token) - parseInt(this.apiResponse[0].price);

            this.purchaseCarkey = this.$route.params.productId;
            this.sellerID = this.apiResponse[0].walletid;
        });
    },
    methods: {
        payCar() {
            console.log(this.user_info[0].id);
            console.log(this.$route.params.productId);
            console.log(this.apiResponse[0].walletid);
            
            axios.get('/api/purchaseCar', { // shipping page 로 이동
                params: { // parameter 전달 구문
                    walletid: this.user_info[0].id, // 구매자
                    walletid_1: this.apiResponse[0].walletid, // 판매자
                    carkey: this.$route.params.productId,
                }
            }).then(response => { // 결과 반환 부분
                this.$router.push({
                    path: '/purchase'
                })
            })
        }
    },
};
</script>

<style scoped>
/* .addressAndpay_car {

} */

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

.paymentCar{
    align-self: right;
}

</style>