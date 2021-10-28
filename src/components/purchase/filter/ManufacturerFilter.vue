<template>
    <div class="filter-price p-t-22 p-b-50 bo3" style="padding-bottom: 18px;">
        <div class="m-text15 p-b-17 sidebar-menu-title">
            제조사
        </div>

        <ul class="p-b-54">
            <li class="p-t-4">
                <input type="checkbox" id="Korea" value="Korea" v-model="checkedBrands" />
                <label for="Korea">현대</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Income" value="Income" v-model="checkedBrands" />
                <label for="Income">기아</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Korea" value="Korea" v-model="checkedBrands" />
                <label for="Korea">한국GM</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Income" value="Income" v-model="checkedBrands" />
                <label for="Income">르노삼성</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Korea" value="Korea" v-model="checkedBrands" />
                <label for="Korea">쌍용</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Income" value="Income" v-model="checkedBrands" />
                <label for="Income">제네시스</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Korea" value="Korea" v-model="checkedBrands" />
                <label for="Korea">기타</label>
            </li>
        </ul>

        <!-- <span>Checked Brands: {{ checkedBrands }}</span> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkedBrands: []
        }
    }
}
</script>

<style>
/* 브랜드 필터 체크박스 공백 */
li>label{
    padding-left: 10px;
}

/* 중복 여백 제거 */
.p-b-54{
    padding-bottom: 0px;
}
</style>