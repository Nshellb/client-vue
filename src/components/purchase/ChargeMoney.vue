<template>
    <div>
        <div class="buycar m-text15 p-b-12">
            <h3>부족한 잔액 : {{this.insufficientAmountRes}} 원</h3>
            {{this.walletid}}

            <!-- 카드 입력 필드 -->
            <div class="cardFeild">
                <label><input type="checkbox" v-model="isCardChecked" value="true" class="noti-check">카드</label>
                <div class="input_card" v-if="isCardChecked === true" >
                    카드 번호 입력

                </div> 
            </div>


            <!-- 계좌 입력 필드 -->
            <div class="accountFeild">
                <label><input type="checkbox" v-model="isAccountChecked" value="true" class="noti-check">계좌</label>
                <div class="input_card" v-if="isAccountChecked === true" >
                    계좌 이체 및 확인 클릭

                </div>
            </div> 

            <!-- 구매하는 차량의 정보를 확인했습니다. - 체크박스 -->
            <label><input type="checkbox" v-model="checked" value="true" class="noti-check">결제 정보에 동의합니다.</label>



            <!-- 구매하기 버튼 -->
            <!-- 구매 성공후 alert 띄움. -->
            <button id="chargeMoney" type="button" value="chargeMoney" class="chargeMoney btn btn-primary" 
            @click="chargeMoney" :disabled="checked == false">충전</button>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    props: ["insufficientAmount", "walletid"],
    data() {
        return {
            apiResponse: [],
            checked: false,
            isCardChecked: false,
            isAccountChecked: false,
            insufficientAmountRes: 0,
        };
    },
    created () {
        this.insufficientAmountRes = parseInt(this.insufficientAmount) * -1;
    },
    computed: {
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
        }),
    },
    methods: {
        chargeMoney() {
            console.log(this.insufficientAmount);
            
            alert("금액 충전을 진행중입니다. 다음 알림창까지 1~2분 기다려주세요.");
            
            axios.get('/api/chargeToken', {
                params: {
                    id: this.user_info[0].id,
                    token: this.user_info[0].token,
                }
            }).then(response => {
                console.log(response);
                const { data } = response;
                console.log(data);

                axios.get('/api/getWallet', { // 로그인한 계정의 getWallet 결과를 vuex 에 저장.
                    params: {
                        id: this.user_info[0].id,
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

                    console.log("로그인한 사용자 정보 갱신 성공!");
                });
            });

            this.$emit('close-modal');
        }
    },
}
</script>

<style>
.buycar {
    padding-top: 30px;
    padding-left: 50px;
    padding-right: 50px;

}

h3 {
    font-size: 20px;
    text-align: left;
    padding-bottom: 10px;
}

button.buyCar {
    position: absolute; right: 0px; bottom: 0px;
    margin-bottom: 30px;
    margin-right: 50px;
}

.noti-check{
    margin-top: 50px;
}

/* .chargeMoney {
} */

</style>