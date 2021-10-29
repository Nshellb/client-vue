<template>
    <div>
        <section class="bgwhite p-t-55 p-b-65">
            <div class="container" style="max-width: 1650px;">
                <div class="row">
                    <!-- side bar start -->
                    <div class="col-md-3 col-lg-2 p-b-50" style="text-align: left;">
                        <div class="leftbar p-r-20 p-r-0-sm">
                            <h4 class="menu-title bor-bo" style="text-align: left;">
                                검색 필터
                            </h4>

                            <!-- Side bar Filter -->
                            <CountryFilter />
                            <SegmentFilter />
                            <ManufacturerFilter />
                            <ModelFilter />
                            <ModelDetailGenFilter />

                        </div>
                    </div>
                    <!-- side bar end -->


                    <!-- 상품 목록 시작 -->
                    <div class="col-md-9 col-lg-10 p-b-50">
                        <!-- 메인 상단바 -->
                        <h4 class="menu-title bor-bo" style="text-align: left; padding-left: 15px">
                            차량목록

                            <!-- 상품 추가 버튼 -->
                            <button id="createCar" type="button" value="create car" class="btnCreateCar" @click="createCar">중고차 등록</button>
                        </h4>


                        <!-- Product (상품 목록) -->
                        <ProductList />


                        <!-- Pagination -->
                        <!-- <div class="pagination flex-m flex-w p-t-26">
                            <template v-for="p in Math.ceil(totalProducts / 12)">
                                <button
                                type="button"
                                @click="changePage(p - 1)"
                                class="item-pagination flex-c-m trans-0-4"
                                :class="{'active-pagination': p - 1 === page}"
                                >
                                {{ p }}
                                </button>
                            </template>
                        </div> -->
                    </div>
                    <!-- 상품 목록 끝 -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import CountryFilter from '@/components/purchase/filter/CountryFilter.vue'
import SegmentFilter from '@/components/purchase/filter/SegmentFilter.vue'
import ManufacturerFilter from '@/components/purchase/filter/ManufacturerFilter.vue'
import ModelFilter from '@/components/purchase/filter/ModelFilter.vue'
import ModelDetailGenFilter from '@/components/purchase/filter/ModelDetailGenFilter.vue'

import ProductList from '@/components/purchase/ProductList.vue';

export default {
    computed: {
        ...mapState('product', {
            totalProducts: state => state.totalProducts,
            page: state => state.page,
        })
    },
    methods: {
        changePage(page) {
            this.$store.dispatch('product/setProducts', page);
        },
        createCar() {
            this.$router.push({
                path: '/purchase/add'
            })
        }
    },
    components: {
        CountryFilter,
        SegmentFilter,
        ManufacturerFilter,
        ModelFilter,
        ModelDetailGenFilter,

        ProductList,
    }
}
</script>

<style>
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

.menu-title {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 23px;
    color: #1f1f1f;
    line-height: 1.5;
    padding-bottom: 20px;
}

.bor-bo {
    border-bottom: 1.8px solid #e1e1e1;
}

.btnCreateCar {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 18px;
    float: right;
    margin: 0;
    border-radius: 6px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-right: 10px;
    padding-left: 10px;
    background-color: #e65540;
    color: #ffffff;
}
</style>