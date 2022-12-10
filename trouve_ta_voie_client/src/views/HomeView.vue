<template>
  <div id="banner"></div>

  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="homeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Trouve ta voie</h1>
    <br>
    <br>
    <p class="blockquote">
      Notre objectif est simple, vous offrir un guide de qualité supérieure avec un inventaire de lieux tous plus
      impressionnants les uns des autres à travers le monde entier. Nous voulons aider et accompagner les
      passionnés de sensation forte dans leur quête à la recherche d'une nouvelle aventure. Nous voulons vous aider à
      trouver votre voie et vivre une expérience digne d'un film d'action. Vous êtes passionnés d'escalade comme nous?
      Vous êtes au bon endroit. Venez consulter notre catalogue afin de trouver votre lieu et à partir à l'aventure.
    </p>
  </div>
  <br>
  <h2 id="top10Titre" v-if="top10Grimpes.length > 0" class="mb-3">Top 10</h2>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-5 g-4 mlr-20">
    <grimpe-card-component class="d-flex"
                           v-for="(x) in top10Grimpes"
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
                           :userId="x.utilisateurId"
                           :showDeleteBtn="true"
                           @delete-grimpe="showModalConfirm"
    ></grimpe-card-component>
  </div>

  <div class="shadow-sm p-3 mb-5 bg-body rounded mtlr-35-12">
    <h2 id="top10Titre">Votre recherche</h2>
  </div>
  <div id="filterContainer" class="row">
    <div class="col-lg-2" id="filterMenu">
      <div class="shadow-sm p-3 mb-5 bg-body rounded margLG-10">
        <h3>Filtres</h3>
        <hr>
        <label for="styleDrop" class="form-label">Style</label>
        <select id="styleDrop" class="form-select" aria-label="Choisir le style" v-model.trim="style">
          <option selected :value="undefined">Tous les styles</option>
          <option value="Traditionnelle">Traditionnelle</option>
          <option value="Sportive">Sportive</option>
          <option value="Moulinette">Moulinette</option>
        </select>

        <br>

        <label for="starsRange" class="form-label" v-if="stars === '5'">Étoiles : <strong>{{ stars }}</strong></label>
        <label for="starsRange" class="form-label" v-else>Étoiles : <strong>{{ stars }}</strong>+</label>
        <input type="range" class="form-range" min="1" max="5" step="0.5" id="starsRange" v-model.trim="stars">

        <br>

        <label for="lieuDrop" class="form-label">Lieu</label>
        <select id="lieuDrop" class="form-select" aria-label="Choisir le style" v-model.trim="lieu">
          <option @click="this.lieu = undefined" selected :value="undefined">Tous les lieux</option>
          <option v-for="lieu in lieux" :key="lieu.id" :value="lieu.id">{{ lieu.titre }}</option>
        </select>

        <br>

        <p class="marg0">Difficulté</p>
        <p v-if="!diffEstValide" class="error marg0">
          La difficulté minimale doit être inférieure à la difficulté maximale!
        </p>
        <label for="diffDrop1" class="form-label">entre (min.)</label>
        <select id="diffDrop1" class="form-select" aria-label="Choisir la difficulté" v-model.trim="diff1"
                @focusout="checkSiDiffEstValide" @change="checkSiDiffEstValide"
                :class="{ 'is-invalid': diffEstValide===false }">
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

        <label for="diffDrop2" class="form-label">et (max.)</label>
        <select id="diffDrop2" class="form-select" aria-label="Choisir la difficulté" v-model.trim="diff2"
                @focusout="checkSiDiffEstValide" @change="checkSiDiffEstValide"
                :class="{ 'is-invalid': diffEstValide===false }">
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
          <button type="button" class="btn btn-outline-primary" @click="search()" aria-label="Faire la recherche">
            Rechercher
          </button>
        </div>
      </div>
    </div>
    <div class="col-lg-10">
      <div v-if="filteredGrimpes.length === 0 && atLeastOneSearch" class="alert alert-info shadow-sm" role="alert"
           id="alertInfo">
        Aucun résultat !
      </div>
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
                               :userId="x.utilisateurId"
                               :showDeleteBtn="true"
                               @delete-grimpe="showModalConfirm"
        ></grimpe-card-component>
      </div>

      <div class="row">
        <nav aria-label="Page navigation grimpes recherche" v-if="nbPages > 0">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" aria-label="Previous" @click="beforePage" href="#">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li class="page-item" v-for="p in nbPages" :key="'page-' + p"><a href="#" class="page-link"
                                                                             @click="setPage(p)">{{ p }}</a></li>

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
  <confirmModalComponent v-if="showConfirmModal" @confirm="confirmResult"></confirmModalComponent>
</template>

<script>

import confirmModalComponent from "@/components/confirmModalComponent";
import grimpeCardComponent from "@/components/grimpe/grimpeCardComponent";
import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import {errorManager} from "@/fctUtils/errorManager";
import axios from "axios";


export default {
  name: "HomeView",
  components: {LoadingSpinnerComponent, grimpeCardComponent, confirmModalComponent},
  data() {
    return {
      lieux: [],
      lieu: undefined,
      style: undefined,
      stars: 1,
      diff1: undefined,
      diff2: undefined,
      diffEstValide: true,
      top10Grimpes: [],
      filteredGrimpes: [],
      atLeastOneSearch: false,
      filteredGrimpesSplice: [],
      nbPages: 0,
      currPage: 0,
      showConfirmModal: false,
      confirmDeleteId: undefined,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    showModalConfirm(id) {
      this.confirmDeleteId = id;
      this.showConfirmModal = true;
    },
    async confirmResult(result) {
      if (result) {
        await this.deleteGrimpe(this.confirmDeleteId);
      }
      this.confirmDeleteId = undefined;
      this.showConfirmModal = false;
    },
    nextPage() {
      if (this.currPage < this.nbPages - 1) {
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
      }).catch(() => {
        this.$toast.error("Une erreur est survenue !");
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
    checkSiDiffEstValide() {
      if (this.diff1 !== undefined && this.diff2 !== undefined) {
        this.diffEstValide = +this.diff1 <= +this.diff2;
      }
      return true;
    },
    async search() {
      this.checkSiDiffEstValide();
      if (this.diffEstValide) {
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
          this.atLeastOneSearch = true;
          this.currPage = 0;
          this.$store.dispatch("stopLoading");
        }).catch(() => {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
        });
      }
    },
    async deleteGrimpe(id) {
      try {
        this.$store.dispatch("startLoading");

        const payload = {
          id: id,
          token: this.$store.getters.token,
        };

        await this.$store.dispatch("deleteGrimpe", payload)
            .then(() => {
              // Retire item des listes
              if (this.top10Grimpes.length > 0) {
                const index = this.top10Grimpes.findIndex(x => +x.id === +id);
                this.top10Grimpes.splice(index, 1);
              }
              if (this.filteredGrimpes.length > 0) {
                const index = this.filteredGrimpes.findIndex(x => +x.id === +id);
                this.filteredGrimpes.splice(index, 1);
              }

              this.$store.dispatch("stopLoading");
              this.$toast.success("La grimpe est supprimée !");
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
  },
  async created() {
    await this.loadDropLieux();
    await this.loadTop10();
  },
};

</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

.pagination {
  justify-content: center;
}

.margLG-10 {
  margin-right: -10px;
  margin-left: -10px;
}

.marg0 {
  margin: 0;
}

.mlr-20 {
  margin-left: 20px;
  margin-right: 20px;
}

.mtlr-35-12 {
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 0 !important;
  margin-top: 12px !important;
}

#filterMenu {
  #btnWrapper {
    display: flex;
    justify-content: center;
  }
}

#banner {
  background-color: $dark;
  height: calc(40vh);
  background-image: url("@/assets/MontagneBack.jpg") !important;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}

#homeContainer {
  margin: 30px;
}

#filterContainer {
  margin: 30px;
}

</style>
