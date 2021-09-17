<template>
  <div class="home">
    <SlideBanner />
    <BestProductList />
    <FeaturedProductList />
    <!-- <CarList/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SlideBanner from '@/components/home/SlideBanner.vue';
import BestProductList from '@/components/home/BestProductList.vue';
import FeaturedProductList from '@/components/home/FeaturedProductList.vue';

// import CarList from '@/components/CarList.vue'


export default {
  name: 'Home',
  components: {
    BestProductList,
    SlideBanner,
    FeaturedProductList,
    // CarList,
  }
}
</script>