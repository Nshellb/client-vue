<template>
  <div class="modal_custom">
    <div class="overlay_custom"></div>
    <!-- <div class="overlay_custom" @click="$emit('close-modal')"></div> -->
    <div class="modal_custom-card">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Modal */
.modal_custom,
.overlay_custom {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay_custom {
  opacity: 0.5;
  background-color: black;
}
.modal_custom-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 180px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
</style>