<template>
    <div>
        <!-- set_wallet start -->
        <div class="create_car">
            <form>
                <h1>계정 생성</h1>
                <div class="create_car_text">
                    <!-- name 입력 -->
                    <h3>name:</h3>
                    <input class="form-control" type="text" placeholder="Ex: beak_gw" v-model="user_name">
                    <!-- id 입력 (중복확인 필요) -->
                    <h3>wallet_id: </h3>
                    <input class="form-control" type="text" placeholder="Ex: bgw1212" v-model="user_walletId">
                    <!-- 계정 생성 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setWallet">Set Car</button>
                </div>
            </form>
        </div>
        <!-- set_wallet end -->
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        setWallet(user_name, user_walletId) {
            alert("다음 안내창까지 기다려주세요.");
            axios.get('/api/setWallet', {
                params: {
                    name: this.user_name,
                    id: this.user_walletId,
                    coin: 100, // coin 입력 (def)
                }
            }).then(response => {
                console.log("Success_setWalletId");
                alert("계정 생성에 성공했습니다."); // 결과 alret (성공/실패)
                // 로그인 페이지로 이동
                this.$router.push({
                    path: '/join'
                })
            })
        },
    },
}
</script>