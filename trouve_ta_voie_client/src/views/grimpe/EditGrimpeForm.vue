<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div v-if="!errorOccurred" id="grimpeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Grimpe a modifier</h1>
    <form id="editGrimpeForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model.trim="titre"
               :class="{ 'is-invalid': titreEstValide===false }" @blur="checkSiTitreEstValide"
               @input="checkSiTitreEstValide">
        <ul class="ulError" v-if="!titreEstValide">
          <li class="error" v-for="err in titreMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-6">
          <label for="lieuDrop" class="form-label">Lieu</label>
          <select id="lieuDrop" class="form-select" aria-label="Choisir le lieu" v-model.trim="lieu"
                  :class="{ 'is-invalid': lieuEstValide===false }" @blur="checkSiLieuEstValide"
                  @input="checkSiLieuEstValide" @focusout="checkSiLieuEstValide">
            <option selected disabled>Choisir le lieu</option>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.titre }}</option>
          </select>
          <ul class="ulError" v-if="!lieuEstValide">
            <li class="error" v-for="err in lieuMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>

        <div class="col-6">
          <label for="diffDrop" class="form-label">Difficulté</label>
          <select id="diffDrop" class="form-select" aria-label="Choisir la difficulté"
                  v-model.trim="diff"
                  :class="{ 'is-invalid': diffEstValide===false }" @blur="checkSiDiffEstValide"
                  @input="checkSiDiffEstValide" @focusout="checkSiDiffEstValide">
            <option selected disabled>Choisir la difficulté</option>
            <option value="6">5.6</option>
            <option value="7">5.7</option>
            <option value="8">5.8</option>
            <option value="9">5.9</option>
            <option value="10">5.10</option>
            <option value="11">5.11</option>
            <option value="12">5.12</option>
            <option value="13">5.13</option>
            <option value="14">5.14</option>
            <option value="15">5.15</option>
          </select>
          <ul class="ulError" v-if="!diffEstValide">
            <li class="error" v-for="err in diffMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="4" v-model.trim="description"
                  :class="{ 'is-invalid': descriptionEstValide===false }" @blur="checkSiDescriptionEstValide"
                  @input="checkSiDescriptionEstValide"></textarea>
        <ul class="ulError" v-if="!descriptionEstValide">
          <li class="error" v-for="err in descriptionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="styleDrop" class="form-label">Style</label>
          <select id="styleDrop" class="form-select" aria-label="Choisir le style" v-model.trim="style"
                  :class="{ 'is-invalid': styleEstValide===false }" @blur="checkSiStyleEstValide"
                  @input="checkSiStyleEstValide">
            <option selected disabled>Choisir le style</option>
            <option value="Traditionnelle">Traditionnelle</option>
            <option value="Sportive">Sportive</option>
            <option value="Moulinette">Moulinette</option>
          </select>
          <ul class="ulError" v-if="!styleEstValide">
            <li class="error" v-for="err in styleMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>

      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-primary" aria-label="Retour page précédente">Retour</button>
        </div>
        <div>
          <button @click="edit" type="button" class="btn btn-primary" aria-label="Sauvegarder modification">Sauvegarder
          </button>
        </div>
      </div>
      <hr>

      <br>
      <h2>Gestion des images</h2>
      <div>
        <label for="picInput" class="form-label">Image</label>
        <div class="input-group mb-3">
          <input id="picInput" type="file" class="form-control" placeholder="Photos" aria-label="Photo"
                 aria-describedby="Photo" @change="pictureChange" accept="image/*" ref="picInput">
          <button class="btn btn-outline-primary" type="button" id="PhotoAddBtn" @click="addPhoto" aria-label="Ajouter image">
            Ajouter Image
          </button>
        </div>

        <label for="imgPrev" class="form-label">Aperçu de l'image</label>
        <div>
          <img id="imgPrev" :src="picturePreviewUrl" class="picPrev" ref="picPrev">
        </div>
      </div>

      <br>
      <br>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div v-for="pic in pictures" :key="pic.id" class="picItem">
          <img :src="'http://localhost:8090'+pic.path" alt="Image d'une grimpe" class="lstPic"/>
          <a href="#" @click="deletePic(pic.id)" class="removePics" v-if="pictures.length > 1"
             aria-label="Supprimer image">Supprimer</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {errorManager} from "@/fctUtils/errorManager";
import grimpeValidator from "@/fctUtils/grimpeValidator";
import axios from "axios";


export default {
  name: "EditGrimpeForm",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      lieux: [],
      id: "",
      titre: "",
      lieu: "",
      diff: "",
      description: "",
      style: "",
      canAddPicture: true,
      picturePreviewUrl: null,
      pictures: [],

      titreEstValide: undefined,
      titreMsgErr: [],
      lieuEstValide: undefined,
      lieuMsgErr: [],
      diffEstValide: undefined,
      diffMsgErr: [],
      descriptionEstValide: undefined,
      descriptionMsgErr: [],
      styleEstValide: undefined,
      styleMsgErr: [],
      titreNeedUpdated: false,

      errorCode: undefined,
      statusText: "",
      errorOccurred: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    async loadGrimpeToEdit() {
      this.$store.dispatch("startLoading");
      const payload = {
        id: this.$route.params.id,
        token: this.$store.getters.token,
      };

      await axios.get(`http://localhost:8090/api/grimpe/${this.$store.getters.userId}/${payload.id}`, {
        headers: {"Authorization": `Bearer ${payload.token}`},
      }).then(res => {
        this.titre = res.data.titre;
        this.lieu = res.data.lieuxId;
        this.diff = res.data.difficulte;
        this.description = res.data.description;
        this.style = res.data.style;
        this.id = res.data.id;
        this.pictures = res.data.images;
        this.$store.dispatch("stopLoading");
      }).catch(err => {
        this.$store.dispatch("stopLoading");
        errorManager(err.response, this.$store, this.$router);
      });
    },
    loadDropLieux() {
      this.$store.dispatch("startLoading");
      axios.get("http://localhost:8090/api/lieux/dropFormat", {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
      }).then(res => {
        this.lieux = res.data;
        this.$store.dispatch("stopLoading");
      }).catch(err => {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
        errorManager(err.response, this.$store, this.$router);
      });
    },
    pictureChange(e) {
      this.picture = e.target.files[0];
      this.picturePreviewUrl = URL.createObjectURL(e.target.files[0]);
      this.canAddPicture = true;
    },
    addPhoto() {
      if (this.canAddPicture) {
        this.canAddPicture = false;
        if (this.picture) {
          const reader = new FileReader();
          reader.readAsDataURL(this.picture);
          reader.onload = () => {
            this.$store.dispatch("startLoading");

            axios.post(`http://localhost:8090/api/image`, {
              imgBase64: {
                base64: reader.result,
                name: this.picture.name,
              },
              grimpeId: this.id,
            }, {
              headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
            }).then(pic => {
              this.pictures.push(pic.data);
              this.$store.dispatch("stopLoading");
              this.$toast.success("Image ajoutée !");
            }).catch(err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("L'image a rencontré un problème !");
              errorManager(err.response, this.$store, this.$router);
            });
          };
          this.$refs.picInput.value = null;
          this.picturePreviewUrl = null;

          this.imgEstValide = true;
          this.imgMsgErr = [];
          if (this.pictures.length < 1) {
            this.imgEstValide = false;
            this.imgMsgErr.push("Dois avoir une image au minimum !");
          }
        }
      }
    },
    async edit() {
      let result = grimpeValidator.checkSiLieuEstValide(this.lieu);
      this.lieuMsgErr = result[0];
      this.lieuEstValide = result[1];
      result = grimpeValidator.checkSiDifficultyLevelEstValide(this.diff);
      this.diffMsgErr = result[0];
      this.diffEstValide = result[1];
      result = grimpeValidator.checkSiDescriptionEstValide(this.description);
      this.descriptionMsgErr = result[0];
      this.descriptionEstValide = result[1];
      result = grimpeValidator.checkSiStyleEstValide(this.style);
      this.styleMsgErr = result[0];
      this.styleEstValide = result[1];
      if (!this.titreNeedUpdated) {
        result = grimpeValidator.checkSiTitreGrimpeEstValide(this.titre);
        this.titreMsgErr = result[0];
        this.titreEstValide = result[1];
      }

      if (this.titreEstValide && this.lieuEstValide && this.diffEstValide && this.descriptionEstValide && this.styleEstValide) {
        try {
          this.$store.dispatch("startLoading");

          const payload = {
            data: {
              id: this.id,
              titre: this.titre,
              style: this.style,
              description: this.description,
              difficulte: this.diff,
              lieuxId: this.lieu,
            },
            token: this.$store.getters.token,
          };

          await this.$store.dispatch("editGrimpe", payload).then(res => {
            if (res.status) {
              this.$toast.success("Modification de la grimpe réussie !");
            }
            this.$store.dispatch("stopLoading");
          }).catch(err => {
            if (err.data.err && err.data.err === "Titre déjà utilisé !") {
              this.titreNeedUpdated = true;
              this.titreEstValide = false;
              this.titreMsgErr.push("Titre déjà utilisé !");
            }
            this.$toast.error("Échec de la modification de la grimpe !");
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
    deletePic(iId) {
      if (this.pictures.length > 1) {
        this.$store.dispatch("startLoading");
        axios.delete(`http://localhost:8090/api/image/${iId}`, {
          headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
        }).then(() => {
          this.pictures.splice(this.pictures.findIndex(x => x.id === iId), 1);
          this.$store.dispatch("stopLoading");
        }).catch(err => {
          this.$store.dispatch("stopLoading");
          errorManager(err.response, this.$store, this.$router);
        });
      }
    },
    checkSiTitreEstValide(event) {
      const result = grimpeValidator.checkSiTitreGrimpeEstValide(event.target.value);
      this.titreMsgErr = result[0];
      this.titreEstValide = result[1];
      this.titreNeedUpdated = false;
    },
    checkSiLieuEstValide(event) {
      const result = grimpeValidator.checkSiLieuEstValide(event.target.value);
      this.lieuMsgErr = result[0];
      this.lieuEstValide = result[1];
    },
    checkSiDiffEstValide(event) {
      const result = grimpeValidator.checkSiDifficultyLevelEstValide(event.target.value);
      this.diffMsgErr = result[0];
      this.diffEstValide = result[1];
    },
    checkSiDescriptionEstValide(event) {
      const result = grimpeValidator.checkSiDescriptionEstValide(event.target.value);
      this.descriptionMsgErr = result[0];
      this.descriptionEstValide = result[1];
    },
    checkSiStyleEstValide(event) {
      const result = grimpeValidator.checkSiStyleEstValide(event.target.value);
      this.styleMsgErr = result[0];
      this.styleEstValide = result[1];
    },
  },
  async created() {
    await this.loadDropLieux();
    await this.loadGrimpeToEdit();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

.removePics {
  display: block;
  color: red;
  cursor: pointer;
  text-decoration: none;
}

.picItem {
  p {
    cursor: pointer;
    color: $primary;
  }
}

.lstPic {
  max-width: 300px;
  max-height: 124px;
  width: auto;
  height: auto;
}

.picPrev {
  max-width: 450px;
  max-height: 186px;
  width: auto;
  height: auto;
}

#grimpeContainer {
  margin: 30px;
}

.btnWrapper {
  display: flex;
  justify-content: end;
  margin-top: 40px;
}

#editGrimpeForm {
  padding: 30px;
  height: auto;
  margin-left: 5%;
  margin-right: 5%;
}

.btnWrapper > div {
  margin: 10px;
}
</style>
