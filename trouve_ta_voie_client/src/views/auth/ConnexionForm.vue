<template>
  <LoadingSpinnerComponent v-if="isLoading"></LoadingSpinnerComponent>

  <div id="container">
    <form id="authForm" class="backgroundGlass">
      <h2>Connexion</h2>
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
               :class="{ 'is-invalid': mdpVal===false }" @input="valideMdp">
        <ul class="ulError" v-if="!mdpVal">
          <li class="error" v-for="err in mdpErreurs" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="btnWrapper">
        <router-link class="nav-link" to="/auth/inscription" aria-label="Allez page inscription">Inscription</router-link>

        <button type="button" class="btn btn-primary" @click="login" aria-label="Confirmer connexion">Confirmer</button>
      </div>
    </form>
  </div>
</template>

<script>

import LoadingSpinnerComponent from "@/components/LoadingSpinnerComponent";
import userValidator from "@/fctUtils/userValidator";


export default {
  name: "ConnexionForm",
  components: {LoadingSpinnerComponent},
  data() {
    return {
      courriel: "",
      errCourriel: "",
      courrielVal: undefined,
      mdpVal: undefined,
      mdp: "",
      courrielErreurs: [],
      mdpErreurs: [],
    };
  },
  methods: {
    async login() {
      let result = userValidator.checkSiEmailEstValide(this.courriel);
      this.courrielErreurs = result[0];
      this.courrielVal = result[1];
      result = userValidator.checkSiPwdEstValide(this.mdp);
      this.mdpErreurs = result[0];
      this.mdpVal = result[1];

      if (this.mdpVal && this.courrielVal) {
        const payload = {
          "courriel": this.courriel,
          "mdp": this.mdp,
        };

        try {
          this.$store.dispatch("startLoading");

          await this.$store.dispatch("login", payload)
              .then((res) => {
                if (res.status) {
                  this.$toast.success("Connexion réussie !");
                  this.$router.push({name: "accueil"});
                  this.$store.dispatch("stopLoading");
                }
              })
              .catch(() => {
                this.courrielErreurs = ["Mauvais courriel ?"];
                this.courrielVal = false;
                this.mdpErreurs = ["Mauvais mot de passe ?"];
                this.mdpVal = false;
                this.$toast.error("Connexion refusée !");
                this.$store.dispatch("stopLoading");
              });
        } catch (err) {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
        }
      }
    },
    valideCourriel(event) {
      const result = userValidator.checkSiEmailEstValide(event.target.value);
      this.courrielErreurs = result[0];
      this.courrielVal = result[1];
    },
    valideMdp(event) {
      const result = userValidator.checkSiPwdEstValide(event.target.value);
      this.mdpErreurs = result[0];
      this.mdpVal = result[1];
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

.nav-link {
  color: $light;
}

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

  input {
    color: white;
    background-color: transparent;
  }

  h2 {
    color: white;
  }
}

#loginForm {
  width: 25rem;
  margin: 0 auto;
  padding: 30px;
  height: auto;
}

.btnWrapper {
  display: flex;
  justify-content: space-between;
}

#authForm {
  width: 22.5rem;
  margin: 0 auto;
  padding: 30px;
  height: auto;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
