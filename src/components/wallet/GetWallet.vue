<template>
    <div>
        <!-- get_wallet start -->
        <div class="create_car">
            <form>
                <h1>로그인</h1>
                <div class="create_car_text">
                    <!-- id 입력 -->
                    <h3>id: </h3>
                    <input class="form-control" type="text" placeholder="Ex: bgw1212" v-model="user_id">
                    <!-- password 입력 -->
                    <h3>password: </h3>
                    <input class="form-control" type="text" placeholder="Ex: 비밀번호 입력" v-model="user_password">
                    <!-- 로그인 버튼 -->
                    <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="userlogin">로그인</button>
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
            user_id: '',
            user_password: '',
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
        userlogin() {
            alert("다음 안내창까지 기다려주세요.");

            axios.get('/api/login', {
                params: {
                    userid: this.user_id,
                    password: this.user_password,
                }
            }).then(response => {
                console.log(response);
                const { data } = response;
                console.log(data);
                
                if (data === "success") { // 로그인 성공시
                    console.log("사용자 계정 확인 성공!");
                    
                    axios.get('/api/getWallet', { // 로그인한 계정의 getWallet 결과를 vuex 에 저장.
                        params: {
                            id: this.user_id,
                        }
                    }).then(response => {
                        console.log(response);
                        const { data } = response;
                        console.log(data);
                        console.log("로그인한 사용자 정보 가져오기 성공!");

                        // vuex 에 사용자 정보 저장
                        this.$store.dispatch('user_login_N', data[0].Name); 
                        this.$store.dispatch('user_login_I', data[0].ID); 
                        this.$store.dispatch('user_login_T', data[0].Token); 
                        this.$store.dispatch('user_login_R', data[0].RepairAthority); 

                        // 메인 페이지로 이동
                        this.$router.push({
                            path: '/'
                        })

                        alert(data[0].Name + "님 환영합니다.");
                    })
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