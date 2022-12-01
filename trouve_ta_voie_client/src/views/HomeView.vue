<template>
  <div id="banner"></div>

  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="homeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Trouve ta voie</h1>

    <br>
    <br>

    <!--  fixme : corrige le francais ici  -->
    <p class="blockquote">Notre objectif est simple, vous offrir un guide de qualité supérieure avec un inventaire de
      lieux tous plus impressionnant les uns des autres à travers le monde entier. Nous voulons aider et accompagner les
      passionnés de sensation forte dans leur quête à la recherche d'une nouvelle aventure. Nous voulons vous aidez à
      trouver votre voie et vivre une expérience digne d'un film d'action. Vous êtes passionné d'escalade comme nous?
      Vous êtes au bon endroit. Venez consulter notre catalogue afin de trouvé votre lieu et a partir a l'aventure.</p>

  </div>

  <br>
    <h2 id="top10Titre">Top 10</h2>

  <!-- Fixme : Faire en sorte d'avoir toujours 1 lignes jamais 2. Trouver une solution quand on redimentionne. -->
  <div id="top10Carousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="4000">
        <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 g-4"
             style="margin-left: 20px; margin-right: 20px">
          <grimpe-card-component class="d-flex"
                                 v-for="(x) in top10Grimpes.slice(0, 5)"
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
                                 :hideDescription="'true'"
          ></grimpe-card-component>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="4000">
        <div class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 g-4"
             style="margin-left: 20px; margin-right: 20px">
          <grimpe-card-component class="d-flex"
                                 v-for="(x) in top10Grimpes.slice(5, 10)"
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
                                 :hideDescription="'true'"
          ></grimpe-card-component>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#top10Carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#top10Carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="shadow-sm p-3 mb-5 bg-body rounded"
       style="margin-left: 30px; margin-right: 30px; margin-bottom: 0 !important;"><h2 id="top10Titre">Votre
    recherche</h2></div>
  <div id="filterContainer" class="row">
    <div class="col-lg-2" id="filterMenu">
      <div class="shadow-sm p-3 mb-5 bg-body rounded margLG-10">
        <h3>Filtre</h3>
        <hr>

        <label for="styleDrop" class="form-label">Style</label>
        <select id="styleDrop" class="form-select" aria-label="Choisir le style" v-model.trim="style">
          <option value="all">Tout les styles</option>
          <option value="Traditionnelle">Traditionnelle</option>
          <option value="Sportive">Sportive</option>
          <option value="Moulinette">Moulinette</option>
        </select>

        <br>

        <label for="starsRange" class="form-label" v-if="stars === '5'">Étoiles : <strong>{{stars}}</strong></label>
        <label for="starsRange" class="form-label" v-else>Étoiles : <strong>{{stars}}</strong>+</label>
        <input type="range" class="form-range" min="1" max="5" step="0.5" id="starsRange" v-model.trim="stars">

        <br>

        <label for="lieuDrop" class="form-label">Lieu</label>
        <select id="lieuDrop" class="form-select" aria-label="Choisir le style" v-model.trim="lieu">
          <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.titre }}</option>
        </select>

        <br>

        <label for="diffDrop1" class="form-label">Difficulté <br> entre</label>
        <select id="diffDrop1" class="form-select" aria-label="Choisir la difficulté" v-model.trim="diff1">
          <option value="6">5.6</option>
          <option value="7">5.7</option>
          <option value="8">5.8</option>
          <option value="9">5.9</option>
          <option value="10">5.10</option>
          <option value="11">5.11</option>
          <option value="12">5.12</option>
          <option value="13">5.13</option>
          <option value="14">5.14</option>
          <option value="15">5.15</option>
        </select>

        <label for="diffDrop2" class="form-label">et</label>
        <select id="diffDrop2" class="form-select" aria-label="Choisir la difficulté" v-model.trim="diff2">
          <option value="6">5.6</option>
          <option value="7">5.7</option>
          <option value="8">5.8</option>
          <option value="9">5.9</option>
          <option value="10">5.10</option>
          <option value="11">5.11</option>
          <option value="12">5.12</option>
          <option value="13">5.13</option>
          <option value="14">5.14</option>
          <option value="15">5.15</option>
        </select>
        <br>
        <br>
        <div id="btnWrapper">
          <button type="button" class="btn btn-outline-primary" @click="search()">Rechercher</button>
        </div>
      </div>
    </div>
    <div class="col-lg-10">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        <grimpe-card-component class="d-flex"
                               v-for="x in filteredGrimpes.slice((currPage * 8), (currPage * 8) + 8)"
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
                               :hideDescription="'true'"
        ></grimpe-card-component>
      </div>

      <div class="row">
        <nav aria-label="Page navigation grimpes recherche" v-if="nbPages > 0">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" aria-label="Previous" @click="beforePage">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item" v-for="p in nbPages" :key="'page-' + p"><a class="page-link" @click="setPage(p)">{{p}}</a></li>

            <li class="page-item">
              <a class="page-link" aria-label="Next" @click="nextPage()">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </div>
  </div>
</template>

<script>

import grimpeCardComponent from "@/components/grimpe/grimpeCardComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import axios from "axios";

export default {
  name: "HomeView",
  components: {LoadingSpinnerComponent, grimpeCardComponent},
  data() {
    return {
      lieux: [],
      lieu: undefined,
      style: undefined,
      stars: 1,
      diff1: undefined,
      diff2: undefined,
      top10Grimpes: [],
      filteredGrimpes: [],

      filteredGrimpesSplice: [],
      nbPages: 0,
      currPage: 0
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    nextPage() {
      if (this.currPage < this.nbPages -1) {
        this.currPage += 1;
      }
    },
    beforePage() {
      if (this.currPage > 0) {
        this.currPage -= 1;
      }
    },
    setPage(page) {
      this.currPage = page - 1;
    },
    loadDropLieux() {
      this.$store.dispatch("startLoading");
      axios.get("http://localhost:8090/api/lieux/dropFormat", {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
      }).then(res => {
        this.lieux = res.data;
        this.$store.dispatch("stopLoading");
      }).catch(err => {
        console.log(err);
        this.$store.dispatch("stopLoading");
      });
    },
    loadTop10() {
      this.$store.dispatch("startLoading");
      axios.get("http://localhost:8090/api/grimpes/top10", {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
      }).then(res => {
        this.top10Grimpes = res.data;
        this.$store.dispatch("stopLoading");
      }).catch(() => {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
      });
    },
    async search() {
      this.$store.dispatch("startLoading");
      const payload = {
        style: this.style,
        stars: this.stars === "0" ? undefined : this.stars,
        lieu: this.lieu,
        diff1: this.diff1,
        diff2: this.diff2,
      };
      await axios.post("http://localhost:8090/api/grimpes/filtre", payload, {
        headers: {"Authorization": `Bearer ${this.$store.getters.token}`},
      }).then(response => {
        this.filteredGrimpes = response.data;
        this.nbPages = Math.ceil(response.data.length / 8);
        this.$store.dispatch("stopLoading");
      }).catch(() => {
        this.$toast.error("Une erreur est survenue !");
        this.$store.dispatch("stopLoading");
      });
    },
  },
  async created() {
    await this.loadDropLieux();
    await this.loadTop10();
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/custom.scss';

.pagination {
  justify-content: center;
}

#top10Carousel>button {
    max-width: 40px;
}

.margLG-10 {
  margin-right: -10px;
  margin-left: -10px;
}

#filterMenu {
  h3 {
    color: $accent;
    text-align: center;
  }

  #btnWrapper {
    display: flex;
    justify-content: center;
  }
}

#top10Titre {
  color: $accent;
  text-align: center;
}

#banner {
  background-color: #396839;
  height: calc(40vh);
  background-image: url("@/assets/MontagneBack.jpg") !important;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

#homeContainer {
  margin: 30px;
}

#filterContainer {
  margin: 30px;
}

body {
  background-color: #f3f4f6;
}

h1 {
  color: $accent;
  text-align: center;
}
</style>
