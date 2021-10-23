<template>
    <div>
        <!-- get_wallet start -->
        <div class="create_car">
            <form>
                <h1>로그인</h1>
                <div class="create_car_text">
                    <!-- name 입력 -->
                    <h3>name:</h3>
                    <input class="form-control" type="text" placeholder="Ex: K7" v-model="user_name">
                    <!-- id 입력 -->
                    <h3>wallet_id: </h3>
                    <input class="form-control" type="text" placeholder="Ex: KIA" v-model="user_walletId">
                    <!-- 로그인 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="getWallet">로그인</button>
                    <!-- 계정 생성 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="go_setWallet">회원가입</button>
                </div>
            </form>
        </div>
        <!-- get_wallet end -->
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            user_walletId: '',
            user_name: '',
        };
    },
    computed: {
        ...mapState({
            user_info: 'user_info',
        })
    },
    mounted() {
        console.log(this.$store); // store 연결확인.
    },
    methods: {
        getWallet() {
            axios.get('/api/getWallet', {
                params: {
                    walletid: this.user_walletId,
                }
            }).then(response => {
                alert("다음 안내창까지 기다려주세요.");
                const { data } = response; // 배열형태로 반환

                if (this.user_name == data[0].Name) {
                    // vuex 에 사용자 정보 저장
                    this.$store.dispatch('user_login_N', data[0].Name); 
                    this.$store.dispatch('user_login_I', data[0].ID); 
                    this.$store.dispatch('user_login_T', data[0].Token); 

                    // 메인 페이지로 이동
                    this.$router.push({
                        path: '/'
                    })

                    // this.$router.go();

                    alert(data[0].Name + "님 환영합니다.");

                    // console.log(data[0].Name); // api 결과 중에서 이름 가져옴.
                    // console.log(data[0].ID);
                    // console.log(data[0].Token);
                } else {
                    alert("입력된 정보가 일치하지 않습니다. 다시 확인해 주세요.");
                }

                // console.log(1);
                // console.log(response);
                // console.log(2);
                // console.log(data);
                // console.log(3);
                // console.log(data[0]);
                // console.log(4);
                // console.log(data[0].Name); // 이름 가져옴.
                // console.log(5);
            })
        },
        go_setWallet() {
            this.$router.push({
                path: '/accounts'
            })
        },
    },
}
</script>