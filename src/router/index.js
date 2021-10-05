import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Lookup from '@/views/lookup/CarLookup.vue'
import Purchase from '@/views/purchase/CarPurchase.vue'
import ProductDetail from '@/components/purchase/ProductDetail.vue'
import CreateCar from '@/components/purchase/CreateCar.vue'
import Insurance from '@/views/insurance/CarInsurance.vue'
import Repair from '@/views/repair/CarRepair.vue'
import Test from '@/views/test/CarTest.vue'
import Shop from '@/views/Shop.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lookup',
      name: 'lookup',
      component: Lookup
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: Purchase
    },
    {
      path: '/purchase/add',
      name: 'createcar',
      component: CreateCar
    },
    {
      path: '/purchase/detail/:productId', // detail page로 넘어갈때 parameter 값 productId 를 사용.
      name: 'productdetail',
      component: ProductDetail
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: Insurance
    },
    {
      path: '/repair',
      name: 'repair',
      component: Repair
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
  ]
})