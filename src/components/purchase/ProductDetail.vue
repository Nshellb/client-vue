<template>
    <div>
        <div class="content-detail-content-info">
            <!-- 글번호, 제목 -->
            <div class="content-detail-content-info-left">
                <div class="content-detail-content-info-left-number">
                    {{contentId}}
                </div>
                <div class="content-detail-content-info-left-subject">
                    {{title}}
                </div>
            </div>
            <!-- 글쓴이, 등록(작성)일-->
            <div class="content-detail-content-info-right">
                <div class="content-detail-content-info-right-user">
                    글쓴이: {{user}}
                </div>
                <div class="content-detail-content-info-right-created">
                    등록일: {{created}}
                </div>
            </div>
        </div>
        <div class="content-detail-content">
            {{context}}
        </div>
        <div class="content-detail-button">
            <b-button variant="primary" @click="updateData">수정</b-button>
            <b-button variant="success" @click="deleteData">삭제</b-button>
        </div>
        <div class="content-detail-comment">
            <!-- <CommentList :contentId="contentId"/> -->
        </div>
    </div>
</template>

<script>
// import data from "@/data";
// import CommentList from './CommentList';

export default {
    name: "ProductDetail",
    components: {
        // CommentList,
    },
    data() {
        const contentId = Number(this.$route.params.contentId); // router.js에서 가져온 contentId를 저장.
        const contentData = data.Content.filter(item => item.content_id === contentId)[0] // 가져온 contentId에 filter를 통해서 해당하는 데이터를 가져옴.
        return {
            contentId: contentId, // 글번호
            title: contentData.title, // 제목
            context: contentData.context, // 내용
            user: data.User.filter(item => item.user_id === contentData.user_id)[0].name, // 글쓴이
            created: contentData.created_at, // 작성일
        };
    },
    methods: {
        deleteData() {
            const content_index = data.Content.findIndex(item => item.content_id === this.contentId); // findIndex 조건을 만족하는 index 반환
            data.Content.splice(content_index, 1)
            this.$router.push({
                path: '/board/free'
            })
        },
        updateData() {
            this.$router.push({
                path: `/board/free/create/${this.contentId}`
            })
        }
    }
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