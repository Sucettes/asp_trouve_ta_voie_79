<template>
  <div id="errContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <p id="oups">Oups !</p>
    <div id="err">
      <h1>{{ code }}</h1>
      <h3>{{ statusText }}</h3>
    </div>
    <p v-if="!this.$store.getters.isAuthenticated || code===401" id="errMsg">Ohh ohh, une erreur est survenue! <br>
      Vous pouvez essayer de retourner sur la page <span @click="this.$router.push({name: 'accueil'})">d'accueil</span>
      ou aller sur la page de <span @click="this.$router.push({name: 'connexion'})">connexion</span>.</p>
    <p v-else id="errMsg">Ohh ohh, une erreur est survenue! <br>
      Vous pouvez essayer de retourner sur la page <span @click="this.$router.push({name: 'accueil'})">d'accueil</span>.
    </p>
  </div>
</template>

<script>
export default {
  name: "ErreurComponent",
  props: ["code", "statusText"],
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

#errContainer {
  margin: 30px;
  min-height: calc(80vh);

  #oups {
    font-size: 6.5rem;
    margin-bottom: 40px;
    text-align: center;
  }

  #err {
    display: flex;
    justify-content: center;

    h1 {
      font-size: 3rem;
      margin-right: 12px;
    }

    h3 {
      font-size: 3rem;
      margin-left: 12px;
    }
  }

  #errMsg {
    text-align: center;
    margin-top: 20px;
    font-size: 1.3rem;

    span {
      color: $primary;
      cursor: pointer;
    }

    span:hover {
      color: $accent;
    }
  }
}
</style>
