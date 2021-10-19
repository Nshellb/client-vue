// 계정 생성
<template>
    <div>
        <!-- set_wallet start -->
        <div class="create_car">
            <form>
                <h1>계정 생성</h1>
                <div class="create_car_text">
                    <!-- name 입력 -->
                    <h3>name:</h3>
                    <input class="form-control" type="text" placeholder="Ex: K7" v-model="car_model">
                    <!-- id 입력 (중복확인 필요) -->
                    <h3>wallet_id: </h3>
                    <input class="form-control" type="text" placeholder="Ex: KIA" v-model="car_maker">
                    <!-- 계정 생성 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setWallet">Set Car</button>
                </div>
            </form>
        </div>
        <!-- set_wallet end -->
        
        
        <!-- coin 입력 (def) -->
        
        <!-- 결과 alret (성공/실패) -->
    </div>
</template>

<script>
export default {
    methods: {
        setWallet() {

            // 로그인 페이지로 이동
            this.$router.push({
                path: '/join'
            })
        },
    },
}
</script>