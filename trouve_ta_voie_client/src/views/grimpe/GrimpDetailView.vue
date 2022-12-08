<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="grimpeDetailContainer">
    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h1>{{ titre }}</h1>

      <br>

      <div class="row">
        <div class="col-lg-6">
          <div>
            <img id="imgCover" :src="'http://localhost:8090' + pictureCover.path" alt="Image principale">
          </div>
        </div>
        <div class="col-lg-6">
          <div style="padding-left: 10px; padding-right: 10px">
            <h6>Description</h6>
            <p>{{ desc }}</p>

            <br>

            <p>Style : <strong class="accColorTxt">{{ style }}</strong></p>
            <p>Difficulté : <strong class="accColorTxt">5.{{ diff }}</strong></p>

            <star-rating-component v-if="stars !== undefined" :nbStars="stars"></star-rating-component>
            <p>Votes : <strong class="accColorTxt">{{ votes }}</strong></p>
          </div>

          <div class="btnWrapper" v-if="isLoggedIn">
            <button v-if="this.$store.getters.isAdmin" @click="showModalConfirm" type="button"
                    class="btn btn-outline-danger" style="margin-right: 20px">Supprimer
            </button>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ratingModal">
              Évaluer la grimpe
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h3>Lieu</h3>
      <br>
      <div class="row">
        <div class="col-md-6">
          <h4 @click="goToLieuDetails"><strong class="accColorTxt cursorPointer">{{ lieu.titre }}</strong></h4>
          <p>{{ lieu.description }}</p>
        </div>
        <div class="col-md-6">
          <l-map :center="mapPosition" :zoom="15" v-if="mapPosition">
            <l-tile-layer :url="url"/>
            <l-marker :lat-lng="mapPosition"></l-marker>
          </l-map>
        </div>
      </div>
    </div>

    <h3>Galerie de photos</h3>
    <br>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-2">
      <div class="d-flex" v-for="pic in pictures" :key="pic.id">
        <img class="imgGal" :src="'http://localhost:8090' + pic.path" alt="Image d'une grimpe">
      </div>
    </div>

  </div>

  <div class="modal fade" id="ratingModal" data-bs-keyboard="false">
    <grimpe-rating-modal-component :titre="titre" @save-rating="saveRating"></grimpe-rating-modal-component>
  </div>

  <div id="svgIconEditDiv" @click="goToEditGrimpe" v-if="userCanEdit || isAdmin">
    <svg id="svgIconEdit" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
         class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path
          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
  </div>

  <confirmModalComponent v-if="showConfirmModal" @confirm="confirmResult"></confirmModalComponent>
</template>

<script>
import confirmModalComponent from "@/components/confirmModalComponent";
import GrimpeRatingModalComponent from "@/components/grimpe/grimpeRatingModalComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import starRatingComponent from "@/components/starRatingComponent";
import {errorManager} from "@/fctUtils/errorManager";
import axios from "axios";
import {latLng} from "leaflet";
import {LMap, LTileLayer, LMarker} from "vue3-leaflet";


export default {
  name: "GrimpDetailView",
  components: {
    GrimpeRatingModalComponent,
    LoadingSpinnerComponent,
    starRatingComponent,
    LMap,
    LTileLayer,
    LMarker,
    confirmModalComponent,
  },
  data() {
    return {
      id: "",
      titre: "",
      style: "",
      desc: "",
      diff: undefined,
      stars: undefined,
      votes: undefined,
      userId: undefined,
      lieu: {},
      pictures: [],
      pictureCover: {},
      latitude: 0,
      longitude: 0,
      mapPosition: latLng(this.latitude, this.longitude),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      userCanEdit: false,

      showConfirmModal: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    showModalConfirm() {
      this.showConfirmModal = true;
    },
    async confirmResult(result) {
      if (result) {
        await this.deleteGrimpe(this.confirDeleteId);
      }
      this.showConfirmModal = false;
    },
    async deleteGrimpe() {
      try {
        this.$store.dispatch("startLoading");

        const payload = {
          id: this.id,
          token: this.$store.getters.token,
        };

        await this.$store.dispatch("deleteGrimpe", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
              this.$toast.success("La grimpe est supprimée !");

              this.$router.push({name: "accueil"});
            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("Une erreur est survenue !");
              errorManager(err, this.$store, this.$router);
            });
      } catch (err) {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
        await errorManager(err.response, this.$store, this.$router);
      }
    },
    async loadLieuDetails() {
      try {
        this.$store.dispatch("startLoading");

        await this.$store.dispatch("loadGrimpeDetails", {id: this.id})
            .then(response => {
              this.$store.dispatch("stopLoading");

              this.titre = response.data.titre;
              this.style = response.data.style;
              this.diff = response.data.difficulte;
              this.desc = response.data.description;
              this.stars = response.data.nbEtoiles;
              this.votes = response.data.nbVotes;
              this.userId = response.data.utilisateurId;

              this.pictures = response.data.images;
              this.pictureCover = this.pictures[0];
              this.lieu = response.data.lieux;

              this.latitude = response.data.lieux.latitude;
              this.longitude = response.data.lieux.longitude;
              this.mapPosition = latLng(response.data.lieux.latitude, response.data.lieux.longitude);

              this.userCanEdit = +response.data.utilisateurId === +this.$store.getters.userId;
            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("Une erreur est survenue !");
              errorManager(err, this.$store, this.$router);
            });
      } catch (err) {
        this.$store.dispatch("stopLoading");
        this.$toast.error("Une erreur est survenue !");
        await errorManager(err.response, this.$store, this.$router);
      }
    },
    goToEditGrimpe() {
      this.$router.push({name: "modifierGrimpe", params: {id: this.id}});
    },
    goToLieuDetails() {
      this.$router.push({name: "lieuDetails", params: {id: this.lieu.id}});
    },
    async saveRating(stars) {
      this.$store.dispatch("startLoading");

      const payload = {
        stars: stars,
        grimpeId: this.id,
      };

      try {
        await axios.post("http://localhost:8090/api/vote/nouveau", payload, {
          headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
        }).then(res => {
          this.stars = +res.data.stars;
          this.votes = +res.data.votes;
          this.$store.dispatch("stopLoading");
          this.$toast.success("Vote enregistré avec succès !");
        }).catch(err => {
          this.$store.dispatch("stopLoading");
          this.$toast.error("Une erreur est survenue !");
          errorManager(err, this.$store, this.$router);
        });
      } catch (err) {
        this.$store.dispatch("stopLoading");
        this.$toast.error("Une erreur est survenue !");
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

#grimpeDetailContainer {
  margin: 27px;

  .btnWrapper {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }

  .blockTxt {
    padding: 30px;
  }

  #imgCover {
    width: 100%;
    height: 24vw;
    min-height: 280px;
    object-fit: contain;
  }

  .imgGal {
    width: 100%;
    height: 12vw;
    min-height: 167px;
    object-fit: cover;
  }
}
</style>
