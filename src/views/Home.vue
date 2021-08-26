<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CarList/>
  </div>
</template>

<script>
// @ is an alias to /src
import CarList from '@/components/CarList.vue'
export default {
  name: 'Home',
  components: {
    CarList,
  }
}
</script>