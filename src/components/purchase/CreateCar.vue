<template>
    <div>
        <div class="container">
            <!-- create_car start -->
            <div class="create_car">
                <form>
                    <h1>차 매물 등록</h1>
                    <div class="create_car_text">
                        <h3>thumbnail:</h3>
                        <input class="form-control" type="text" placeholder="Ex: K7" v-model="car_thumbnail">
                        <h3>title: </h3>
                        <input class="form-control" type="text" placeholder="Ex: KIA" v-model="car_title">
                        <h3>country: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_country">
                        <h3>cartype: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_cartype">
                        <h3>manufacturer: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_manufacturer">
                        <h3>model: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_model">
                        <h3>modelgen: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_modelgen">
                        <h3>modeldetail: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_modeldetail">
                        <h3>year: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_year">
                        <h3>yeardetail: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_yeardetail">
                        <h3>distancedriven: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_distancedriven">
                        <h3>price: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_price">
                        <h3>sellercategory: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_sellercategory">
                        <h3>color: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_color">
                        <h3>fuel: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_fuel">
                        <h3>gearbox: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_gearbox">
                        <h3>option: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_option">
                        <h3>accident: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_accident">
                        <h3>seaters: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_seaters">
                        <h3>region: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_region">
                        <h3>badge: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_badge">
                        <h3>insurancehistory: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_insurancehistory">
                        <h3>shipping: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_shipping">
                        <h3>walletid: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_walletid">
                        <h3>sellername: </h3>
                        <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_sellername">
                        <!-- <h5 style="color:green;margin-bottom:2%" id="success_setcar">{{create_car}}</h5> -->
                    </div>
                </form>
            </div>
            <!-- create_car end -->
            
            <!-- 수정모드 미구현 -->
            <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setCar">등록</button>
            <!-- <button id="saveCar" type="button" value="save car" class="btn btn-primary" @click="updateMode ? updateContent() : uploadContent()">저장</button> -->
            <button id="saveCancel" type="button" value="cancel save" class="btn btn-primary" @click="cancel">취소</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            create_car: '', // 반환 값
            updateMode: this.$route.params.contentId > 0 ? true : false, // update 상태인지 확인하기 위한 변수
        };
    },
    computed: {
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
        }),
    },
    // async created() {
    //     if (this.$route.params.contentId > 0) { // 게시글 번호가 감지되는 경우
    //         const contentId = Number(this.$route.params.contentId)
    //         this.updateObject = data.Content.filter(item => item.content_id === contentId)[0] // content_id에 해당하는 data를 빼온다.
    //         this.subject = this.updateObject.title; // 현재 가져온 data 객체에서 title만 가져옴
    //         this.context = this.updateObject.context; // 현재 가져온 data 객체에서 context만 가져옴
    //     }
    // },
    methods: {
        setCar(car_model, car_maker, car_price, car_walletid) {
            axios.get('/api/setCar', { // controller.js 의 /api/setCar 를 호출
                params: { // parameter 호출 구문
                    thumbnail: this.car_thumbnail,
                    title: this.car_title, 
                    country: this.car_country, 
                    cartype: this.car_cartype, 
                    manufacturer: this.car_manufacturer, 
                    model: this.car_model, 
                    modelgen: this.car_modelgen, 
                    modeldetail: this.car_modeldetail, 
                    year: this.car_year, 
                    yeardetail: this.car_yeardetail, 
                    distancedriven: this.car_distancedriven, 
                    price: this.car_price, 
                    sellercategory: this.car_sellercategory, 
                    color: this.car_color, 
                    fuel: this.car_fuel, 
                    gearbox: this.car_gearbox, 
                    option: this.car_option, 
                    accident: this.car_accident, 
                    seaters: this.car_seaters, 
                    region: this.car_region, 
                    badge: this.car_badge, 
                    insurancehistory: this.car_insurancehistory, 
                    shipping: this.car_shipping, 
                    walletid: this.user_info[0].id, // vuex 에서 로그인한 사용자 정보를 가져옴
                    sellername: this.user_info[0].id, // vuex 에서 로그인한 사용자 정보를 가져옴
                }
            }).then(response => { // 결과 반환 부분
                alert("등록까지 1~2분 소요될 수 있습니다. 안내창을 기다려주세요.");
                console.log("success_setcar");
                this.create_car = 'success_setcar'; // 화면에 출력되는 부분에 저장
                alert("상품이 등록되었습니다.");
                this.$router.push({
                    path: '/purchase'
                })
                this.$router.go();
            })
                // .catch(error => {
                //     alert(error)
                //     if(this.car_model == null)
                //     {
                //         배열 += 차량 모델명;
                //     }
                //     if(this.car_price == null)
                //     {
                //         배열 += 차량 가격;
                //     }
                //     alert(배열 + "을 다시 입력해 주세요.");
                // })
        },
        cancel() {
            this.$router.push({
                path: '/purchase'
            })
        },
    },
}
</script>