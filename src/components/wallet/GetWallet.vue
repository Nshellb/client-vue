<template>
    <div>
        <div class="container">
            <!-- get_wallet start -->
            <div class="create_car">
                <form>
                    <div class="loginText">로그인</div>
                    <div class="create_car_text">
                        <section class="login-input-section-wrap">
                            <!-- id 입력 -->
                            <div class="login-input-wrap">	
                                <input placeholder="Id" type="text" v-model="user_id">
                            </div>
                            <!-- password 입력 -->
                            <div class="login-input-wrap password-wrap">	
                                <input placeholder="Password" type="password" v-model="user_password">
                            </div>
                            <!-- 로그인 버튼 -->
                            <div class="login-button-wrap">
                                <button type="button" value="SignIn" @click="userlogin">로그인</button>
                            </div>
                            <!-- 계정 생성 버튼 -->
                            <div class="login-button-wrap-create-account">
                                <button type="button" value="CreateAccount" @click="go_setWallet">회원가입</button>
                            </div>
                        </section>
                    </div>
                </form>
            </div>
            <!-- get_wallet end -->
        </div>
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

<style>
.loginText {
    font-family: Nanum Gothic;
    font-weight: bold;
    margin-top: 80px;
    font-size: 50px;
}

.create_car_text {
    font-family: Nanum Gothic;
    color: rgb(49, 49, 49);
    margin-bottom: 160px;
}

.inputIdText .inputPwText {
}

:root{
	--body-background-color: #f5f6f7;
	--font-color: #4e4e4e;
	--border-gray-color : #dadada;
	--naver-green-color: #e65540;
}

.login-input-section-wrap{
	padding-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.login-input-wrap{
	width: 465px;
	height :48px;
	border: solid 1px var(	--border-gray-color );
	background: white;
}

.login-input-wrap input{
	border: none;
	width:430px;
	margin-top: 10px;
	font-size: 14px;
	margin-left: 10px;
	height:30px;
}

.password-wrap{
	margin-top: 13px;
}

.login-button-wrap {
	padding-top: 13px;
}
.login-button-wrap button {
	width: 465px;
	height :48px;
	font-size: 18px;
	background: var(--naver-green-color);
	color: white;
	border: solid 1px var(--naver-green-border-color);
}

.login-button-wrap-create-account {
    width: 465px;
    height: 48px;
    margin-top: 15px;
	font-size: 16px;
}

</style>