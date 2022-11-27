<template>
  <div id="lieuContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Modifier un lieu</h1>
    <hr>
    <form id="addLieuForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model.trim="title"
               @blur="checkTitleIsValid" @input="checkTitleIsValid"
               :class="{ 'is-invalid': titleIsVaild===false }" ref="test">
        <ul class="ulError" v-if="!titleIsVaild">
          <li class="error" v-for="err in titleMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="4" v-model.trim="description"
                  @blur="checkDescriptionIsValid"
                  @input="checkDescriptionIsValid"
                  :class="{ 'is-invalid': descIsValid===false }"></textarea>
        <ul class="ulError" v-if="!descIsValid">
          <li class="error" v-for="err in descriptionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="directives" class="form-label">Directives pour s'y rendre</label>
        <textarea class="form-control" id="directives" rows="4" v-model.trim="instruction"
                  @blur="checkInstructionIsValid"
                  @input="checkInstructionIsValid"
                  :class="{ 'is-invalid': instrucIsValid===false }"></textarea>
        <ul class="ulError" v-if="!instrucIsValid">
          <li class="error" v-for="err in instructionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-6 mb-3">
          <label for="latitude" class="form-label">Latitude</label>
          <input type="number" class="form-control" id="latitude" placeholder="0" min="-180" max="180"
                 step="0.01" v-model="latitude" @blur="checkLatitudeIsValid"
                 :class="{ 'is-invalid': latitudeIsValid===false }"
                 @input="checkLatitudeIsValid">
          <ul class="ulError" v-if="!latitudeIsValid">
            <li class="error" v-for="err in latitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
        <div class="col-6 mb-3">
          <label for="longitude" class="form-label">Longitude</label>
          <input type="number" class="form-control" id="longitude" placeholder="0" min="-180" max="180"
                 step="0.01" v-model="longitude" @blur="checkLongitudeIsValid"
                 :class="{ 'is-invalid': longitudeIsValid===false }"
                 @input="checkLongitudeIsValid">
          <ul class="ulError" v-if="!longitudeIsValid">
            <li class="error" v-for="err in longitudeMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>
      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-secondary">Annuler</button>
        </div>
        <div>
          <button @click="edit" type="button" class="btn btn-outline-primary">Modifier
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import lieuValidator from "@/fctUtils/lieuValidator";
import axios from "axios";


export default {
  name: "EditLieuForm",
  components: {},

  data() {
    return {
      isLoading: false,
      id: "",
      title: "",
      description: "",
      instruction: "",
      latitude: "",
      longitude: "",
      titleIsVaild: undefined,
      descIsValid: undefined,
      instrucIsValid: undefined,
      latitudeIsValid: undefined,
      longitudeIsValid: undefined,
      titleMsgErr: [],
      descriptionMsgErr: [],
      instructionMsgErr: [],
      latitudeMsgErr: [],
      longitudeMsgErr: []
    };
  },
  methods: {
    checkTitleIsValid(event) {
      const result = lieuValidator.checkTitleIsValid(event.target.value);

      this.titleMsgErr = result[0];
      this.titleIsVaild = result[1];
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
      const result = lieuValidator.checkLatitudeLongitudeIsValid(event.target.value);
      this.latitudeMsgErr = result[0];
      this.latitudeIsValid = result[1];
    },
    checkLongitudeIsValid(event) {
      const result = lieuValidator.checkLatitudeLongitudeIsValid(event.target.value);
      this.longitudeMsgErr = result[0];
      this.longitudeIsValid = result[1];
    },
    edit() {
      let result = lieuValidator.checkDescriptionIsValid(this.description);
      this.descriptionMsgErr = result[0];
      this.descIsValid = result[1];
      result = lieuValidator.checkInstructionIsValid(this.instruction);
      this.instructionMsgErr = result[0];
      this.instrucIsValid = result[1];
      result = lieuValidator.checkLatitudeLongitudeIsValid(this.latitude);
      this.latitudeMsgErr = result[0];
      this.latitudeIsValid = result[1];
      result = lieuValidator.checkLatitudeLongitudeIsValid(this.longitude);
      this.longitudeMsgErr = result[0];
      this.longitudeIsValid = result[1];
      result = lieuValidator.checkTitleIsValid(this.title);
      this.titleMsgErr = result[0];
      this.titleIsVaild = result[1];

      const prom = new Promise((resolve) => {
        axios.get(`http://localhost:8090/api/lieu/titre/${this.title}`, {
          headers: {"Authorization": `Bearer ${this.$store.getters.token}`}
        }).then(res => {
          if (res.status === 200 && res.data.id !== this.id) {
            this.titleIsVaild = false;
            this.titleMsgErr.push("Titre déjà utilisé !");
          }
          resolve();
        }).catch(() => {
          resolve();
        });
      });

      prom.then(() => {
        if (this.titleIsVaild && this.descIsValid && this.instrucIsValid && this.latitudeIsValid && this.longitudeIsValid) {
          this.isLoading = true;

          const payload = {
            data: {
              id: +this.$route.params.id,
              titre: this.title,
              description: this.description,
              directives: this.instruction,
              latitude: this.latitude,
              longitude: this.longitude
            },
            token: this.$store.getters.token
          };
          try {
            this.$store.dispatch("editLieu", payload);
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    loadLieuToEdit() {
      this.isLoading = true;

      const payload = {
        id: this.$route.params.id,
        token: this.$store.getters.token
      };

      axios.get(`http://localhost:8090/api/lieu/${payload.id}`, {
        headers: {"Authorization": `Bearer ${payload.token}`}
      }).then(res => {
        this.id = res.data.id;
        this.title = res.data.titre;
        this.description = res.data.description;
        this.instruction = res.data.directives;
        this.latitude = res.data.latitude;
        this.longitude = res.data.longitude;

        this.titleIsVaild = true;
        this.descIsValid = true;
        this.instrucIsValid = true;
        this.latitudeIsValid = true;
        this.longitudeIsValid = true;
      }).catch(err => {
        console.log(err);
      });

      this.isLoading = false;
    }
  },
  created() {
    this.loadLieuToEdit();
  }
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

.error {
  color: #ff0000;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}
</style>
