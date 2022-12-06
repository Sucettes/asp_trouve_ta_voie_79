<template>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ratingModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
        test modal
        <input type="text" value="test">
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary">Sauvegarder évaluation</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grimpeRatingModalComponent",
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

</style>
