<template>
    <section class="slide1">
        <div class="wrap-slick1">
            <div class="slick1" ref="slick">
                <template v-for="banner in banners">
                    <div class="item-slick1 item1-slick1" :style="`background-image: url(${banner.thumbnail});`">
                        <div class="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                            <span class="yealDetail_text caption1-slide1 t-center animated visible-false m-b-15" data-appear="fadeInDown">
                                {{ banner.yearDetail }}
                            </span>

                            <h2 class="title_text caption2-slide1 t-center animated visible-false m-b-37" data-appear="fadeInUp">
                                {{ banner.title }}
                            </h2>

                            <div class="wrap-btn-slide1 w-size1 animated visible-false" data-appear="zoomIn">
                                <!-- Button -->
                                <a href="product.html" class="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                                    Shop Now
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
import bannerApi from '@/api/banner';

export default {
    data() {
        return {
            banners: [],
        }
    },
    created() {
        bannerApi.getMainSlideBanners().then(response => { // /api/banner.js 의 getMainSlideBanners method 를 통해서
            this.banners = [].concat(response.data); // ajax call 로 가져온 결과를 banners 배열에 넣어준다.

            this.$nextTick(() => { // 화면이 그려진뒤 호출.
                $(this.$refs.slick).slick1(); // public/js/slick-custom 의 정의한 slick1 적용.
            })
        });
    },
}
</script>

<style>
.yealDetail_text {
    font-family: Nanum Gothic;
    font-weight: bold;
	font-size: 18px;
	color: white;
	line-height: 1.5;
	letter-spacing: 2px;
}

.title_text {
    font-family: Nanum Gothic;
    font-weight: bold;
	font-size: 60px;
	color: white;
	line-height: 1.2;
	letter-spacing: 3px;
	text-transform: uppercase;
}

</style>