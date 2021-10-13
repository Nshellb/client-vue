<template>
    <div>
        <!-- getRepair start -->
        <div class="getRepair">
            <form>
                <h1>사고 및 수리 내역 조회</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <input class="form-control" type="text" placeholder="Ex: REPAIR1" v-model="repairkey">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <button id="getRepair" type="button" value="Search" class="btn btn-primary" @click="getRepair">Get repair</button>
                        <button id="getAllRepair" type="button" value="Get all repair" class="btn btn-primary" @click="getAllRepair">Get all repair</button>
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_getRepair">{{ success_query }}</h5>
            </form>
        </div>
        <!-- getRepair end -->


        <!-- repairCar start -->
        <div class="repairCar">
            <table id="allCar" class="table table-striped table-hover" align="center">
                <tr>
                    <th>ID</th>
                    <th>Engineer</th>
                    <th>Date</th>
                    <th>Car</th>
                    <th>Information</th>
                </tr>
                <tr v-for="(repair, index) in apiResponse" :key="index">
                    <td>{{repair.Key}}</td>
                    <td>{{repair.engineer}}</td>
                    <td>{{repair.date}}</td>
                    <td>{{repair.rcar}}</td>
                    <td>{{repair.informaion}}</td>
                </tr>
                <!-- <tr>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                </tr> -->
            </table>
            <h5 style="color:green;margin-bottom:2%" id="success_getallrepair">{{ purchase_car }}</h5>
            {{ apiResponse }}
        </div>
        <!-- repairCar end -->
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
        getRepair(repairkey) {
            this.apiResponse = null; // 받아온값이 저장되는 변수 초기화
            axios.get('/api/getRepair', { // controller.js 의 /api/getWallet 를 호출
                params: { // parameter 전달 구문
                    repairkey: this.repairkey
                }
            }).then(response => { // 결과 반환 부분
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
                var array = []; // 데이터 정렬용 배열
                for (var i = 0; i < data.length; i++){
                    data[i].Key = this.repairkey;
                    data[i].engineer = data[i].Engineer;
                    data[i].date = data[i].Date;
                    data[i].car = data[i].Car;
                    data[i].information = data[i].Information;
                    array.push(data[i]);
                }
                this.apiResponse = array; // 화면에 출력되는 부분에 저장
                console.log("success_getRepair");
                this.purchase_car = 'success_getRepair'; // 화면에 출력되는 부분에 저장
                this.success_query = 'success_query';
            })
                // .catch(error => {
                //     alert(error)
                // })
        },
        getAllRepair() {
            this.apiResponse = null; // 받아온값이 저장되는 변수 초기화
            axios.get('/api/getAllRepair') // controller.js 의 /api/getAllRepair 를 호출
            .then(response => { // 결과 반환 부분
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
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
                this.apiResponse = array; // 화면에 출력되는 부분에 저장
                console.log("success_getallrepair");
                this.purchase_car = 'success_getallrepair'; // 화면에 출력되는 부분에 저장
            })
                // .catch(error => { // error catch
                //     alert(error)
                // })
        },
        repairCar() {
            let allCar = document.getElementById('allCar');
            let selectCar = '';
            let walletid = '';

            for (let i = 1; i < allCar.rows.length; i++) {
                allCar.rows[i].cells[5].onclick = function () {
                    selectCar = allCar.rows[i].cells[0].innerText; // 선택한 행의 key 값
                    walletid = allCar.rows[i].cells[4].innerText; // 선택한 행의 판매자 값
                    alert(selectCar+"와 "+walletid+"을 선택하셨습니다.");
                    axios.get('/api/repairCar', { // controller.js 의 /api/repairCar 를 호출
                        params: { // parameter 전달 구문
                            walletid: walletid,
                            repairkey: selectCar,
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
    },
}
</script>