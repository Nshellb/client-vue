<template>
    <div>
        <!-- getCar start -->
        <div class="getCar">
            <form>
                <h1>차 매물 조회</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <!-- ng-model : 데이터 바인딩용 변수. 추후 vuex 활용하면 가능할것. -->
                        <input class="form-control" type="text" placeholder="Ex: CAR1" ng-model="carkey">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <input id="getCar" type="submit" value="Search" class="btn btn-primary" @click="getCar">
                        <input id="getAllCar" type="submit" value="Get all car" class="btn btn-primary" @click="getAllCar_click">
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_getcar">Success to query</h5>
            </form>
        </div>
        <!-- getCar end -->


        <!-- purchaseCar start -->
        <div class="purchaseCar">
            <table id="allCar" class="table table-striped table-hover" align="center">
                <tr>
                    <th>ID</th>
                    <th>Model</th>
                    <th>Maker</th>
                    <th>Price</th>
                    <th>Owner</th>
                    <th>Buy</th>
                </tr>
                <tr v-for="(car, index) in apiResponse" :key="index">
                    <td>{{car.Key}}</td>
                    <td>{{car.model}}</td>
                    <td>{{car.maker}}</td>
                    <td>{{car.price}}</td>
                    <td>{{car.walletid}}</td>
                    <td><input id="purchaseCar" type="submit" value="구매" ng-click="purchaseCar(car.Key)"></td>
                </tr>
                <!-- <h5 style="color:green;margin-bottom:2%" id="success_getallcar">{{purchase_car}}</h5> -->
            </table>
        </div>
        <!-- purchaseCar end -->
        <!-- {{apiResponse}} -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            apiResponse: [],
        };
    },
    methods: {
        getCar() {},
        getAllCar_click() {
            // api 호출로 가져온 데이터를 임시 공간에 저장
        },
    },
    async created () {
        this.apiResponse = null;
        const { data } = await axios.get('/api/getAllCar'); // 전체 결과중에서 data 부분만 가져옴, { data } 미사용시 뒤에 각종 쿼리 결과까지 붙어옴...
        //this.apiResponse = data;
        console.log(data);
        var array = []; // 데이터 정렬용 배열
        for (var i = 0; i < data.length; i++){
            parseInt(data[i].Key);
            data[i].Record.Key = data[i].Key;
            array.push(data[i].Record);
        }
        array.sort(function(a, b) {
            return parseFloat(a.Key) - parseFloat(b.Key);
        });
        this.apiResponse = array;
    }
}
</script>