<template>
  <div class="home">
    <SlideBanner />
    <CarList/>
  </div>
</template>

<script>
// @ is an alias to /src
import SlideBanner from '@/components/home/SlideBanner.vue';
import CarList from '@/components/CarList.vue'

export default {
  name: 'Home',
  components: {
    CarList,
    SlideBanner,
  }
}
</script>