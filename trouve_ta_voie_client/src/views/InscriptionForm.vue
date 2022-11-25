<template>
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
        </ul>
      </div>
      <div class="mb-3">
        <label for="inputMdpConf" class="form-label">Mot de passe confirmer</label>
        <input type="password" class="form-control" id="inputMdpConf" v-model.trim="mdpConf"
               @blur="valideMdpConf" @input="valideMdpConf"
               :class="{ 'is-invalid': mdpConfVal===false }">
        <ul class="ulError" v-if="!mdpConfVal">
          <li class="error" v-for="err in mdpConfErreurs" :key="err">{{ err }}</li>
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

export default {
  name: "InscriptionForm",
  data() {
    return {
      nom: '',
      courriel: '',
      mdp: '',
      mdpConf: '',
      nomVal: undefined,
      courrielVal: undefined,
      mdpVal: undefined,
      mdpConfVal: undefined,
      isLoading: false,
      courrielErreurs: [],
      mdpErreurs: [],
      mdpConfErreurs: [],
      nomErreurs: []
    };
  },
  methods: {
    async register() {
      if (this.nomVal && this.courrielVal && this.mdpVal && this.mdpConfVal) {
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
      }
    },
    valideNom(event) {
      const val = event.target.value;
      this.nomVal = true;
      this.nomErreurs = [];
      const nomRegex = new RegExp('^[A-Za-z\\s-]+$');

      if (val === "") {
        this.nomErreurs.push("Est requis !");
        this.nomVal = false;
      }
      if (val.length < 3 && val.length > 0) {
        this.nomErreurs.push("Trop court !");
        this.nomVal = false;
      }
      if (val.length > 50) {
        this.nomErreurs.push("Trop long !");
        this.nomVal = false;
      }
      if (nomRegex.test(val) === false && val.length > 0) {
        this.nomErreurs.push("Format ou caractère invalide !");
        this.nomVal = false;
      }
    },
    valideCourriel(event) {
      const val = event.target.value;
      const emailRegex = new RegExp('^(\\w|\\.|\\_|\\-)+[@](\\w|\\_|\\-|\\.)+[.]\\w{2,3}$');
      this.courrielVal = true;
      this.courrielErreurs = [];

      if (val === "") {
        this.courrielVal = false;
        this.courrielErreurs.push("Est requis !");
      }
      if (val.length > 50) {
        this.courrielErreurs.push("Trop long !");
        this.courrielVal = false;
      }
      if (emailRegex.test(val) === false && val.length > 0) {
        this.courrielErreurs.push("Format ou caractère invalide !");
        this.courrielVal = false;
      }
    },
    mdpDiff() {
      this.mdpErreurs = [];
      this.mdpConfErreurs = [];
      if (this.mdp !== this.mdpConf && this.mdp.length > 0 && this.mdpConf.length > 0) {
        this.mdpVal = false;
        this.mdpConfVal = false;
        this.mdpErreurs.push("Est différent !");
        this.mdpConfErreurs.push("Est différent !");
        return false;
      }
      this.mdpVal = true;
      this.mdpConfVal = true;
      return true;
    },
    valideMdp(event) {
      const val = event.target.value;
      const mdpRegex = new RegExp('^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$');
      this.mdpErreurs = [];
      this.mdpVal = this.mdpDiff();

      if (val === "") {
        this.mdpErreurs.push("Est requis !");
        this.mdpVal = false;
      }
      if (val.length < 6 && val.length > 0) {
        this.mdpErreurs.push("Trop court !");
        this.mdpVal = false;
      }
      if (mdpRegex.test(val) === false && val.length > 0) {
        this.mdpErreurs.push("Format ou caractère invalide !");
        this.mdpVal = false;
      }
    },
    valideMdpConf(event) {
      const val = event.target.value;
      const mdpRegex = new RegExp('^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$');
      this.mdpConfErreurs = [];
      this.mdpConfVal = this.mdpDiff();

      if (val === "") {
        this.mdpConfErreurs.push("Est requis !");
        this.mdpConfVal = false;
      }
      if (val.length < 6 && val.length > 0) {
        this.mdpConfErreurs.push("Trop court !");
        this.mdpConfVal = false;
      }
      if (mdpRegex.test(val) === false && val.length > 0) {
        this.mdpConfErreurs.push("Format ou caractère invalide !");
        this.mdpConfVal = false;
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
  color: #ff0000;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}
</style>
