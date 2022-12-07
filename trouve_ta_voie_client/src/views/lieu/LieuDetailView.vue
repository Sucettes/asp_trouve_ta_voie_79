<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="container" class="">

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h1>{{ titre }}</h1>
      <div class="blockTxt">
        <h6>Description</h6>
        <p>{{ description }}</p>
      </div>

      <div class="btnWrapper">
        <button v-if="this.$store.getters.isAdmin" @click="showModalConfirmLieu" type="button"
                class="btn btn-outline-danger">Supprimer
        </button>
      </div>
    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h3>Grimpes</h3>
      <p>Nombre total de grimpes : <strong>{{ totalGrimpe }}</strong></p>

      <div class="row">
        <div class="col-md-6">
          <h6 class="accColorTxt">Nombre de grimpes pour chaque style.</h6>
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
          <table class="table table-bordered">
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
          <th>Évaluations</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="grimpe in grimpes" :key="grimpe.id">
          <td class="accColorTxt cursorPointer" @click="goToGrimpeDetails(grimpe.id)">{{ grimpe.titre }}</td>
          <td>
            <star-rating-component :nbStars="grimpe.nbEtoiles"></star-rating-component>
            <p class="voteP">{{ grimpe.nbVotes }} votes</p>
          </td>
          <td>
              <span class="accColorTxt cursorPointer btnLinkSPan" @click="goToGrimpeDetails(grimpe.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                     viewBox="0 0 16 16">
                  <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </span>
            <span class="cursorPointer deleteLink btnLinkSPan" @click="showModalConfirmGrimpe(grimpe.id)"
                  v-if="this.$store.getters.isAdmin">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                     viewBox="0 0 16 16">
                  <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </span>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h3>Position géographique</h3>

      <div class="row">
        <div class="col-md-6">
          <p>Latitude : <strong>{{ +latitude }}</strong> | Longitude : <strong>{{ +longitude }}</strong>
          </p>

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

  <div id="svgIconEditDiv" @click="goToEditLieu" v-if="userCanEdit || isAdmin">
    <svg id="svgIconEdit" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
         class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
  </div>

  <confirmModalComponent v-if="showConfirmModalLieu" @confirm="confirmResultDeleteLieu"></confirmModalComponent>
  <confirmModalComponent v-if="showConfirmModalGrimpe" @confirm="confirmResultDeleteGrimpe"></confirmModalComponent>

</template>

<script>
import confirmModalComponent from "@/components/confirmModalComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import starRatingComponent from "@/components/starRatingComponent";
import {errorManager} from "@/fctUtils/errorManager";
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker} from "vue3-leaflet";


export default {
  name: "LieuDetailView",
  components: {LoadingSpinnerComponent, LMap, LTileLayer, LMarker, starRatingComponent, confirmModalComponent},
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

      showConfirmModalLieu: false,
      showConfirmModalGrimpe: false,
      confirmDeleteGrimpeId: undefined,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    showModalConfirmGrimpe(id) {
      this.showConfirmModalGrimpe = true;
      this.confirmDeleteGrimpeId = id;
    },
    showModalConfirmLieu() {
      this.showConfirmModalLieu = true;
    },
    async confirmResultDeleteLieu(result) {
      if (result) {
        await this.deleteLocation();
      }
      this.showConfirmModalLieu = false;
    },
    async confirmResultDeleteGrimpe(result) {
      if (result) {
        await this.deleteClimb(this.confirmDeleteGrimpeId);
      }
      this.showConfirmModalGrimpe = false;
    },
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

                this.userCanEdit = +response.data.lieu.utilisateurId === +this.$store.getters.userId;
              }
            })
            .catch(err => {
              this.$toast.error("Une erreur est survenue !");
              this.$store.dispatch("stopLoading");
              errorManager(err, this.$store, this.$router);
            });
      } catch (err) {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
        await errorManager(err.response, this.$store, this.$router);
      }
    },
    goToGrimpeDetails(id) {
      this.$router.push({name: "grimpeDetails", params: {id: id}});
    },
    goToEditLieu() {
      this.$router.push({name: "modifierLieu", params: {id: this.id}});
    },
    async deleteLocation() {
      try {
        this.$store.dispatch("startLoading");

        const payload = {
          id: this.id,
          token: this.$store.getters.token,
        };

        await this.$store.dispatch("deleteLocation", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
              this.$toast.success("Le lieu est supprimée !");
              this.$router.push({name: "accueil"});
            })
            .catch(async err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("Une erreur est survenue !");
              await errorManager(err, this.$store, this.$router);
            });
      } catch (err) {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
        await errorManager(err.response, this.$store, this.$router);
      }
    },
    async deleteClimb(id) {
      try {
        this.$store.dispatch("startLoading");

        const payload = {
          id: id,
          token: this.$store.getters.token,
        };

        await this.$store.dispatch("deleteClimb", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
              this.$toast.success("La grimpe est supprimée !");
              this.loadLieuDetails();
            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("Une erreur est survenue !");
              errorManager(err, this.$store, this.$router);
            });
      } catch (err) {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
        await errorManager(err, this.$store, this.$router);
      }
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

#container {
  margin: 27px;

  td, th {
    padding: 4px;
  }

  h1 {
    margin-bottom: 30px;
  }

  .body {
    padding: 14px;

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

.btnWrapper {
  display: flex;
  justify-content: end;
  margin-top: 40px;
}

.d-flex {
  display: flex;
  justify-content: left;
}

.voteP {
  font-size: 0.8rem;
  vertical-align: center !important;
}

.btnLinkSPan {
  display: block;
  text-align: center;
}
</style>
