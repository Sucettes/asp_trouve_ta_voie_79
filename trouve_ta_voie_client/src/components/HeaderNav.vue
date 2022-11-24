<template>
  <nav class="navbar navbar-expand-md navbar-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Trouve ta voie</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">


          <li class="nav-item">
            <a class="nav-link" href="#" v-if="isLoggedIn">Ajouter un lieu</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-if="isLoggedIn">Ajouter une grimpe</a>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/auth/connexion" v-if="!isLoggedIn">Connexion</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/auth/inscription" v-if="!isLoggedIn">Inscription
            </router-link>
          </li>

          <li class="nav-item dropdown" v-if="isLoggedIn">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              {{name}}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">Mes grimpes</a></li>
              <li><a class="dropdown-item" href="#">Mes lieux</a></li>
              <li><a class="dropdown-item" href="#">Mes votes</a></li>
              <hr>
              <li><a class="dropdown-item" href="#">Profil</a></li>
              <li><a class="dropdown-item" @click="logout">Déconnexion</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderNav",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    name() {
      return this.$store.getters.name;
    }
  }
};
</script>

<style lang="scss" scoped>
$light: #b7cce0;
$dark:  #53717f;
$medium:  #7394a1;
$accent:  #d28864;

nav {
  background-color: $dark;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, .2);
}

.nav-link {
  color: white;
}
.nav-link:hover {
  color: $light;
}

.navbar-brand {
  color: white;
}
.navbar-brand:hover {
  color: $light;
}
</style>
