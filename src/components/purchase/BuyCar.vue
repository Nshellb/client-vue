<template>
    <div>
        <div class="buycar m-text15 p-b-12">
            <!-- 상품 정보 -->
            <div class="car_desc_sub_d">모델명 : {{ this.apiResponse[0].title }}</div>
            <div class="car_desc_sub_d">연식 : {{ this.apiResponse[0].yeardetail }}</div>
            <div class="car_desc_sub_d">색상 : {{ this.apiResponse[0].color }}</div>
            <div class="car_desc_sub_d">주행거리 : {{ this.carDistancedriven }}km</div>
            <div class="car_desc_sub_d">연료 : {{ this.apiResponse[0].fuel }}</div>
            <div class="car_desc_sub_d">변속기 : {{ this.apiResponse[0].gearbox }}</div>
            <div class="car_desc_sub_d">차종 : {{ this.apiResponse[0].cartype }}</div>
            <div class="car_desc_sub_d">지역 : {{ this.apiResponse[0].region }}</div>

            <!-- 구매하는 차량의 정보를 확인했습니다. - 체크박스 -->
            <label><input type="checkbox" v-model="checked" value="true" class="noti-check">구매하는 차량의 정보를 확인했습니다.</label>


            <!-- 구매하기 버튼 -->
            <!-- 구매 성공후 alert 띄움. -->
            <button id="buyCar" type="button" value="buyCar" class="buyCar btn btn-primary" 
            @click="payCar" :disabled="checked == false">다음</button>
            
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
            
            this.$router.push({
                path: `/purchase/paycar/`+ this.product_carkey
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

button.buyCar {
    position: absolute; right: 0px; bottom: 0px;
    margin-bottom: 30px;
    margin-right: 50px;
}

.noti-check{
    margin-top: 50px;
}

</style>