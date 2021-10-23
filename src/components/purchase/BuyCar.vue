<template>
    <div>
        <div class="buycar m-text15 p-b-12">
            <!-- 상품 정보 -->
            <h3>모델명 : {{this.apiResponse[0].model}}</h3>
            <h3>제조사 : {{this.apiResponse[0].maker}}</h3>
            <h3>가격 : {{this.apiResponse[0].price}}</h3>
            <h3>판매자 : {{this.apiResponse[0].walletid}}</h3>
            <h3>판매자 : {{this.apiResponse[0].Key}}</h3>

            <!-- 트랜젝션 대기 안내 -->
            <h3>처리가 1~2분 걸릴수 있으니 완료창이 보이기 전까지 닫지 말아주세요.</h3>

            <!-- 구매하는 차량의 정보를 확인했습니다. - 체크박스 -->
            <label><input type="checkbox" v-model="checked" value="true">구매하는 차량의 정보와 안내사항을 확인했습니다.</label>


            <!-- 구매하기 버튼 -->
            <!-- 구매 성공후 alert 띄움. -->
            <button id="paymentCar" type="button" value="PaymentCar" class="paymentCar btn btn-primary" 
            @click="payCar" :disabled="checked == false">결제</button>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            apiResponse: [],
            checked: false,
            product_carkey: '',
            product_walletid: '',
        };
    },
    computed: {
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
        }),
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
            this.product_carkey = this.$route.params.productId;
            console.log(this.product_carkey);
            console.log(8);
            this.product_walletid = this.apiResponse[0].walletid;
            console.log(this.product_walletid);
            console.log(9);
            console.log(10);
        });
    },
    methods: {
        payCar() {
            console.log(this.product_carkey);
            console.log(this.product_walletid);
            
            axios.get('/api/purchaseCar', { // controller.js 의 /api/purchaseCar 를 호출
                params: { // parameter 전달 구문
                    walletid: this.user_info[0].id, // 구매자
                    walletid_1: this.product_walletid, // 판매자
                    carkey: this.product_carkey,
                }
            }).then(response => { // 결과 반환 부분
                this.$router.push({
                    path: '/purchase'
                })
                this.$router.go();
            })
        }
    },
}
</script>

<style>
.buycar {
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;

}
h3 {
    font-size: 20px;
    text-align: left;
    padding-bottom: 10px;
}
button.paymentCar {
    position: absolute; right: 0px; bottom: 0px;
    margin-bottom: 30px;
    margin-right: 50px;
}
</style>