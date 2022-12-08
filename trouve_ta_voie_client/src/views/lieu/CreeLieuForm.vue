<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="lieuContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Ajouter un lieu</h1>

    <form id="addLieuForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model.trim="titre"
               @blur="checkTitreEstValide" @input="checkTitreEstValide"
               :class="{ 'is-invalid': titreIsVaild===false }">
        <ul class="ulError" v-if="!titreIsVaild">
          <li class="error" v-for="err in titreMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="4" v-model.trim="description"
                  @blur="checkDescriptionEstValide" @input="checkDescriptionEstValide"
                  :class="{ 'is-invalid': descEstValide===false }"></textarea>
        <ul class="ulError" v-if="!descEstValide">
          <li class="error" v-for="err in descriptionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="directives" class="form-label">Directives pour s'y rendre</label>
        <textarea class="form-control" id="directives" rows="4" v-model.trim="instruction"
                  @blur="checkInstructionEstValide" @input="checkInstructionEstValide"
                  :class="{ 'is-invalid': instrucEstValide===false }"></textarea>
        <ul class="ulError" v-if="!instrucEstValide">
          <li class="error" v-for="err in instructionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-6 mb-3">
          <label for="latitude" class="form-label">Latitude</label>
          <input type="text" class="form-control" id="latitude" placeholder="0"
                 v-model.trim="latitude" @blur="checkLatitudeEstValide" @input="checkLatitudeEstValide"
                 :class="{ 'is-invalid': latitudeEstValide===false }">
          <ul class="ulError" v-if="!latitudeEstValide">
            <li class="error" v-for="err in latitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
        <div class="col-6 mb-3">
          <label for="longitude" class="form-label">Longitude</label>
          <input type="text" class="form-control" id="longitude" placeholder="0"
                 v-model.trim="longitude" @blur="checkLongitudeEstValide" @input="checkLongitudeEstValide"
                 :class="{ 'is-invalid': longitudeEstValide===false }">
          <ul class="ulError" v-if="!longitudeEstValide">
            <li class="error" v-for="err in longitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>
      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-secondary">Retour</button>
        </div>
        <div>
          <button @click="add" type="button" class="btn btn-primary">Ajouter
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {errorManager} from "@/fctUtils/errorManager";
import lieuValidator from "@/fctUtils/lieuValidator";


export default {
  components: {LoadingSpinnerComponent},
  name: "CreeLieuForm",
  data() {
    return {
      titre: "",
      description: "",
      instruction: "",
      latitude: "",
      longitude: "",
      titreIsVaild: undefined,
      descEstValide: undefined,
      instrucEstValide: undefined,
      latitudeEstValide: undefined,
      longitudeEstValide: undefined,
      titreMsgErr: [],
      descriptionMsgErr: [],
      instructionMsgErr: [],
      latitudeMsgErr: [],
      longitudeMsgErr: [],
      titreNeedUpdated: false,
    };
  },
  methods: {
    checkTitreEstValide(event) {
      const result = lieuValidator.checkTitreEstValide(event.target.value);
      this.titreMsgErr = result[0];
      this.titreIsVaild = result[1];
      this.titreNeedUpdated = false;
    },
    checkDescriptionEstValide(event) {
      const result = lieuValidator.checkDescriptionEstValide(event.target.value);
      this.descriptionMsgErr = result[0];
      this.descEstValide = result[1];
    },
    checkInstructionEstValide(event) {
      const result = lieuValidator.checkInstructionEstValide(event.target.value);
      this.instructionMsgErr = result[0];
      this.instrucEstValide = result[1];
    },
    checkLatitudeEstValide(event) {
      const result = lieuValidator.checkLatitudeEstValide(event.target.value);
      this.latitudeMsgErr = result[0];
      this.latitudeEstValide = result[1];
    },
    checkLongitudeEstValide(event) {
      const result = lieuValidator.checkLongitudeEstValide(event.target.value);
      this.longitudeMsgErr = result[0];
      this.longitudeEstValide = result[1];
    },
    clearField() {
      this.titre = "";
      this.description = "";
      this.instruction = "";
      this.latitude = "";
      this.longitude = "";
      this.titreIsVaild = undefined;
      this.descEstValide = undefined;
      this.instrucEstValide = undefined;
      this.latitudeEstValide = undefined;
      this.longitudeEstValide = undefined;
      this.titreMsgErr = [];
      this.descriptionMsgErr = [];
      this.instructionMsgErr = [];
      this.latitudeMsgErr = [];
      this.longitudeMsgErr = [];
      this.titreNeedUpdated = false;
    },
    async add() {
      let result = lieuValidator.checkDescriptionEstValide(this.description);
      this.descriptionMsgErr = result[0];
      this.descEstValide = result[1];
      result = lieuValidator.checkInstructionEstValide(this.instruction);
      this.instructionMsgErr = result[0];
      this.instrucEstValide = result[1];
      result = lieuValidator.checkLatitudeEstValide(this.latitude);
      this.latitudeMsgErr = result[0];
      this.latitudeEstValide = result[1];
      result = lieuValidator.checkLongitudeEstValide(this.longitude);
      this.longitudeMsgErr = result[0];
      this.longitudeEstValide = result[1];
      if (!this.titreNeedUpdated) {
        result = lieuValidator.checkTitreEstValide(this.titre);
        this.titreMsgErr = result[0];
        this.titreIsVaild = result[1];
      }

      if (this.titreIsVaild && this.descEstValide && this.instrucEstValide && this.latitudeEstValide && this.longitudeEstValide) {
        try {
          this.$store.dispatch("startLoading");

          const payload = {
            data: {
              titre: this.titre,
              description: this.description,
              directives: this.instruction,
              latitude: +this.latitude,
              longitude: +this.longitude,
            },
            token: this.$store.getters.token,
          };

          await this.$store.dispatch("createLieu", payload).then(res => {
            if (res.status) {
              this.$toast.success("Création du lieu réussie !");
              this.clearField();
              this.$store.dispatch("stopLoading");
            }
          }).catch(err => {
            if (err.data.err && err.data.err === "Titre déjà utilisé !") {
              this.titreIsVaild = false;
              this.titreNeedUpdated = true;
              this.titreMsgErr.push("Titre déjà utilisé !");
            }
            this.$toast.error("Échec de la création du lieu !");
            this.$store.dispatch("stopLoading");
            errorManager(err, this.$store, this.$router);
          });
        } catch (err) {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
          await errorManager(err, this.$store, this.$router);
        }
      }
    },
    cancel() {
      this.$router.go(-1);
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#lieuContainer {
  margin: 30px;
}

.btnWrapper {
  display: flex;
  justify-content: end;
  margin-top: 40px;
}

#addLieuForm {
  padding: 30px;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
}

.btnWrapper > div {
  margin: 10px;
}

</style>
