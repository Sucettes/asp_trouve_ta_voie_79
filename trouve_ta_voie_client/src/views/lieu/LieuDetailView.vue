<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="container" class="">

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h1>{{ titre }}</h1>
      <div class="blockTxt">
        <h6>Description</h6>
        <p>{{ description }}</p>
      </div>
    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h3>Grimpes</h3>
      <p>Nombre total de grimpes : <strong>{{ totalGrimpe }}</strong></p>

      <div class="row">
        <div class="col-md-6">
          <h6 class="accColorTxt">Nombre de grimpes pour chaque style.</h6>
          <!--      <table class="table table-borderless">-->
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Style</th>
              <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(style, index) in grimpeStyleRows" :key="style + index">
              <td>{{ style.style }}</td>
              <td>{{ grimpeStyleCount[index].count }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <h6 class="accColorTxt">Nombre de grimpes pour chacune des difficultés.</h6>
          <!--      <table class="table table-borderless">-->
          <table class="table table-bordered">
            <!--     edit: Faire en sorte de bien affiche les difficulte       -->
            <thead>
            <tr>
              <th>Difficulté</th>
              <th>Nombre</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(diff, index) in grimpeDiffRows" :key="diff + index">
              <td>5.{{ diff.difficulte }}</td>
              <td>{{ grimpeDiffCount[index].count }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <br>

      <h6 class="accColorTxt">Liste des grimpes</h6>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Grimpe</th>
          <th>Style</th>
          <th>Difficulté</th>
          <th>Étoiles</th>
          <th>Vote</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="grimpe in grimpes" :key="grimpe.id">
          <td>{{ grimpe.titre }}</td>
          <td>{{ grimpe.style }}</td>
          <td>5.{{ grimpe.difficulte }}</td>
          <td>{{ grimpe.nbEtoiles }}</td>
          <td>{{ grimpe.nbVotes }}</td>
          <td class="accColorTxt cursorPointer" @click="goToGrimpeDetails(grimpe.id)">Détails</td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h3>Position géographique</h3>

      <div class="row">
        <div class="col-md-6">
          <p>coordonnées : Latitude : <strong>{{ latitude }}</strong> | longitude : <strong>{{ longitude }}</strong></p>

          <l-map :center="mapPosition" :zoom="15" v-if="mapPosition">
            <l-tile-layer :url="url"/>
            <l-marker :lat-lng="mapPosition"></l-marker>
          </l-map>
        </div>
        <div class="col-md-6">
          <div>
            <h6 style="margin-bottom: 15px">Directives pour s'y rendre</h6>
            <p>{{ directives }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div id="svgIconEditDiv" @click="goToEditLieu" v-if="userCanEdit">
    <svg id="svgIconEdit" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
         class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
  </div>
</template>

<script>
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker} from "vue3-leaflet";


export default {
  name: "LieuDetailView",
  components: {LoadingSpinnerComponent, LMap, LTileLayer, LMarker},
  data() {
    return {
      id: "",
      titre: "",
      description: "",
      directives: "",
      latitude: 0,
      longitude: 0,
      mapPosition: latLng(this.latitude, this.longitude),
      totalGrimpe: 0,
      grimpeStyleCount: undefined,
      grimpeStyleRows: undefined,
      grimpeDiffCount: undefined,
      grimpeDiffRows: undefined,
      grimpes: [],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      userCanEdit: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    async loadLieuDetails() {
      try {
        this.$store.dispatch("startLoading");

        await this.$store.dispatch("loadLieuDetails", {id: this.id})
            .then(response => {
              if (response) {
                this.$store.dispatch("stopLoading");

                this.titre = response.data.lieu.titre;
                this.description = response.data.lieu.description;
                this.directives = response.data.lieu.directives;
                this.latitude = response.data.lieu.latitude;
                this.longitude = response.data.lieu.longitude;
                this.mapPosition = latLng(response.data.lieu.latitude, response.data.lieu.longitude);

                this.totalGrimpe = response.data.totalGrimpe;
                this.grimpeStyleCount = response.data.grimpeStyle.count;
                this.grimpeStyleRows = response.data.grimpeStyle.rows;
                this.grimpeDiffCount = response.data.grimpeDiff.count;
                this.grimpeDiffRows = response.data.grimpeDiff.rows;
                this.grimpes = response.data.grimpes;

                this.userCanEdit = response.data.lieu.utilisateurId === this.$store.getters.userId;
              }
            })
            .catch(() => {
              this.$toast.error("Une erreur est survenue !");
              this.$store.dispatch("stopLoading");
            });
      } catch (e) {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
      }
    },
    goToGrimpeDetails(id) {
      console.log(id);
    },
    goToEditLieu() {
      this.$router.push({name: "modifierLieu", params: {id: this.id}});
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.loadLieuDetails();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
@import 'bootstrap/scss/bootstrap.scss';

#svgIconEditDiv {
  position: fixed;
  right: 32px;
  bottom: 32px;
  cursor: pointer;

  #svgIconEdit {
    fill: $secondary;
  }
}

#svgIconEditDiv:hover {
  path {
    fill: $primary;
  }
}

td, th {
  text-align: center;
}

#map {
  height: 300px !important;
  width: 100% !important;
  min-height: 0;
  position: relative;
}

#container {
  margin: 30px;

  h1 {
    margin-bottom: 30px;
  }

  .body {
    padding: 20px;

    p {
      overflow: auto;
    }

    h3 {
      text-align: center;
      margin-bottom: 30px;
    }

    .blockTxt {
      padding: 30px;
    }

    strong {
      color: $Darkaccent;
    }

    .accColorTxt {
      color: $Darkaccent;
    }

    .cursorPointer {
      cursor: pointer;
    }

    .cursorPointer:hover {
      color: $accent;
    }
  }
}
</style>
