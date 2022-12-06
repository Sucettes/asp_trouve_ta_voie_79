<template>
  <div class="offcanvas-header">
    <h4 class="offcanvas-title" id="offcanvasNavbarLabel">Profil</h4>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

  <div class="offcanvas-body">

    <br>
    <p>Modifier nom d'utilisateur</p>

    <br>

    <div class="mb-3">
      <label for="nom" class="form-label">Nom</label>
      <input type="text" class="form-control" id="nom" placeholder="Votre nom" v-model.trim="name"
             :class="{ 'is-invalid': nameIsValid===false }" @blur="checkIfNameIsValid" @input="checkIfNameIsValid"
             tabindex="1">
      <ul class="ulError" v-if="!nameIsValid">
        <li class="error" v-for="err in nameMsgErr" :key="err">{{ err }}</li>
      </ul>
    </div>

    <div class="btnWrapper">
      <button type="button" class="btn btn-primary" tabindex="6" @click="editUserName">Sauvegarder</button>
    </div>
  </div>
</template>

<script>
import {errorManager} from "@/fctUtils/errorManager";
import userValidator from "@/fctUtils/userValidator";


export default {
  name: "ProfilView",
  data() {
    return {
      userId: 0,
      name: "",
      nameIsValid: undefined,
      nameMsgErr: [],
    };
  },
  methods: {
    checkIfNameIsValid(event) {
      const result = userValidator.checkIfNameIsValid(event.target.value);
      this.nameMsgErr = result[0];
      this.nameIsValid = result[1];
    },
    async editUserName() {
      const result = userValidator.checkIfNameIsValid(this.name);
      this.nameMsgErr = result[0];
      this.nameIsValid = result[1];

      if (this.nameIsValid) {
        try {
          this.$store.dispatch("startLoading");

          const payload = {
            data: {
              name: this.name,
            },
            token: this.$store.getters.token,
          };

          await this.$store.dispatch("changeUsername", payload)
              .then(res => {
                if (res.status) {
                  this.$toast.success("Modification de l'utilisateur réussie !");
                  this.$store.dispatch("stopLoading");
                }
              })
              .catch(err => {
                this.$toast.error("Échec de la modification de l'utilisateur !");
                this.$store.dispatch("stopLoading");
                errorManager(err, this.$store, this.$router);
              });
        } catch (err) {
          this.$toast.error("Une erreur est survenue !");
          this.$store.dispatch("stopLoading");
          await errorManager(err.response, this.$store, this.$router);
        }
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  mounted() {
    this.name = this.$store.getters.name;
    this.userId = this.$store.getters.userId;
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';


.btnWrapper {
  display: flex;
  justify-content: end;
  margin-top: 40px;
}
</style>
