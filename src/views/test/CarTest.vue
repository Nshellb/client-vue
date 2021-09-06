<template>
  <div class="Test">
    <SearchWallet/>
    <CarList/>
    <CreateCar/>
    <DeleteCar/>
  </div>
</template>

<script>
import SearchWallet from '@/components/SearchWallet.vue'
import CarList from '@/components/CarList.vue'
import CreateCar from '@/components/CreateCar.vue'
import DeleteCar from '@/components/DeleteCar.vue'

export default {
  name: 'Test',
  components: {
    SearchWallet,
    CarList,
    CreateCar,
    DeleteCar,
  }
}
</script>