<template>
  <div id="grimpeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Ajouter une grimpe</h1>
    <hr>
    <form id="addGrimpeForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="titre">
      </div>
      <select class="form-select" aria-label="Default select example">
        <option selected disabled>Choisir le style</option>
        <option value="Traditionnelle">Traditionnelle</option>
        <option value="Sportive">Sportive</option>
        <option value="Moulinette">Moulinette</option>
      </select>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3"></textarea>
      </div>

      <div style="background-color: red">TODO : Photo</div>

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
  name: "CreeGrimpeForm",
  data() {
    return {};
  },
  methods: {
    add() {

    },
    cancel() {
      this.$router.push({name: 'accueil'});
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#grimpeContainer {
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

#addGrimpeForm {
  padding: 30px;
  height: auto;
}

.btnWrapper > div {
  margin: 10px;
}
</style>
