<template>
  <div id="modalBack"></div>
  <div id="modal" class="p-4 rounded">
    <div id="headModal" class="p-2">
      <h2>Suppression !</h2>

      <svg @click="$emit('confirm', false)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </div>
    <br class="spacer">
    <p>Êtes-vous sûr de vouloir continuer? Cette action n'est pas réversible.</p>
    <br class="spacer">
    <div class="btnWrapper">
      <button aria-label="Annuler, fermer le modal" type="button" class="btn btn-outline-primary" @click="$emit('confirm', false)">Annuler</button>
      <button aria-label="Confirmer supprimer" type="button" class="btn btn-danger" @click="$emit('confirm', true)">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmModalComponent",
  emits: ["confirm"],
  props: ["msg"]
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#headModal {
  background-color: #f3f4f6;
  margin: -24px -24px 0 -24px;
  display: flex;
  justify-content: space-between;

  svg {
    margin-top: 15px;
    margin-right: 10px;
    cursor: pointer;
  }

  h2 {
    margin-left: 110px;
  }
}

#modalBack {
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.09);
  width: calc(100vw);
  min-height: calc(100vh + 56px);
  position: fixed;
  top: 0;

}

#modal {
  background-color: white;
  width: 25rem;
  height: 15rem;
  position: fixed;
  top: 40%;
  left: calc(50vw - 13rem);
  z-index: 2001;

  display: flex;
  flex-direction: column;

  p {
    text-align: center;
  }
}

.btnWrapper {
  display: flex;
  justify-content: center;

  button {
    margin: 0 10px 0 10px;
  }
}

.spacer {
  margin: 10px 0 10px 0;
}
</style>
