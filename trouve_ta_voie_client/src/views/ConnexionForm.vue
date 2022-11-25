<template>
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
               @input="valideMdp" :class="{ 'is-invalid': mdpVal===false }">
        <ul class="ulError" v-if="!mdpVal">
          <li class="error" v-for="err in mdpErreurs" :key="err">{{ err }}</li>
        </ul>
      </div>

      <div class="btnWrapper">
        <router-link class="nav-link" to="/auth/inscription">Inscription</router-link>

        <button type="button" class="btn btn-outline-primary" @click="login">Confirmer</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: "ConnexionForm",
  data() {
    return {
      courriel: '',
      errCourriel: '',
      courrielVal: undefined,
      mdpVal: undefined,
      mdp: '',
      isLoading: false,
      courrielErreurs: [],
      mdpErreurs: []
    };
  },
  methods: {
    async login() {
      this.isLoading = true;

      const actionPayload = {
        "courriel": this.courriel,
        "mdp": this.mdp
      };

      try {
        await this.$store.dispatch("login", actionPayload);
      } catch (err) {
        console.log(err);
      }

      this.isLoading = false;
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
    valideMdp(event) {
      const val = event.target.value;
      const mdpRegex = new RegExp('^(?=.*\\d)(?=.*[aA-zZ])(?=.*[#?!@$%^&*-]).+$');
      this.mdpErreurs = [];
      this.mdpVal = true;

      if (val === "") {
        this.mdpErreurs.push("Est requis !");
        this.mdpVal = false;
      }
      if (val.length < 6 && val.length >0) {
        this.mdpErreurs.push("Trop court !");
        this.mdpVal = false;
      }
      if (mdpRegex.test(val) === false && val.length >0) {
        this.mdpErreurs.push("Format ou caractère invalide !");
        this.mdpVal = false;
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
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

.error {
  color: #ff0000;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}

</style>

