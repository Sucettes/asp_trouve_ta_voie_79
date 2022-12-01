<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="container">
    <form id="authForm" class="backgroundGlass">
      <h2>Inscription</h2>
      <div class="mb-3">
        <label for="inputNom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="inputNom" v-model.trim="nom" @input="valideNom"
               @blur="valideNom" :class="{ 'is-invalid': nomVal===false }">
        <ul class="ulError" v-if="!nomVal">
          <li class="error" v-for="err in nomErreurs" :key="err">{{ err }}</li>
        </ul>
      </div>
      <div class="mb-3">
        <label for="inputCourriel" class="form-label">Courriel</label>
        <input type="email" class="form-control" id="inputCourriel" v-model.trim="courriel"
               @blur="valideCourriel" @input="valideCourriel"
               :class="{ 'is-invalid': courrielVal===false }">
        <ul class="ulError" v-if="!courrielVal">
          <li class="error" v-for="err in courrielErreurs" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="mb-3">
        <label for="inputMdp" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="inputMdp" v-model.trim="mdp" @blur="valideMdp"
               @input="valideMdp" :class="{ 'is-invalid': mdpVal===false }">
        <ul class="ulError" v-if="!mdpVal">
          <li class="error" v-for="err in mdpErreurs" :key="err">{{ err }}</li>

          <li class="error" v-if="mdpConf !== mdp && mdpConf.length > 0 && mdp.length > 0">Est différent
            !
          </li>
        </ul>

        <ul class="ulError" v-if="mdpConf !== mdp && mdpConf.length > 0 && mdp.length > 0 && mdpVal">
          <li class="error">Est différent !</li>
        </ul>

      </div>
      <div class="mb-3">
        <label for="inputMdpConf" class="form-label">Mot de passe confirmer</label>
        <input type="password" class="form-control" id="inputMdpConf" v-model.trim="mdpConf"
               @blur="valideMdpConf" @input="valideMdpConf"
               :class="{ 'is-invalid': mdpConfVal===false }">
        <ul class="ulError" v-if="!mdpConfVal">
          <li class="error" v-for="err in mdpConfErreurs" :key="err">{{ err }}</li>

          <li class="error" v-if="mdpConf !== mdp && mdpConf.length > 0 && mdp.length > 0">Est différent
            !
          </li>
        </ul>

        <ul class="ulError" v-if="mdpConf !== mdp && mdpConf.length > 0 && mdp.length > 0 && mdpConfVal">
          <li class="error">Est différent !</li>
        </ul>


      </div>

      <div class="btnWrapper">
        <router-link class="nav-link" to="/auth/connexion">Connexion</router-link>

        <button type="button" class="btn btn-outline-primary" @click="register">Confirmer</button>
      </div>
    </form>
  </div>
</template>

<script>

import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import userValidator from "@/fctUtils/userValidator";


export default {
  name: "InscriptionForm",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      nom: "",
      courriel: "",
      mdp: "",
      mdpConf: "",
      nomVal: undefined,
      courrielVal: undefined,
      mdpVal: undefined,
      mdpConfVal: undefined,
      courrielErreurs: [],
      mdpErreurs: [],
      mdpConfErreurs: [],
      nomErreurs: [],
    };
  },
  methods: {
    async register() {
      let result = userValidator.checkIfNameIsValid(this.nom);
      this.nomErreurs = result[0];
      this.nomVal = result[1];
      result = userValidator.checkIfEmailIsValid(this.courriel);
      this.courrielErreurs = result[0];
      this.courrielVal = result[1];
      result = userValidator.checkIfPwdIsValid(this.mdp);
      this.mdpErreurs = result[0];
      this.mdpVal = result[1];
      result = userValidator.checkIfPwdIsValid(this.mdpConf);
      this.mdpConfErreurs = result[0];
      this.mdpConfVal = result[1];

      if (this.nomVal && this.courrielVal && this.mdpVal && this.mdpConfVal && this.mdp === this.mdpConf) {
        const payload = {
          nom: this.nom,
          courriel: this.courriel,
          mdp: this.mdp,
          mdpConf: this.mdpConf,
        };

        try {
          this.$store.dispatch("startLoading");

          this.$store.dispatch("signup", payload)
              .then((res) => {
                if (res.status) {
                  this.$toast.success("Inscription réussie ! vous êtes connecté");
                  this.$router.push({name: "accueil"});
                  this.$store.dispatch("stopLoading");
                }
              })
              .catch((err) => {
                if (err.data.err && err.data.err === "Courriel déjà utilisé !") {
                  this.courrielErreurs = ["Courriel déjà utilisé !"];
                  this.courrielVal = false;
                }
                this.$toast.error("Échec de l'inscription !");
                this.$store.dispatch("stopLoading");
              });
        } catch (err) {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
        }
      }
    },
    valideNom(event) {
      const result = userValidator.checkIfNameIsValid(event.target.value);
      this.nomErreurs = result[0];
      this.nomVal = result[1];
    },
    valideCourriel(event) {
      const result = userValidator.checkIfEmailIsValid(event.target.value);
      this.courrielErreurs = result[0];
      this.courrielVal = result[1];
    },
    valideMdp(event) {
      const result = userValidator.checkIfPwdIsValid(event.target.value);
      this.mdpErreurs = result[0];
      this.mdpVal = result[1];
    },
    valideMdpConf(event) {
      const result = userValidator.checkIfPwdIsValid(event.target.value);
      this.mdpConfErreurs = result[0];
      this.mdpConfVal = result[1];
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>

#container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-position: center;
  background-image: url("@/assets/MontagneBack.jpg") !important;
  height: calc(100vh - 56px);
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
}

#container input {
  color: white;
  background-color: transparent;
}

.btnWrapper {
  display: flex;
  justify-content: space-between;
}

.error {
  color: #ff6767;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}
</style>
