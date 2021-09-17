<template>
  <div class="Test">
    <SearchWallet/>
    <CarList/>
    <CreateCar/>
    <DeleteCar/>
    <CarLookup/>
    <CarInsurance/>
    <CarRepair/>
  </div>
</template>

<script>
import SearchWallet from '@/components/SearchWallet.vue'
import CarList from '@/components/CarList.vue'
import CreateCar from '@/components/CreateCar.vue'
import DeleteCar from '@/components/DeleteCar.vue'

import CarLookup from '@/views/lookup/CarLookup.vue'
import CarInsurance from '@/views/insurance/CarInsurance.vue'
import CarRepair from '@/views/repair/CarRepair.vue'

export default {
  name: 'Test',
  components: {
    SearchWallet,
    CarList,
    CreateCar,
    DeleteCar,
    CarLookup,
    CarInsurance,
    CarRepair,
  }
}
</script>