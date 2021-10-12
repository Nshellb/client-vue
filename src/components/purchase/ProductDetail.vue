<template>
    <div>
        <div class="content-detail-content-info">
            <!-- 글번호, 제목 -->
            <div class="content-detail-content-info-left">
                <div class="content-detail-content-info-left-number">
                    {{$route.params.productId}}
                    
                </div>
                <div class="content-detail-content-info-left-subject">
                    <!-- {{model}} -->
                </div>
            </div>
            <!-- 글쓴이, 등록(작성)일-->
            <div class="content-detail-content-info-right">
                <div class="content-detail-content-info-right-user">
                    <!-- 글쓴이: {{sellername}} -->
                    <!-- {{Key}} -->
                </div>
                <div class="content-detail-content-info-right-created">
                    <!-- 등록일: {{maker}} -->
                    {{ this.apiResponse[0].maker }}
                </div>
            </div>
        </div>
        <div class="content-detail-content">
            {{ this.apiResponse }}
            <!-- {{context}} -->
            <!-- {{Key}} -->
        </div>
        <div class="content-detail-button">
            <!-- <button variant="primary" @click="updateData">수정</button>
            <button variant="success" @click="deleteData">삭제</button> -->
        </div>
        <div class="content-detail-comment">
            <!-- <CommentList :contentId="contentId"/> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ProductDetail",
    components: {
        // CommentList,
    },
    created () {
        console.log(1);
        console.log(this.$route.params.productId);
        this.apiResponse = this.$route.params.productId;
        console.log(2);
        console.log(this.apiResponse);
        axios.get('/api/getCar', { // controller.js 의 /api/getWallet 를 호출
                params: { // parameter 전달 구문
                    carkey: this.$route.params.productId
                }
            }).then(response => {
                console.log(3);
                const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
                console.log(data);
                console.log(4);
                var array = []; // 데이터 정렬용 배열
                for (var i = 0; i < data.length; i++){
                    data[i].Key = this.carkey;
                    data[i].model = data[i].Model;
                    data[i].maker = data[i].Maker;
                    data[i].price = data[i].Price;
                    data[i].walletid = data[i].WalletID;
                    data[i].sellername = data[i].Sellername;
                    array.push(data[i]);
                }
                console.log(array);
                this.apiResponse = array; // 화면에 출력되는 부분에 저장
                console.log(5);
                console.log(this.apiResponse);
                console.log(6);
                console.log(this.apiResponse[0].maker);
                console.log(7);
            });
    },
    data() {
        // const productId = String(this.$route.params.productId); // router.js에서 가져온 carKey를 저장.
        return {
            apiResponse: [], // HLF 에서 가져온 값 저장하는 버퍼
            // Key: productId, // carKey - product.Key
            // Key: productId, // 글번호
            // model: contentData.title, // 제목
            // sellername: contentData.context, // 내용
            // maker: data.User.filter(item => item.user_id === contentData.user_id)[0].name, // 글쓴이
            // created: contentData.created_at, // 작성일
        };
    },
    // methods: {
    //     deleteData() {
    //         const content_index = data.Content.findIndex(item => item.content_id === this.contentId); // findIndex 조건을 만족하는 index 반환
    //         data.Content.splice(content_index, 1)
    //         this.$router.push({
    //             path: '/board/free'
    //         })
    //     },
    //     updateData() {
    //         this.$router.push({
    //             path: `/board/free/create/${this.contentId}`
    //         })
    //     }
    // }
};
</script>

<style scoped>
.content-detail-content-info {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
}
.content-detail-content-info-left {
    width: 720px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}
.content-detail-content-info-right {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
.content-detail-content {
    border: 1px solid black;
    margin-top: 1rem;
    padding-top: 1rem;
    min-height: 720px;
}
.content-detail-button {
    border: 1px solid black;
    margin-top: 1rem;
    padding: 2rem;
}
.content-detail-comment {
    border: 1px solid black;
    margin-top: 1rem;
    padding: 2rem;
}
</style>