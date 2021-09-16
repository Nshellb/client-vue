<template>
    <header class="header1">
        <!-- Header desktop -->
        <div class="container-menu-header">
            <div class="wrap_header">
                <!-- Logo -->
                <router-link :to="{name: 'home'}" tag="li" active-class="sale-noti" exact>
                    <a class="logo">
                        <img src="images/icons/logo.png" alt="IMG-LOGO">
                    </a>
                </router-link>

                <!-- Menu -->
                <div class="wrap_menu">
                    <nav class="menu">
                        <ul class="main_menu">
                            <!-- 현재 페이지에 따라서 링크를 받아오고 표시를 하는 구문 시작 -->
                            <router-link :to="{name: 'home'}" tag="li" active-class="sale-noti" exact>
                                <a>Home</a>
                            </router-link>

                            <router-link :to="{name: 'lookup'}" tag="li" active-class="sale-noti" exact>
                                <a>Lookup</a>
                            </router-link>

                            <router-link :to="{name: 'purchase'}" tag="li" active-class="sale-noti" exact>
                                <a>Purchase</a>
                            </router-link>

                            <router-link :to="{name: 'insurance'}" tag="li" active-class="sale-noti" exact>
                                <a>Insurance</a>
                            </router-link>

                            <router-link :to="{name: 'repair'}" tag="li" active-class="sale-noti" exact>
                                <a>Repair</a>
                            </router-link>

                            <router-link :to="{name: 'test'}" tag="li" active-class="sale-noti" exact>
                                <a>Test</a>
                            </router-link>

                            <router-link :to="{name: 'shop'}" tag="li" active-class="sale-noti" exact>
                                <a>Shop</a>
                            </router-link>
                            <!-- 현재 페이지에 따라서 링크를 받아오고 표시를 하는 구문 끝 -->
                        </ul>
                    </nav>
                </div>

                <!-- Header Icon -->
                <div class="header-icons">
                    <a href="#" class="header-wrapicon1 dis-block">
                        <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                    </a>

                    <span class="linedivide1"></span>

                    <div class="header-wrapicon2">
                        <img src="images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
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
            </div>
        </div>

        <!-- Header Mobile -->
        <div class="wrap_header_mobile">
            <!-- Logo moblie -->
            <a href="index.html" class="logo-mobile">
                <img src="images/icons/logo.png" alt="IMG-LOGO">
            </a>

            <!-- Button show menu -->
            <div class="btn-show-menu">
                <!-- Header Icon mobile -->
                <div class="header-icons-mobile">
                    <a href="#" class="header-wrapicon1 dis-block">
                        <img src="images/icons/icon-header-01.png" class="header-icon1" alt="ICON">
                    </a>

                    <span class="linedivide2"></span>

                    <div class="header-wrapicon2">
                        <img src="images/icons/icon-header-02.png" class="header-icon1 js-show-header-dropdown" alt="ICON">
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
                        <router-link :to="{name: 'lookup'}" active-class="sale-noti" exact>
                            <a>Lookup</a>
                        </router-link>
                    </li>

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'purchase'}" active-class="sale-noti" exact>
                            <a>Purchase</a>
                        </router-link>
                    </li>

                    <li class="item-menu-mobile">
                        <router-link :to="{name: 'insurance'}" active-class="sale-noti" exact>
                            <a>Insurance</a>
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
    computed: {
        ...mapState('cart', { // 장바구니에 담긴 상품을 cartItems에 가져오고
            cartItems: state => state.items,
        }),
        ...mapGetters('cart', { // 장바구니에 담긴 상품의 총 금액을 계산한 결과를 totalCartPrice에 저장한다.
            totalCartPrice: 'totalPrice',
            totalCartQty: 'totalQty',
        }),
    }
    
}
</script>

<style>
/* .logo {
    font-size: 25px;
    font-weight: bold;
    color: white;
} */

/* 상단바 스타일 */
.header1 {
    height: 78px;
}
/* .wrap_header, .wrap_header_mobile {
    background-color: #28467c;
} */

</style>