<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <!--  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">-->
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
    <!--    d-flex align-items-stretch    pour avoir la meme hauteur...-->
    <lieu-card-component class="d-flex"
                         v-for="x in refreshUserLieux"
                         :key="x.id"
                         :id="x.id"
                         :titre="x.titre"
                         :description="x.description"
                         :directives="x.directives"
                         :latitude="x.latitude"
                         :longitude="x.longitude"
    ></lieu-card-component>
  </div>
  <div v-if="refreshUserLieux.length === 0 && !isLoading && pageLoaded" class="alert alert-info shadow-sm" role="alert"
       id="alertInfo">
    Aucun lieu a affiché ! <br> cliquez ici pour en ajouté un : <strong @click="addLieu">ajouté un
    lieu</strong>
  </div>


  <div id="svgIconAddDiv" @click="addLieu">
    <svg id="svgIconAdd" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
         class="bi bi-plus-square" viewBox="0 0 16 16">
      <path
          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg>
  </div>
</template>

<script>
import LieuCardComponent from "@/components/lieu/lieuCardComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {errorManager} from "@/fctUtils/errorManager";


export default {
  name: "UserLieuLstComponent",
  components: {LieuCardComponent, LoadingSpinnerComponent},
  data() {
    return {
      pageLoaded: false,
      myLieux: [],
    };
  },
  computed: {
    refreshUserLieux() {
      return this.$store.getters.userLieux;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    async loadUserLieux() {
      const payload = {
        userId: this.$store.getters.userId,
        token: this.$store.getters.token,
      };

      try {
        await this.$store.dispatch("loadUserLieux", payload)
            .then(() => {
              this.$store.dispatch("stopLoading");
            })
            .catch(err => {
              this.$store.dispatch("stopLoading");
              errorManager(err, this.$store, this.$router);
            });
        this.myLieux = this.$store.getters.userLieux;
      } catch (err) {
        this.$store.dispatch("stopLoading");
        await errorManager(err, this.$store, this.$router);
      }
    },
    addLieu() {
      this.$router.push({name: "lieuAjouter"});
    },
  },
  created() {
    this.$store.dispatch("startLoading");
    this.loadUserLieux();
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
