<template>
    <div>
        <!-- 배너 시작 -->
        <section class="bg-title-page p-t-50 p-b-40 flex-col-c-m" :style="'background-image: url(https://picsum.photos/1920/239/?image=526);'">
            <h2 class="l-text2 t-center">
                차량 목록
            </h2>
            <!-- <p class="m-text13 t-center">
                New Arrivals Women Collection 2018
            </p> -->
        </section>
        <!-- 배너 끝 -->

        <section class="bgwhite p-t-55 p-b-65">
            <div class="container">
                <div class="row">
                    <!-- 사이드바 필터 시작 -->
                    <div class="col-sm-6 col-md-4 col-lg-3 p-b-50" style="text-align: left;">
                        <div class="leftbar p-r-20 p-r-0-sm">
                            <h4 class="m-text14 p-b-32">
                                Filters
                            </h4>

                            <!-- 사이드바 필터 - 브랜드 -->
                            <BrandFilter />

                            <!-- 사이드바 필터 - 가격대 -->
                            <PriceFilter />
                            
                            <!-- <ColorFilter /> -->

                            <!-- 사이드바 필터 - 차량 카테고리 -->
                            <!-- 세단, SUV... -->
                        </div>
                    </div>
                    <!-- 사이드바 필터 끝 -->


                    <!-- 상품 목록 시작 -->
                    <div class="col-sm-6 col-md-8 col-lg-9 p-b-50">
                        <!-- 현재 페이지 상품 수 -->
                        <div class="flex-sb-m flex-w p-b-35">
                            <!-- 현재보고 있는 상품 수와 인덱스를 표시 -->
                            <span class="s-text8 p-t-5 p-b-5">
                                <!-- Showing {{(page * 12) + 1}}–{{(page * 12) + 12}} of {{ totalProducts }} results -->
                            </span>
                            <!-- 상품 추가 버튼 -->
                            <button id="createCar" type="button" value="create car" class="btn btn-primary" @click="createCar">중고차 등록</button>
                        </div>


                        <!-- Product (상품 목록) -->
                        <ProductList />


                        <!-- Pagination -->
                        <div class="pagination flex-m flex-w p-t-26">
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
                        </div>
                    </div>
                    <!-- 상품 목록 끝 -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import BrandFilter from '@/components/purchase/BrandFilter.vue';
import PriceFilter from '@/components/purchase/PriceFilter.vue';
import ColorFilter from '@/components/purchase/ColorFilter.vue';

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
    BrandFilter,
    PriceFilter,
    ColorFilter,
    ProductList,
  }
}
</script>
