// 계정 로그인
<template>
    <div>
        <!-- get_wallet start -->
        <div class="create_car">
            <form>
                <h1>로그인</h1>
                <div class="create_car_text">
                    <!-- name 입력 -->
                    <h3>name:</h3>
                    <input class="form-control" type="text" placeholder="Ex: K7" v-model="car_model">
                    <!-- id 입력 -->
                    <h3>wallet_id: </h3>
                    <input class="form-control" type="text" placeholder="Ex: KIA" v-model="car_maker">
                    <!-- 로그인 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setCar">로그인</button>
                    <!-- 계정 생성 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="go_setWallet">계정생성</button>
                </div>
            </form>
        </div>
        <!-- get_wallet end -->
    </div>
</template>

<script>
export default {
    methods: {
        go_setWallet() {
            this.$router.push({
                path: '/accounts'
            })
        },
    },
}
</script>