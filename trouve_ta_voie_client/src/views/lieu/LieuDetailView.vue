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
              <td v-if="diff.difficulte !== '5.10'">{{ diff.difficulte.replace('0', '') }}</td>
              <td v-else>{{ diff.difficulte }}</td>
              <td>{{ grimpeDiffCount[index].count }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <!--   Informations en liens avec la position   -->
      <h3>Position géographique</h3>

      <div class="row">
        <div class="col-md-6">
          <p>coordonnées :    Latitude :  <strong>{{ latitude }}</strong>  |  longitude :  <strong>{{ longitude }}</strong></p>

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
      grimpeDetails: [],

      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      positionTest: latLng(47.41422, -1.250482),
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
                this.mapPosition = latLng(response.data.lieu.latitude, response.data.lieu.longitude)

                this.totalGrimpe = response.data.totalGrimpe;
                this.grimpeStyleCount = response.data.grimpeStyle.count;
                this.grimpeStyleRows = response.data.grimpeStyle.rows;
                this.grimpeDiffCount = response.data.grimpeDiff.count;
                this.grimpeDiffRows = response.data.grimpeDiff.rows;
                this.grimpeDetails = response.data.grimpeDetails;
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
  },
  created() {
    this.id = this.$route.params.id;
    this.loadLieuDetails();

    // console.log(Process.)
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

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
  }
}
</style>
