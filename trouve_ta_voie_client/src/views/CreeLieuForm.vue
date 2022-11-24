<template>
  <div id="lieuContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Ajouter un lieu</h1>
    <hr>
    <form id="addLieuForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="titre">
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label for="directives" class="form-label">Directives pour s'y rendre</label>
        <textarea class="form-control" id="directives" rows="3"></textarea>
      </div>
      <div style="background-color: red">TODO : longitude, latitude</div>

      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-secondary">Annuler</button>
        </div>
        <div>
          <button @click="add" type="button" class="btn btn-outline-primary">Ajouter
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreeLieuForm",
  data() {
    return {};
  },
  methods: {
    add() {

    },
    cancel() {

    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#lieuContainer {
  margin: 30px;
}

body {
  background-color: #f3f4f6;
}

h1 {
  color: $accent;
  text-align: center;
}

.btnWrapper {
  display: flex;
  justify-content: end;
  margin-top: 40px;
}

#addLieuForm {
  padding: 30px;
  height: auto;
}

.btnWrapper > div {
  margin: 10px;
}
</style>
