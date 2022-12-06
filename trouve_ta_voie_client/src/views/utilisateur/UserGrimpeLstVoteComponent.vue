<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
    <grimpe-card-component class="d-flex"
                           v-for="x in refreshVotedClimbs"
                           :key="x.id"
                           :id="x.id"
                           :titre="x.titre"
                           :style="x.style"
                           :description="x.description"
                           :difficulte="x.difficulte"
                           :nbEtoiles="x.nbEtoiles"
                           :nbVotes="x.nbVotes"
                           :images="x.images"
                           :lieu="x.lieux"
                           :userId="x.utilisateurId"
    ></grimpe-card-component>
  </div>

  <div v-if="refreshVotedClimbs.length === 0 && !isLoading && pageLoaded" class="alert alert-info shadow-sm"
       role="alert" id="alertInfo">
    Aucune grimpe a affiché !
  </div>
</template>

<script>
import grimpeCardComponent from "@/components/grimpe/grimpeCardComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {errorManager} from "@/fctUtils/errorManager";


export default {
  name: "UserGrimpeLstVoteComponent",
  components: {LoadingSpinnerComponent, grimpeCardComponent},
  data() {
    return {
      myVotedClimbs: [],
      pageLoaded: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    refreshVotedClimbs() {
      return this.$store.getters.userVotedClimbs;
    },
  },
  methods: {
    async loadUserVotedClimbs() {
      this.$store.dispatch("startLoading");

      const payload = {
        userId: this.$store.getters.userId,
        token: this.$store.getters.token,
      };

      try {
        await this.$store.dispatch("loadUserVotedClimbs", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              errorManager(err, this.$store, this.$router);
            });

        this.myVotedClimbs = this.$store.getters.userVotedClimbs;
      } catch (err) {
        this.$store.dispatch("stopLoading");
        await errorManager(err, this.$store, this.$router);
      }
    },
  },
  created() {
    this.loadUserVotedClimbs();
  },
  mounted() {
    this.pageLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
@import 'bootstrap/scss/bootstrap.scss';


#alertInfo {
  margin: 40px auto 0;
  width: 80%;
  text-align: center;
}

.d-flex {
  justify-content: center;
}

.row {
  margin: 0;
}
</style>
