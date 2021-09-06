<template>
    <div>
        <!-- create_car start -->
        <div class="create_car">
            <form>
                <h1>차 매물 등록</h1>
                <div class="create_car_text">
                    <h3>Model:</h3>
                    <input class="form-control" type="text" placeholder="Ex: K7" v-model="car_model">
                    <h3>Maker: </h3>
                    <input class="form-control" type="text" placeholder="Ex: KIA" v-model="car_maker">
                    <h3>Price: </h3>
                    <input class="form-control" type="text" placeholder="Ex: 20" v-model="car_price">
                    <h3>Owner: </h3>
                    <input class="form-control" type="text" placeholder="Ex: 5T6Y7U8I" v-model="car_walletid">
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setCar">Set Car</button>
                    <h5 style="color:green;margin-bottom:2%" id="success_setcar">{{create_car}}</h5>
                </div>
            </form>
        </div>
        <!-- create_car end -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            create_car: '', // 반환 값
        };
    },
    methods: {
        setCar(car_model, car_maker, car_price, car_walletid) {
            axios.get('/api/setCar', { // controller.js 의 /api/setCar 를 호출
                params: { // parameter 호출 구문
                    model: this.car_model,
                    maker: this.car_maker,
                    price: this.car_price,
                    walletid: this.car_walletid, // Owner...?? 고쳐야할수도...?
                    sellername: this.car_walletid // 현재는 고정값. 계정 로그인시 고쳐야함.
                }
            }).then(response => { // 결과 반환 부분
                console.log("success_setcar");
                this.create_car = 'success_setcar'; // 화면에 출력되는 부분에 저장
            })
                // .catch(error => {
                //     alert(error)
                // })
        },
    },
}
</script>