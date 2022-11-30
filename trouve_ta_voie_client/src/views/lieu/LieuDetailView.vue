<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="container" class="">

    <div class="body shadow-sm p-3 mb-5 bg-body rounded">
      <h1>{{ titre }}</h1>
      <div class="row">
        <div class="col-md-6 blockTxt">
          <h6>Description</h6>
          <p>{{ description }}</p>
        </div>
        <div class="col-md-6 blockTxt">
          <h6>Directives pour s'y rendre</h6>
          <p>{{ directives }}</p>
        </div>
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
              <td>{{ diff.difficulte }}</td>
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

      <p>Latitude : <strong>{{ latitude }}</strong>   |   longitude : <strong>{{ longitude }}</strong></p>
      <p>TODO : mettre une carte de google map ici...</p>
    </div>
  </div>

</template>

<script>
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";

export default {
  name: "LieuDetailView",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      id: "",
      titre: "",
      description: "",
      directives: "",
      latitude: 0,
      longitude: 0,
      totalGrimpe: 0,
      grimpeStyleCount: undefined,
      grimpeStyleRows: undefined,
      grimpeDiffCount: undefined,
      grimpeDiffRows: undefined,
      grimpeDetails: [],

      center: { lat: 40.689247, lng: -74.044502 }
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
