<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
    <grimpe-card-component class="d-flex"
                           v-for="x in refreshUserGrimpes"
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
    ></grimpe-card-component>
  </div>
  <div v-if="refreshUserGrimpes.length === 0 && !isLoading && pageLoaded" class="alert alert-info shadow-sm"
       role="alert"
       id="alertInfo">
    Aucune grimpe a affiché ! <br> cliquez ici pour en ajouté une : <strong @click="addGrimpe">ajouté un
    grimpe</strong>
  </div>

  <div id="svgIconAddDiv" @click="addGrimpe">
    <svg id="svgIconAdd" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </div>
</template>

<script>
import grimpeCardComponent from "@/components/grimpe/grimpeCardComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";


export default {
  name: "UserGrimpeLstComponent.vue",
  components: {LoadingSpinnerComponent, grimpeCardComponent},
  data() {
    return {
      myGrimpes: [],
      pageLoaded: false,
    };
  },
  computed: {
    refreshUserGrimpes() {
      return this.$store.getters.userGrimpes;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    async loadUserGrimpes() {
      const payload = {
        userId: this.$store.getters.userId,
        token: this.$store.getters.token,
      };

      try {
        await this.$store.dispatch("loadUserGrimpes", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
            })
            .catch(() => {
              this.$store.dispatch("stopLoading");
            });
        this.myGrimpes = this.$store.getters.userGrimpes;
      } catch (err) {
        this.$store.dispatch("stopLoading");
      }
    },
    addGrimpe() {
      this.$router.push({name: "grimpeAjouter"});
    },
  },
  created() {
    this.$store.dispatch("startLoading");
    this.loadUserGrimpes();
  },
  mounted() {
    this.pageLoaded = true;
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';
@import 'bootstrap/scss/bootstrap.scss';

#svgIconAddDiv {
  position: fixed;
  right: 32px;
  bottom: 32px;
  cursor: pointer;

  #svgIconAdd {
    fill: $secondary;

    :hover {
      fill: $primary;
    }
  }
}
#svgIconAddDiv:hover {
  path {
    fill: $primary;
  }
}

.row {
  margin: 0;
}

#alertInfo {
  margin: 40px auto 0;
  width: 80%;
  text-align: center;

  strong {
    cursor: pointer;
  }
}
</style>
