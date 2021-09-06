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
                        <button id="getWallet" type="button" value="Search" class="btn btn-primary" @click="getWallet">Search</button>
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
            search_wallet: [],
        };
    },
    methods: {
        getWallet(walletid) {
            axios.get('/api/getWallet', { // controller.js 의 /api/getWallet 를 호출
                params: { // parameter 호출 구문
                    walletid: this.walletid
                }
            }).then(response => { // 결과 반환 부분
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
                console.log("success_getwallet");
                this.search_wallet = data; // 화면에 출력되는 부분에 저장
            })
                // .catch(error => {
                //     alert(error)
                // })
        },
        // getWallet(walletid) { // 이전버전 참고용
        //     axios.get('/api/getWallet?walletid=' + this.walletid)
        //     .then(response => {
        //         this.search_wallet = response;
        //     })
        //         // .catch(error => {
        //         //     alert(error)
        //         // })
        //     // api 호출로 가져온 데이터를 임시 공간에 저장
        // },
    },
}
</script>