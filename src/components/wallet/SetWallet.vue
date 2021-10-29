<template>
    <div>
        <div class="container">
            <!-- set_wallet start -->
            <div class="create_car">
                <form>
                    <h1>계정 생성</h1>
                    <div class="create_car_text">
                        <!-- name 입력 -->
                        <div>
                            <span>name:</span>
                            <input class="inputId" type="text" placeholder="Ex: 이명재" v-model="user_name">
                        </div>
                        <!-- id 입력 (중복확인 필요) -->
                        <div>
                            <span>id: </span>
                            <input ype="text" placeholder="Ex: lmj1212" v-model="user_id">
                        </div>
                        <!-- password 입력 -->
                        <div>
                            <span>password: </span>
                            <input type="password" placeholder="Ex: 비밀번호 입력" v-model="user_password">
                        </div>
                        <!-- password 입력 -->
                        <div>
                            <span>password check: </span>
                            <input type="password" placeholder="Ex: 비밀번호 재입력" v-model="user_password_check">
                        </div>
                        <!-- 계정 생성 버튼 -->
                        <button id="setCar" type="button" value="Create" class="btn btn-primary" @click="setWallet">Set Car</button>
                    </div>
                </form>
            </div>
            <!-- set_wallet end -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            user_name: '',
            user_id: '',
            user_password: '',
            user_password_check: '',
        };
    },
    methods: {
        setWallet(user_name, user_id, user_password, user_password_check) {
            alert("다음 안내창까지 기다려주세요.");

            console.log(this.user_name);
            console.log(this.user_id);
            console.log(this.user_password);
            console.log(this.user_password_check);

            if (this.user_password != this.user_password_check) // 비밀번호 오류시
            {
                alert("입력한 비밀번호를 다시 확인해주세요.");
            } else { // 비밀번호 일치시
                axios.get('/api/createUser', {
                    params: {
                        name: this.user_name,
                        id: this.user_id,
                        password: this.user_password, 
                        coin: 0, // coin 입력 (def)
                        repairathority : 0, // 수리 권한 X
                    }
                }).then(response => { // response 성공, 실패에 따라 alert 출력 다르게
                    console.log(response);
                    const { data } = response;
                    console.log(data);
                    
                    console.log(response);
                    alert("계정 생성에 성공했습니다."); // 결과 alret (성공/실패)
                    // 로그인 페이지로 이동
                    this.$router.push({
                        path: '/join'
                    })
                })
            }
        },
    },
}
</script>