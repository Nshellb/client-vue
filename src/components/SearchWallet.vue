<template>
    <div>
        <!-- search_wallet start -->
        <div class="search_wallet">
            <form>
                <h1>지갑 검색</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <input type="text" class="form-control" v-model="walletid" placeholder="1Q2W3E4R">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <button id="getWallet" type="button" value="Search" class="btn btn-primary" @click="getWallet"></button>
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_getwallet">{{search_wallet}}</h5>
            </form>
        </div>
        <!-- search_wallet end -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            walletid: '', // 입력 필드 및 전달값
            search_wallet: [],
            apiResponse: [],
        };
    },
    methods: {
        getWallet(walletid) {
            axios.get('/api/getWallet?walletid=' + this.walletid)
            .then(response => {
                this.search_wallet = response;
            })
                // .catch(error => {
                //     alert(error)
                // })
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

        appFactory.getWallet($scope.walletid, function(data){
            $scope.search_wallet = data;
            $("#success_getwallet").show();
        });
    }
}
</script>