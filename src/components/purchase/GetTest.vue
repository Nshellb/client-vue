<template>
    <div>
        <!-- getCar start -->
        <div class="getCar">
            <form>
                <h1>차 매물 조회</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <input class="form-control" type="text" placeholder="Ex: CAR1" v-model="carkey">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <button id="getCar" type="button" value="Search" class="btn btn-primary" @click="getCar">get car</button>
                        <button id="getAllCar" type="button" value="Get all car" class="btn btn-primary" @click="getAllCar">get all car</button>
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_getcar">{{ success_query }}</h5>
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
                    <td><button class="btn btn-primary" id="purchaseCar" type="button" value="구매" @click="purchaseCar">구매</button></td>
                </tr>
                <!-- <tr>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td><button class="btn btn-primary" id="purchaseCar" type="button" value="구매" @click="purchaseCar">구매</button></td>
                </tr> -->
            </table>
            <h5 style="color:green;margin-bottom:2%" id="success_getallcar">{{ purchase_car }}</h5>
            {{ apiResponse }}
        </div>
        <!-- purchaseCar end -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            apiResponse: [],
            success_query: '',
        };
    },
    methods: {
        getCar(carkey) {
            this.apiResponse = null; // 받아온값이 저장되는 변수 초기화
            axios.get('/api/getCar', { // controller.js 의 /api/getWallet 를 호출
                params: { // parameter 전달 구문
                    carkey: this.carkey
                }
            }).then(response => { // 결과 반환 부분
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
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
                this.apiResponse = array; // 화면에 출력되는 부분에 저장
                console.log("success_getcar");
                this.purchase_car = 'success_getcar'; // 화면에 출력되는 부분에 저장
                this.success_query = 'success_query';
            })
                // .catch(error => {
                //     alert(error)
                // })
        },
        getAllCar() {
            this.apiResponse = null; // 받아온값이 저장되는 변수 초기화
            axios.get('/api/getAllCar') // controller.js 의 /api/getAllCar 를 호출
            .then(response => { // 결과 반환 부분
                const data = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
                console.log("success_getallcar");
                this.purchase_car = 'success_getallcar'; // 화면에 출력되는 부분에 저장
            })
                // .catch(error => { // error catch
                //     alert(error)
                // })
        },
        purchaseCar() {
            let allCar = document.getElementById('allCar');
            let selectCar = '';
            let walletid = '';

            for (let i = 1; i < allCar.rows.length; i++) {
                allCar.rows[i].cells[5].onclick = function () {
                    selectCar = allCar.rows[i].cells[0].innerText;
                    walletid = allCar.rows[i].cells[4].innerText;
                    alert(selectCar+"와 "+walletid+"을 선택하셨습니다.");
                    axios.get('/api/purchaseCar', { // controller.js 의 /api/purchaseCar 를 호출
                        params: { // parameter 전달 구문
                            walletid: walletid,
                            carkey: selectCar,
                        }
                    }).then(response => { // 결과 반환 부분
                        var array = []; // 데이터 정렬용 배열
                        for (var i = 0; i < data.length; i++){
                            parseInt(data[i].Key);
                            data[i].Record.Key = data[i].Key;
                            array.push(data[i].Record);
                        }
                        array.sort(function(a, b) {
                            return parseFloat(a.Key) - parseFloat(b.Key);
                        });
                        this.apiResponse = array; // 화면에 출력되는 부분에 저장
                    })
                }
            }
        },
        // purchaseCar() { // 표 내용 값 가져오기 참고용
        //     let allCar = document.getElementById('allCar');
        //
        //     for (let i = 1; i < allCar.rows.length; i++) {
        //         allCar.rows[i].cells[5].onclick = function () {
        //             let selectCar = allCar.rows[i].cells[0].innerText;
        //             alert(selectCar+"을 선택하셨습니다.");
        //         }
        //     }
        // },
        //
        // getAllCar_click() { // 이전버전 참고용
        //     // api 호출로 가져온 데이터를 임시 공간에 저장
        //     this.apiResponse = null;
        //     const { data } = axios.get('/api/getAllCar'); // 전체 결과중에서 data 부분만 가져옴, { data } 미사용시 뒤에 각종 쿼리 결과까지 붙어옴...
        //     //this.apiResponse = data;
        //     console.log(data);
        //     var array = []; // 데이터 정렬용 배열
        //     for (var i = 0; i < data.length; i++){
        //         parseInt(data[i].Key);
        //         data[i].Record.Key = data[i].Key;
        //         array.push(data[i].Record);
        //     }
        //     array.sort(function(a, b) {
        //         return parseFloat(a.Key) - parseFloat(b.Key);
        //     });
        //     this.apiResponse = array;
        // },
    },
}
</script>