<template>
  <div id="grimpeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Grimpe a modifier</h1>
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
            <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.titre }}</option>
          </select>
        </div>

        <div class="col-6">
          <label for="diffDrop" class="form-label">Difficulté</label>
          <select id="diffDrop" class="form-select" aria-label="Choisir la difficulté" v-model="diff">
            <option selected disabled>Choisir la difficulté</option>
            <option value="5.60">5.6</option>
            <option value="5.70">5.7</option>
            <option value="5.80">5.8</option>
            <option value="5.90">5.9</option>
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
      <hr>

      <br>
      <h2>Gestion des images</h2>
      <div>
        <label for="picInput" class="form-label">Image</label>
        <div class="input-group mb-3">
          <input id="picInput" type="file" class="form-control" placeholder="Photos" aria-label="Photo"
                 aria-describedby="Photo" @change="pictureChange" accept="image/*" ref="picInput">
          <button class="btn btn-outline-secondary" type="button" id="PhotoAddBtn" @click="addPhoto">
            Ajouter
          </button>
        </div>

        <label for="imgPrev" class="form-label">Aperçu de l'image</label>
        <div>
          <img id="imgPrev" :src="picturePreviewUrl" alt="" class="picPrev" ref="picPrev">
        </div>
      </div>

      <br>
      <br>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <div v-for="pic in pictures" :key="pic.id" class="picItem" id="dicImgSupp">
          <img :src="'http://localhost:8090'+pic.path" alt="" class="lstPic"/>
          <a @click="deletePic(pic.id)">Supprimer</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "EditGrimpeForm",
  data() {
    return {
      lieux: [],
      id: "",
      title: "",
      lieu: "",
      diff: "",
      description: "",
      style: "",
      canAddPicture: true,
      picturePreviewUrl: null,
      pictures: []
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    loadGrimpeToEdit() {
      const payload = {
        id: this.$route.params.id,
        token: this.$store.getters.token
      };

      axios.get(`http://localhost:8090/api/grimpe/${payload.id}`, {
        headers: {"Authorization": `Bearer ${payload.token}`}
      }).then(res => {
        this.title = res.data.titre;
        this.lieu = res.data.lieuxId;
        this.diff = res.data.difficulte;
        this.description = res.data.description;
        this.style = res.data.style;
        this.id = res.data.id;
        this.pictures = res.data.images;
      }).catch(err => {
        console.log(err);
      });
    },
    loadDropLieux() {
      axios.get("http://localhost:8090/api/lieux/dropFormat", {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`}
      }).then(res => {
        this.lieux = res.data;
      }).catch(err => {
        console.log(err);
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

            axios.post(`http://localhost:8090/api/image`, {
              imgBase64: {
                base64: reader.result,
                name: this.picture.name
              },
              grimpeId: this.id
            }, {
              headers: {"Authorization": `Bearer ${this.$store.getters.token}`}
            }).then(pic => {
              this.pictures.push(pic.data);
            });
          };
          this.$refs.picInput.value = null;
          this.picturePreviewUrl = null;
        }
      }
    },
    async edit() {
      // todo : faire mon edit
    },
    deletePic(iId) {
      axios.delete(`http://localhost:8090/api/image/${this.id}/${iId}`, {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`}
      }).then(res => {
        console.log(res);
      });
    }
  },
  created() {
    this.loadDropLieux();
    this.loadGrimpeToEdit();
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#dicImgSupp {
  display: flex;
  flex-direction: column;
  a {
    color: red;
    cursor: pointer;
  }
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
}

.btnWrapper > div {
  margin: 10px;
}
</style>
