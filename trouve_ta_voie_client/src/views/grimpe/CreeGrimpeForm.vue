<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="grimpeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Ajouter une grimpe</h1>

    <form id="addGrimpeForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model="title"
               :class="{ 'is-invalid': titleIsVaild===false }" @blur="checkIfTitleIsValid" @input="checkIfTitleIsValid" tabindex="1">
        <ul class="ulError" v-if="!titleIsVaild">
          <li class="error" v-for="err in titleMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-6">
          <label for="lieuDrop" class="form-label">Lieu</label>
          <select id="lieuDrop" class="form-select" aria-label="Choisir le lieu" v-model="lieu"
                  :class="{ 'is-invalid': lieuIsValid===false }" @blur="checkIfLieuIsValid"
                  @input="checkIfLieuIsValid" @focusout="checkIfLieuIsValid" tabindex="2">
            <option selected disabled>Choisir le lieu</option>
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.titre }}</option>
          </select>
          <ul class="ulError" v-if="!lieuIsValid">
            <li class="error" v-for="err in lieuMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>

        <div class="col-6">
          <label for="diffDrop" class="form-label">Difficulté</label>
          <select id="diffDrop" class="form-select" aria-label="Choisir la difficulté" v-model="diff"
                  :class="{ 'is-invalid': diffIsValid===false }" @blur="checkIfDiffIsValid"
                  @input="checkIfDiffIsValid" @focusout="checkIfDiffIsValid" tabindex="3">
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
          <ul class="ulError" v-if="!diffIsValid">
            <li class="error" v-for="err in diffMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="description"
                  :class="{ 'is-invalid': descriptionIsValid===false }" @blur="checkIfDescriptionIsValid"
                  @input="checkIfDescriptionIsValid" tabindex="4"></textarea>
        <ul class="ulError" v-if="!descriptionIsValid">
          <li class="error" v-for="err in descriptionMsgErr" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="styleDrop" class="form-label">Style</label>
          <select id="styleDrop" class="form-select" aria-label="Choisir le style" v-model="style"
                  :class="{ 'is-invalid': styleIsValid===false }" @blur="checkIfStyleIsValid"
                  @input="checkIfStyleIsValid" tabindex="5">
            <option selected disabled>Choisir le style</option>
            <option value="Traditionnelle">Traditionnelle</option>
            <option value="Sportive">Sportive</option>
            <option value="Moulinette">Moulinette</option>
          </select>
          <ul class="ulError" v-if="!styleIsValid">
            <li class="error" v-for="err in styleMsgErr" :key="err">{{ err }}</li>
          </ul>
        </div>
        <div class="col-md-6">
          <label for="picInput" class="form-label">Image</label>
          <div class="input-group" :class="{'mb-3': !imgIsVaild === false}">
            <input id="picInput" type="file" class="form-control" placeholder="Photos" aria-label="Photo"
                   aria-describedby="Photo" @change="pictureChange" accept="image/*" ref="picInput" tabindex="6">
            <button class="btn btn-primary" type="button" id="PhotoAddBtn" @click="addPhoto" tabindex="7">
              Ajouter
            </button>
          </div>
          <ul class="ulError" v-if="!imgIsVaild">
            <li class="error" v-for="err in imgMsgErr" :key="err">{{ err }}</li>
          </ul>

          <label for="imgPrev" class="form-label">Aperçu de l'image</label>
          <div>
            <img id="imgPrev" :src="picturePreviewUrl" alt="" class="picPrev" ref="picPrev">
          </div>
        </div>
      </div>

      <hr v-if="picturesUrl.length > 0">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div v-for="(picUrl, index) in picturesUrl" :key="picturesUrl + index" class="picItem">
          <img :src="picUrl" alt="" class="lstPic"/>
          <a class="removePics" @click="removeImg(index)">Supprimer</a>
        </div>
      </div>

      <div class="btnWrapper">
        <div>
          <button @click="cancel" type="button" class="btn btn-outline-secondary" tabindex="9">Retour</button>
        </div>
        <div>
          <button @click="add" type="button" class="btn btn-primary" tabindex="8">Ajouter
          </button>
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
  name: "CreeGrimpeForm",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      title: "",
      style: "Choisir le style",
      diff: "Choisir la difficulté",
      lieu: "Choisir le lieu",
      lieux: [],
      description: "",
      picture: null,
      picturePreviewUrl: null,
      pictures: [],
      picturesBase64: [],
      picturesUrl: [],
      canAddPicture: true,

      titleIsVaild: undefined,
      titleMsgErr: [],
      lieuIsValid: undefined,
      lieuMsgErr: [],
      diffIsValid: undefined,
      diffMsgErr: [],
      descriptionIsValid: undefined,
      descriptionMsgErr: [],
      styleIsValid: undefined,
      styleMsgErr: [],
      imgIsVaild: undefined,
      imgMsgErr: [],
      titleNeedUpdated: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    pictureChange(e) {
      this.picture = e.target.files[0];
      this.picturePreviewUrl = URL.createObjectURL(e.target.files[0]);
      this.canAddPicture = true;
    },
    addPhoto() {
      if (this.canAddPicture) {
        this.canAddPicture = false;
        if (this.picture) {
          this.pictures.push(this.picture);
          this.picturesUrl.push(URL.createObjectURL((this.picture)));

          const reader = new FileReader();
          reader.readAsDataURL(this.picture);
          reader.onload = () => {
            this.picturesBase64.push({"base64": reader.result, "name": this.picture.name});
          };
          this.$refs.picInput.value = null;
          this.picturePreviewUrl = null;

          this.imgIsVaild = true;
          this.imgMsgErr = [];
          if (this.pictures.length < 1) {
            this.imgIsVaild = false;
            this.imgMsgErr.push("Dois avoir une image au minimum !");
          }
        }
      }
    },
    removeImg(index) {
      this.pictures.splice(index, 1);
      this.picturesUrl.splice(index, 1);
      this.picturesBase64.splice(index, 1);

      this.imgIsVaild = true;
      this.imgMsgErr = [];
      if (this.pictures.length < 1) {
        this.imgIsVaild = false;
        this.imgMsgErr.push("Dois avoir une image au minimum !");
      }
    },
    clearField() {
      this.title = "";
      this.style = "Choisir le style";
      this.diff = "Choisir la difficulté";
      this.lieu = "Choisir le lieu";
      this.description = "";
      this.picture = null;
      this.picturePreviewUrl = null;
      this.pictures = [];
      this.picturesBase64 = [];
      this.picturesUrl = [];
      this.canAddPicture = true;
      this.titleIsVaild = undefined;
      this.titleMsgErr = [];
      this.lieuIsValid = undefined;
      this.lieuMsgErr = [];
      this.diffIsValid = undefined;
      this.diffMsgErr = [];
      this.descriptionIsValid = undefined;
      this.descriptionMsgErr = [];
      this.styleIsValid = undefined;
      this.styleMsgErr = [];
      this.imgIsVaild = undefined;
      this.imgMsgErr = [];
      this.titleNeedUpdated = false;
    },
    async add() {
      this.imgIsVaild = true;
      this.imgMsgErr = [];
      if (this.pictures.length < 1) {
        this.imgIsVaild = false;
        this.imgMsgErr.push("Dois avoir une image au minimum !");
      }

      let result = grimpeValidator.checkIfLieuIsValid(this.lieu);
      this.lieuMsgErr = result[0];
      this.lieuIsValid = result[1];

      result = grimpeValidator.checkIfDifficultyLevelIsValid(this.diff);
      this.diffMsgErr = result[0];
      this.diffIsValid = result[1];

      result = grimpeValidator.checkIfDescriptionIsValid(this.description);
      this.descriptionMsgErr = result[0];
      this.descriptionIsValid = result[1];

      result = grimpeValidator.checkIfStyleIsValid(this.style);
      this.styleMsgErr = result[0];
      this.styleIsValid = result[1];

      if (!this.titleNeedUpdated) {
        result = grimpeValidator.checkIfTitleIsValid(this.title);
        this.titleMsgErr = result[0];
        this.titleIsVaild = result[1];
      }

      if (this.titleIsVaild && this.lieuIsValid && this.diffIsValid && this.descriptionIsValid && this.styleIsValid && this.imgIsVaild) {
        try {
          this.$store.dispatch("startLoading");

          const payload = {
            data: {
              titre: this.title,
              style: this.style,
              description: this.description,
              difficulte: this.diff,
              lieuxId: this.lieu,
              imgsBase64: this.picturesBase64,
            },
            token: this.$store.getters.token,
          };

          await this.$store.dispatch("createGrimpe", payload).then(res => {
            if (res.status) {
              this.$toast.success("Création de la grimpe réussie !");
              this.$store.dispatch("stopLoading");

              this.clearField();
            }
          }).catch(err => {
            if (err.data.err && err.data.err === "Titre déjà utilisé !") {
              this.titleIsVaild = false;
              this.titleNeedUpdated = true;
              this.titleMsgErr.push("Titre déjà utilisé !");
            }
            this.$toast.error("Échec de la création de la grimpe !");
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
    checkIfTitleIsValid(event) {
      const result = grimpeValidator.checkIfTitleIsValid(event.target.value);
      this.titleMsgErr = result[0];
      this.titleIsVaild = result[1];
      this.titleNeedUpdated = false;
    },
    checkIfLieuIsValid(event) {
      const result = grimpeValidator.checkIfLieuIsValid(event.target.value);
      this.lieuMsgErr = result[0];
      this.lieuIsValid = result[1];
    },
    checkIfDiffIsValid(event) {
      const result = grimpeValidator.checkIfDifficultyLevelIsValid(event.target.value);
      this.diffMsgErr = result[0];
      this.diffIsValid = result[1];
    },
    checkIfDescriptionIsValid(event) {
      const result = grimpeValidator.checkIfDescriptionIsValid(event.target.value);
      this.descriptionMsgErr = result[0];
      this.descriptionIsValid = result[1];
    },
    checkIfStyleIsValid(event) {
      const result = grimpeValidator.checkIfStyleIsValid(event.target.value);
      this.styleMsgErr = result[0];
      this.styleIsValid = result[1];
    },
  },
  created() {
    this.$store.dispatch("startLoading");
    axios.get("http://localhost:8090/api/lieux/dropFormat", {
      headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
    }).then(res => {
      this.lieux = res.data;
      this.$store.dispatch("stopLoading");
    }).catch(err => {
      this.$toast.error("Une erreur est survenue !");
      this.$store.dispatch("stopLoading");
      errorManager(err, this.$store, this.$router);
    });
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

body {
  background-color: #f3f4f6;
}

h1, h2 {
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
  margin-left: 5%;
  margin-right: 5%;
}

.btnWrapper > div {
  margin: 10px;
}
</style>
