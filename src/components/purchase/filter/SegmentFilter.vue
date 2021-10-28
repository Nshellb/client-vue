<template>
    <div class="filter-price p-t-22 p-b-50 bo3" style="padding-bottom: 18px;">
        <div class="m-text15 p-b-17 sidebar-menu-title">
            차종
        </div>

        <ul class="p-b-54">
            <li class="p-t-4">
                <input type="checkbox" id="A-Seg" value="A-Seg" v-model="checkedBrands" />
                <label for="A-Seg">경차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="B-Seg" value="B-Seg" v-model="checkedBrands" />
                <label for="B-Seg">소형차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="C-Seg" value="C-Seg" v-model="checkedBrands" />
                <label for="C-Seg">준중형차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="D-Seg" value="D-Seg" v-model="checkedBrands" />
                <label for="D-Seg">중형차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="E-Seg" value="E-Seg" v-model="checkedBrands" />
                <label for="E-Seg">준대형차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="F-Seg" value="F-Seg" v-model="checkedBrands" />
                <label for="F-Seg">대형차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="S-Seg" value="S-Seg" v-model="checkedBrands" />
                <label for="S-Seg">스포츠카</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="SUV" value="SUV" v-model="checkedBrands" />
                <label for="SUV">SUV</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="RV" value="RV" v-model="checkedBrands" />
                <label for="RV">RV</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Van" value="Van" v-model="checkedBrands" />
                <label for="Van">승합차</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Bus" value="Bus" v-model="checkedBrands" />
                <label for="Bus">버스</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Truck" value="Truck" v-model="checkedBrands" />
                <label for="Truck">트럭</label>
            </li>

            <li class="p-t-4">
                <input type="checkbox" id="Others" value="Others" v-model="checkedBrands" />
                <label for="Others">특수</label>
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

.sidebar-menu-title{
    font-weight: bold;
}


</style>