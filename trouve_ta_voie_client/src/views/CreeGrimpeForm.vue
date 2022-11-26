<template>
  <div id="grimpeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Ajouter une grimpe</h1>
    <hr>
    <form id="addGrimpeForm">
      <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Titre" v-model="title">
      </div>

      <div class="row">
        <div class="col-6">
          <label for="lieuDrop" class="form-label">Lieu</label>
          <select id="lieuDrop" class="form-select" aria-label="Choisir le lieu" v-model="lieu">
            <option selected disabled>Choisir le lieu</option>
            <option v-for="lieu in lieux" :key="lieu.id" value="lieu.id">{{ lieu.titre }}</option>
          </select>
        </div>

        <div class="col-6">
          <label for="diffDrop" class="form-label">Difficulté</label>
          <select id="diffDrop" class="form-select" aria-label="Choisir la difficulté" v-model="diff">
            <option selected disabled>Choisir la difficulté</option>
            <option value="5.6">5.6</option>
            <option value="5.7">5.7</option>
            <option value="5.8">5.8</option>
            <option value="5.9">5.9</option>
            <option value="5.10">5.10</option>
            <option value="5.11">5.11</option>
            <option value="5.12">5.12</option>
            <option value="5.13">5.13</option>
            <option value="5.14">5.14</option>
            <option value="5.15">5.15</option>
          </select>
        </div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="styleDrop" class="form-label">Style</label>
          <select id="styleDrop" class="form-select" aria-label="Choisir le style" v-model="style">
            <option selected disabled>Choisir le style</option>
            <option value="Traditionnelle">Traditionnelle</option>
            <option value="Sportive">Sportive</option>
            <option value="Moulinette">Moulinette</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="picInput" class="form-label">Image</label>
          <div class="input-group mb-3">
            <input id="picInput" type="file" class="form-control" placeholder="Photos" aria-label="Photo"
                   aria-describedby="Photo" @change="pictureChange" accept="image/*">
            <button class="btn btn-outline-secondary" type="button" id="PhotoAddBtn" @click="addPhoto">
              Ajouté
            </button>
          </div>

          <label for="imgPrev" class="form-label">Aperçu de l'image</label>
          <div>
            <img id="imgPrev" :src="picturePreviewUrl" alt="" class="picPrev">
          </div>
        </div>
      </div>


      <hr v-if="picturesUrl.length > 0">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div v-for="(picUrl, index) in picturesUrl" :key="picturesUrl + index" class="picItem">
          <img :src="picUrl" alt="" class="lstPic"/>
          <!--          <p @click="picItemLstRemove">Retirer</p>-->
        </div>
      </div>

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
import axios from "axios";


export default {
  name: "CreeGrimpeForm",
  data() {
    return {
      isLoading: false,
      title: "",
      style: "Choisir le style",
      diff: "Choisir la difficulté",
      lieu: "Choisir le lieu",
      lieux: [],
      description: "",
      picture: null,
      picturePreviewUrl: null,
      pictures: [],
      // picturesBase64: [],
      picturesUrl: []

    };
  },
  methods: {
    // picItemLstRemove(e) {
    //   console.log(e);
    // },
    pictureChange(e) {
      this.picture = e.target.files[0];
      this.picturePreviewUrl = URL.createObjectURL(e.target.files[0]);
    },
    addPhoto() {
      if (this.picture) {
        this.pictures.push(this.picture);
        this.picturesUrl.push(URL.createObjectURL((this.picture)));
        this.picture = null;
        this.picturePreviewUrl = null;
        // document.getElementById("picInput").value = null;
      }
    },
    add() {
      this.isLoading = true;
      let picturesBase64 = [];
      const reader = new FileReader();
      // this.picturesBase64 = [];
      this.pictures.forEach(pic => {
        reader.readAsDataURL(pic);
        reader.onload = () => {
          let base64 = reader.result;
          picturesBase64.push(JSON.stringify({base64: base64}));
          console.log(picturesBase64)
        };
      });

      console.log("test")
      console.log(picturesBase64);

      const payload = {
        data: {
          titre: this.title,
          style: this.style,
          description: this.description,
          difficulte: this.diff,
          lieuxId: this.lieu,
          imgBase64: picturesBase64
        },
        token: this.$store.getters.token
      };

      try {
        this.$store.dispatch("createGrimpe", payload);
      } catch (err) {
        console.log(err);
      }

      this.isLoading = false;
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  created() {
    axios.get("http://localhost:8090/api/lieux/dropFormat", {
      headers: {"Authorization": `Bearer ${this.$store.getters.token}`}
    }).then(res => {
      this.lieux = res.data;
    }).catch(err => {
      console.log(err);
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

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

#dropdownGroup1 {
  //display: flex;
  //justify-content: space-between;
  //
  //:first-child {
  //  margin-right: 8px;
  //}
  //
  //:last-child {
  //  margin-left: 8px;
  //}
}

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
