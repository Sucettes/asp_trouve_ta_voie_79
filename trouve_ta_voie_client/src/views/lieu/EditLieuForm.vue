<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div v-if="!errorOccurred" id="lieuContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Modifier un lieu</h1>
    <hr>
    <form id="editLieuForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model.trim="title"
               @blur="checkTitleIsValid" @input="checkTitleIsValid"
               :class="{ 'is-invalid': titleIsVaild===false }" tabindex="1">
        <ul class="ulError" v-if="!titleIsVaild">
          <li class="error" v-for="err in titleMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="4" v-model.trim="description"
                  @blur="checkDescriptionIsValid" @input="checkDescriptionIsValid"
                  :class="{ 'is-invalid': descIsValid===false }" tabindex="2"></textarea>
        <ul class="ulError" v-if="!descIsValid">
          <li class="error" v-for="err in descriptionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="directives" class="form-label">Directives pour s'y rendre</label>
        <textarea class="form-control" id="directives" rows="4" v-model.trim="instruction"
                  @blur="checkInstructionIsValid" @input="checkInstructionIsValid"
                  :class="{ 'is-invalid': instrucIsValid===false }" tabindex="3"></textarea>
        <ul class="ulError" v-if="!instrucIsValid">
          <li class="error" v-for="err in instructionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-6 mb-3">
          <label for="latitude" class="form-label">Latitude</label>
          <input type="text" class="form-control" id="latitude" placeholder="0"
                 v-model.trim="latitude" @blur="checkLatitudeIsValid" @input="checkLatitudeIsValid"
                 :class="{ 'is-invalid': latitudeIsValid===false }" tabindex="4">
          <ul class="ulError" v-if="!latitudeIsValid">
            <li class="error" v-for="err in latitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
        <div class="col-6 mb-3">
          <label for="longitude" class="form-label">Longitude</label>
          <input type="text" class="form-control" id="longitude" placeholder="0"
                 v-model.trim="longitude" @blur="checkLongitudeIsValid" @input="checkLongitudeIsValid"
                 :class="{ 'is-invalid': longitudeIsValid===false }" tabindex="5">
          <ul class="ulError" v-if="!longitudeIsValid">
            <li class="error" v-for="err in longitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>
      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-secondary" tabindex="7">Retour</button>
        </div>
        <div>
          <button @click="edit" type="button" class="btn btn-primary" tabindex="6">Sauvegarder
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
import axios from "axios";


export default {
  name: "EditLieuForm",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      id: "",
      title: "",
      description: "",
      instruction: "",
      latitude: 0,
      longitude: 0,
      titleIsVaild: undefined,
      descIsValid: undefined,
      instrucIsValid: undefined,
      latitudeIsValid: undefined,
      longitudeIsValid: undefined,
      titleMsgErr: [],
      descriptionMsgErr: [],
      instructionMsgErr: [],
      latitudeMsgErr: [],
      longitudeMsgErr: [],
      titleNeedUpdated: false,

      errorCode: undefined,
      statusText: "",
      errorOccurred: false,
    };
  },
  methods: {
    checkTitleIsValid(event) {
      const result = lieuValidator.checkTitleIsValid(event.target.value);
      this.titleMsgErr = result[0];
      this.titleIsVaild = result[1];
      this.titleNeedUpdated = false;
    },
    checkDescriptionIsValid(event) {
      const result = lieuValidator.checkDescriptionIsValid(event.target.value);
      this.descriptionMsgErr = result[0];
      this.descIsValid = result[1];
    },
    checkInstructionIsValid(event) {
      const result = lieuValidator.checkInstructionIsValid(event.target.value);
      this.instructionMsgErr = result[0];
      this.instrucIsValid = result[1];
    },
    checkLatitudeIsValid(event) {
      const result = lieuValidator.checkLatitudeIsValid(event.target.value);
      this.latitudeMsgErr = result[0];
      this.latitudeIsValid = result[1];
    },
    checkLongitudeIsValid(event) {
      const result = lieuValidator.checkLongitudeIsValid(event.target.value);
      this.longitudeMsgErr = result[0];
      this.longitudeIsValid = result[1];
    },
    async edit() {
      let result = lieuValidator.checkDescriptionIsValid(this.description);
      this.descriptionMsgErr = result[0];
      this.descIsValid = result[1];
      result = lieuValidator.checkInstructionIsValid(this.instruction);
      this.instructionMsgErr = result[0];
      this.instrucIsValid = result[1];
      result = lieuValidator.checkLatitudeIsValid(this.latitude);
      this.latitudeMsgErr = result[0];
      this.latitudeIsValid = result[1];
      result = lieuValidator.checkLongitudeIsValid(this.longitude);
      this.longitudeMsgErr = result[0];
      this.longitudeIsValid = result[1];
      if (!this.titleNeedUpdated) {
        result = lieuValidator.checkTitleIsValid(this.title);
        this.titleMsgErr = result[0];
        this.titleIsVaild = result[1];
      }

      if (this.titleIsVaild && this.descIsValid && this.instrucIsValid && this.latitudeIsValid && this.longitudeIsValid) {
        try {
          this.$store.dispatch("startLoading");

          const payload = {
            data: {
              id: +this.$route.params.id,
              titre: this.title,
              description: this.description,
              directives: this.instruction,
              latitude: +this.latitude,
              longitude: +this.longitude,
            },
            token: this.$store.getters.token,
          };

          await this.$store.dispatch("editLieu", payload).then(res => {
            if (res.status) {
              this.$toast.success("Modification du lieu réussie !");
              this.$store.dispatch("stopLoading");
              this.$router.push({name: "lieuDetails", params: {id: +this.$route.params.id}});
            }
          }).catch(err => {
            if (err.data.err && err.data.err === "Titre déjà utilisé !") {
              this.titleNeedUpdated = true;
              this.titleIsVaild = false;
              this.titleMsgErr.push("Titre déjà utilisé !");
            }
            this.$toast.error("Échec de la modification du lieu !");

            this.$store.dispatch("stopLoading");
            errorManager(err, this.$store, this.$router);
          });
        } catch (err) {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
          errorManager(err, this.$store, this.$router);
        }
      }
    },
    cancel() {
      this.$router.go(-1);
    },
    async loadLieuToEdit() {
      this.$store.dispatch("startLoading");

      const payload = {
        id: this.$route.params.id,
        token: this.$store.getters.token,
      };

      await axios.get(`http://localhost:8090/api/lieu/${this.$store.getters.userId}/${payload.id}`, {
        headers: {"Authorization": `Bearer ${payload.token}`},
      }).then(res => {
        this.id = res.data.id;
        this.title = res.data.titre;
        this.description = res.data.description;
        this.instruction = res.data.directives;
        this.latitude = +res.data.latitude;
        this.longitude = +res.data.longitude;

        this.titleIsVaild = true;
        this.descIsValid = true;
        this.instrucIsValid = true;
        this.latitudeIsValid = true;
        this.longitudeIsValid = true;

        this.$store.dispatch("stopLoading");
      }).catch(err => {
        this.$store.dispatch("stopLoading");
        errorManager(err.response, this.$store, this.$router);
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  async created() {
    await this.loadLieuToEdit();
  },
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

#editLieuForm {
  padding: 30px;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
}

.btnWrapper > div {
  margin: 10px;
}

.error {
  color: $red;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}
</style>
