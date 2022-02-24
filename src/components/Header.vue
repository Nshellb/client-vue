<template>
    <header class="header1">
        <!-- Header desktop -->
        <div class="container-menu-header">
            <div class="wrap_header">
                <!-- Logo -->
                <router-link :to="{name: 'home'}" tag="li" active-class="sale-noti" exact>
                    <a class="logo">
                        <img src="images/icons/Logo_2.png" alt="IMG-LOGO">
                    </a>
                </router-link>

                <!-- Menu -->
                <div class="wrap_menu">
                    <nav class="menu">
                        <ul class="main_menu">
                            <!-- 현재 페이지에 따라서 링크를 받아오고 표시를 하는 구문 시작 -->
                            <router-link :to="{name: 'home'}" tag="li" active-class="sale-noti" exact>
                                <a>메인</a>
                            </router-link>

                            <router-link :to="{name: 'purchase'}" tag="li" active-class="sale-noti" exact>
                                <a>차량 구매/판매</a>
                            </router-link>

                            <router-link :to="{name: 'repair'}" tag="li" active-class="sale-noti" exact>
                                <a>수리</a>
                            </router-link>
                            <!-- 현재 페이지에 따라서 링크를 받아오고 표시를 하는 구문 끝 -->
                        </ul>
                    </nav>
                </div>

                <!-- Header Icon -->
                <div class="header-icons">
                    <!-- 로그인 전 사용자 정보 시작 -->
                    <div v-if="this.user_info[0].name === null">
                        <router-link :to="{name: 'join'}" tag="li" active-class="sale-noti" exact>
                            <a class="header-wrapicon1 dis-block">
                                <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                                <!-- 로그인 정보 -->
                                <span class="header_user_info"> login </span>
                            </a>
                        </router-link>
                    </div>
                    <!-- 로그인 전 사용자 정보 끝 -->


                    <!-- 로그인 후 사용자 정보 시작 -->
                    <div class="header-wrapicon2" v-if="this.user_info[0].name != null">
                        <img src="images/icons/icon-header-01.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
                        <!-- <span class="header-icons-noti">{{ totalCartQty }}</span> -->

                        <!-- Header cart noti -->
                        <div class="header-cart header-dropdown">
                            <ul class="header-cart-wrapitem">
                                
                            </ul>

                            <div class="header-cart-buttons">
                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="/features" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        내 차량
                                    </a>
                                </div>

                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a herf="" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4" @click="logout">
                                        로그아웃
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 로그인 후 사용자 정보 끝 -->


                    <span class="linedivide1"></span>

                    <!-- 관심 목록 시작 -->
                    <div class="header-wrapicon2">
                        <img src="images/icons/star.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
                        <span class="header-icons-noti">{{ totalCartQty }}</span>

                        <!-- Header cart noti -->
                        <div class="header-cart header-dropdown">
                            <ul class="header-cart-wrapitem">
                                <template v-for="product in cartItems">
                                    <li class="header-cart-item">
                                        <div class="header-cart-item-img">
                                            <img :src="product.image" alt="IMG">
                                        </div>

                                        <div class="header-cart-item-txt">
                                            <router-link to="/" class="header-cart-item-name">
                                                {{ product.title }}
                                            </router-link>

                                            <span class="header-cart-item-info">
                                                {{ product.qty }} x ${{ product.price }}
                                            </span>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <div class="header-cart-total">
                                Total: ${{ totalCartPrice }}
                            </div>

                            <div class="header-cart-buttons">
                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="/features" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        View Cart
                                    </a>
                                </div>

                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="#" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 관심 목록 끝 -->
                </div>
            </div>
        </div>

        <!-- Header Mobile -->
        <div class="wrap_header_mobile">
            <!-- Logo moblie -->
            <router-link :to="{name: 'home'}" tag="li" active-class="sale-noti" exact>
                <a class="logo-mobile">
                    <img src="images/icons/Logo_2.png" alt="IMG-LOGO">
                </a>
            </router-link>

            <!-- Button show menu -->
            <div class="btn-show-menu">
                <!-- Header Icon mobile -->
                <div class="header-icons-mobile ">
                    <router-link :to="{name: 'join'}" tag="li" active-class="sale-noti" exact>
                        <a class="header-wrapicon1 dis-block">
                            <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                            <!-- 로그인 정보 -->
                            {{ this.header_user_info }}
                        </a>
                    </router-link>

                    <span class="linedivide2"></span>

                    <div class="header-wrapicon2">
                        <img src="images/icons/star.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
                        <span class="header-icons-noti">{{ totalCartQty }}</span>

                        <!-- Header cart noti -->
                        <div class="header-cart header-dropdown">
                            <ul class="header-cart-wrapitem">
                                <template v-for="product in cartItems">
                                    <li class="header-cart-item">
                                        <div class="header-cart-item-img">
                                            <img :src="product.image" alt="IMG">
                                        </div>

                                        <div class="header-cart-item-txt">
                                            <router-link to="/" class="header-cart-item-name">
                                                {{ product.title }}
                                            </router-link>

                                            <span class="header-cart-item-info">
                                                {{ product.qty }} x ${{ product.price }}
                                            </span>
                                        </div>
                                    </li>
                                </template>
                            </ul>

                            <div class="header-cart-total">
                                Total: ${{ totalCartPrice }}
                            </div>

                            <div class="header-cart-buttons">
                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="/features" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        View Cart
                                    </a>
                                </div>

                                <div class="header-cart-wrapbtn">
                                    <!-- Button -->
                                    <a href="#" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                        Check Out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
                </div>
            </div>
        </div>

        <!-- Menu Mobile -->
        <div class="wrap-side-menu" >
            <nav class="side-menu">
                <ul class="main-menu">

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'home'}" active-class="sale-noti" exact>
                            <a class="item-menu-mobile-element">Home</a>
                        </router-link>
                    </li>

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'purchase'}" active-class="sale-noti" exact>
                            <a>Purchase</a>
                        </router-link>
                    </li>

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'repair'}" active-class="sale-noti" exact>
                            <a>Repair</a>
                        </router-link>
                    </li>

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'test'}" active-class="sale-noti" exact>
                            <a>Test</a>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapState('cart', { // 장바구니에 담긴 상품을 cartItems에 가져오고
            cartItems: state => state.items,
        }),
        ...mapState({ // 사용자 정보 가져오기
            user_info: 'user_info', // 사용자 정보 가져오기
            // header_user_info: 'header_user_info', // Header 에 표시할 로그인 여부
        }),
        ...mapGetters('cart', { // 장바구니에 담긴 상품의 총 금액을 계산한 결과를 totalCartPrice에 저장한다.
            totalCartPrice: 'totalPrice',
            totalCartQty: 'totalQty',
        }),
        // headerUserInfo() {
        //     if (this.wallet == 'Login') {
        //         if (this.user_info[0].name != null){
        //             this.wallet = this.user_info[0].name;
        //         }
        //     }
        // }
    },
    methods: {
        // test code start
        test() {
            // console.log(this.wallet);
            console.log(this.user_info[0].name);
            console.log(this.header_user_info);
            // if (this.wallet == 'Login') {
            //     if (this.user_info[0].name != null){
            //         this.wallet = this.user_info[0].name;
            //     }
            // }
            // console.log(this.wallet);
            // console.log(this.user_info[0].name);
        },
        // test code end
        logout() {
            this.$store.dispatch('user_login_N', null);
            this.$store.dispatch('user_login_I', null); 
            this.$store.dispatch('user_login_T', null); 
            this.$store.dispatch('user_login_R', null); 

            console.log(this.$route.path);
            if (this.$route.path != '/') {
                this.$router.push({
                    path: '/'
                })
                // // 새로고침
                // this.$router.go();
            }
        }
    }
    
}
</script>

<style>
/* 상단바 스타일 */
.header1 {
    height: 78px;
}
/* .wrap_header, .wrap_header_mobile {
    background-color: #28467c;
} */

/* 상단바 로그인 정보 */
.header_user_info{
    font-family: Nanum Gothic;
    padding-left: 8px;
    font-size: 16px;
}

.main_menu > li > a {
    font-family: Nanum Gothic;
    font-weight: bold;
    font-size: 19px;
    padding: 0;
}

</style>