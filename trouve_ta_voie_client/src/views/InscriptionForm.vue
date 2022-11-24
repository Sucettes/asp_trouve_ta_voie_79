<template>
  <div id="container">
    <form id="authForm" class="backgroundGlass">
      <h2>Inscription</h2>
      <div class="mb-3">
        <label for="inputNom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="inputNom" v-model.trim="nom" @input="valideNom" @blur="valideNom" :class="{ 'is-invalid': nomVal===false }">
        <p class="error" v-if="!nomVal">{{ errNom }}</p>
      </div>
      <div class="mb-3">
        <label for="inputCourriel" class="form-label">Courriel</label>
        <input type="email" class="form-control" id="inputCourriel" v-model.trim="courriel"
               @blur="valideCourriel" @input="valideCourriel" :class="{ 'is-invalid': courrielVal===false }">
        <p class="error" v-if="!courrielVal">{{ errCourriel }}</p>
      </div>

      <div class="mb-3">
        <label for="inputMdp" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" id="inputMdp" v-model.trim="mdp" @blur="valideMdp" @input="valideMdp" :class="{ 'is-invalid': mdpVal===false }">
        <p class="error" v-if="!mdpVal">{{ errMdp }}</p>
      </div>
      <div class="mb-3">
        <label for="inputMdpConf" class="form-label">Mot de passe confirmer</label>
        <input type="password" class="form-control" id="inputMdpConf" v-model.trim="mdpConf"
               @blur="valideMdpConf" @input="valideMdpConf" :class="{ 'is-invalid': mdpConfVal===false }">
        <p class="error" v-if="!mdpConfVal">{{ errMdpConf }}</p>
      </div>

      <div class="btnWrapper">
        <router-link class="nav-link" to="/auth/connexion">Connexion</router-link>

        <button type="button" class="btn btn-outline-primary" @click="register">Confirmer</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "InscriptionForm",
  data() {
    return {
      nom: '',
      courriel: '',
      mdp: '',
      mdpConf: '',
      errNom: '',
      nomVal: undefined,
      errCourriel: '',
      courrielVal: undefined,
      errMdp: '',
      mdpVal: undefined,
      errMdpConf: '',
      mdpConfVal: undefined,
      isLoading: false
    };
  },
  methods: {
    async register() {
      this.isLoading = true;

      const actionPayload = {
        "nom": this.nom,
        "courriel": this.courriel,
        "mdp": this.mdp,
        "mdpConf": this.mdpConf
      };

      try {
        await this.$store.dispatch("signup", actionPayload);
      } catch (err) {
        console.log(err);
      }

      this.isLoading = false;
    },
    valideNom(event) {
      const val = event.target.value;

      if (val === "") {
        this.errNom = "Est requis!";
        this.nomVal = false;
      } else if (val.length < 3) {
        this.errNom = "Trop cours!";
        this.nomVal = false;
      } else if (val.length > 50) {
        this.errNom = "trop long!";
        this.nomVal = false;
      } else {
        this.errNom = "Valide!";
        this.nomVal = true;
      }
    },
    valideCourriel(event) {
      const val = event.target.value;

      if (val === "") {
        this.errCourriel = "Est requis!";
        this.courrielVal = false;
      } else if (val.length > 50) {
        this.errCourriel = "Trop long!";
        this.courrielVal = false;
      } else {
        this.courrielVal = true;
      }
    },
    valideMdp(event) {
      const val = event.target.value;

      if (val === "") {
        this.errMdp = "Est requis!";
        this.mdpVal = false;
      } else if (val.length < 6) {
        this.errMdp = "Trop cours!";
        this.mdpVal = false;
      } else {
        if (this.mdpConf !== val) {
          this.errMdpConf = "Est différent!";
          this.errMdp = "Est différent!";
          this.mdpVal = false;
          this.mdpConfVal = false;
        } else {
          this.mdpVal = true;
          this.mdpConfVal = true;
        }
      }

    },
    valideMdpConf(event) {
      const val = event.target.value;

      if (val === "") {
        this.errMdpConf = "Est requis!";
        this.mdpConfVal = false;
      } else if (val.length < 6) {
        this.errMdpConf = "Trop cours!";
        this.mdpConfVal = false;
      } else {
        if (this.mdp !== val) {
          this.errMdpConf = "Est différent!";
          this.errMdp = "Est différent!";
          this.mdpVal = false;
          this.mdpConfVal = false;
        } else {
          this.mdpVal = true;
          this.mdpConfVal = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>

#container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-position: center;
  background-image: url("../assets/MontagneBack.jpg") !important;
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
  color: #ff0000;
  font-size: 0.9rem;
}

</style>
