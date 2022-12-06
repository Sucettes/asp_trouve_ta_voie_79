<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="climbDetailContainer">
    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <div class="btnWrapper">
        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ratingModal">
          Évaluer la grimpe
        </button>
      </div>

      <h1>{{ title }}</h1>

      <p>Style : <strong class="accColorTxt">{{ style }}</strong></p>
      <p>Difficulté : <strong class="accColorTxt">5.{{ diff }}</strong></p>
      <p @click="goToLocationDetails">Lieu : <strong class="accColorTxt cursorPointer">{{ location.titre }}</strong></p>

      <div class="blockTxt">
        <h6>Description</h6>
        <p>{{ desc }}</p>
      </div>

      <star-rating-component v-if="stars !== undefined" :nbStars="stars"></star-rating-component>

      <p>Votes : <strong class="accColorTxt">{{ votes }}</strong></p>

      <div>
        <img v-for="pic in pictures" :key="pic.id" :src="'http://localhost:8090' + pic.path">
      </div>
    </div>
  </div>

  <div class="modal fade" id="ratingModal" data-bs-keyboard="false">
    <grimpe-rating-modal-component></grimpe-rating-modal-component>
  </div>


</template>

<script>
import GrimpeRatingModalComponent from "@/components/grimpe/grimpeRatingModalComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import starRatingComponent from "@/components/starRatingComponent";
import {errorManager} from "@/fctUtils/errorManager";


export default {
  name: "GrimpDetailView",
  components: {GrimpeRatingModalComponent, LoadingSpinnerComponent, starRatingComponent},
  data() {
    return {
      id: "",
      title: "",
      style: "",
      desc: "",
      diff: undefined,
      stars: undefined,
      votes: undefined,
      userId: undefined,
      location: {},
      pictures: [],

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
    async loadLocationDetails() {
      try {
        this.$store.dispatch("startLoading");

        await this.$store.dispatch("loadGrimpeDetails", {id: this.id})
            .then(response => {
              this.$store.dispatch("stopLoading");
              console.log(response.data);

              this.title = response.data.titre;
              this.style = response.data.style;
              this.diff = response.data.difficulte;
              this.desc = response.data.description;
              this.stars = response.data.nbEtoiles;
              this.votes = response.data.nbVotes;
              this.userId = response.data.utilisateurId;

              this.pictures = response.data.images;
              this.location = response.data.lieux;

            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              this.$toast.error("Une erreur est survenue !");
              errorManager(err.response, this.$store, this.$router);
            });
      } catch (err) {
        this.$store.dispatch("stopLoading");
        this.$toast.error("Une erreur est survenue !");
        await errorManager(err.response, this.$store, this.$router);
      }
    },
    goToEditClimb() {
      this.$router.push({name: "modifierGrimpe", params: {id: this.id}});
    },
    goToLocationDetails() {
      this.$router.push({name: "lieuDetails", params: {id: this.location.id}});
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.loadLocationDetails();
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
//@import 'bootstrap/scss/bootstrap.scss';

#climbDetailContainer {
  margin: 27px;

  h1 {
    color: $accent;
    text-align: center;
  }

  .btnWrapper {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }
}
</style>
