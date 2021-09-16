<template>
    <div class="filter-price p-t-22 p-b-50 bo3">
        <div class="m-text15 p-b-17">
            Brand
        </div>

        <ul class="p-b-54">
            <li class="p-t-4">
                <input type="checkbox" id="KIA" value="KIA" v-model="checkedBrands" />
                <label for="KIA">KIA</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Hyundai" value="Hyundai" v-model="checkedBrands" />
                <label for="Hyundai">Hyundai</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Benz" value="Benz" v-model="checkedBrands" />
                <label for="Benz">Benz</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="BMW" value="BMW" v-model="checkedBrands" />
                <label for="BMW">BMW</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Audi" value="Audi" v-model="checkedBrands" />
                <label for="Audi">Audi</label>
            </li>
        </ul>

        <span>Checked Brands: {{ checkedBrands }}</span>
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