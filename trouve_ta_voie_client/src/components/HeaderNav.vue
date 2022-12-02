<template>
  <nav class="navbar navbar-expand-md navbar-dark">
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
            <router-link class="nav-link" to="/lieu/ajouter" v-if="isLoggedIn">Ajouter un lieu
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/grimpe/ajouter" v-if="isLoggedIn">Ajouter une grimpe
            </router-link>
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
              {{ name }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" :to="{name: 'mesGrimpes'}"
                             v-if="isLoggedIn">Mes grimpes
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" :to="{name: 'mesLieux'}"
                             v-if="isLoggedIn">Mes lieux
                </router-link>
              </li>
              <!--              TODO : A faire..... -->
              <!--              <li><a class="dropdown-item" href="#">Mes votes</a></li>-->
              <hr>
              <li>
                <!--              TODO : A faire..... -->
                <!--                <router-link class="dropdown-item" to="/profil">Profil</router-link>-->
              </li>
              <li><a class="dropdown-item" @click="logout">Déconnexion</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import router from "@/router";


export default {
  name: "HeaderNav",
  components: {},
  data() {
    return {
      userId: 0,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout").then(() => {
        this.$toast.success("Déconnexion avec succès !");

        this.$store.dispatch("clearDataLieu");
        this.$store.dispatch("clearDataGrimpe");

        router.push({name: "connexion"});
      });
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    name() {
      return this.$store.getters.name;
    },
  },
  mounted() {
    this.userId = this.$store.getters.userId;
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/custom.scss';

nav {
  background-color: $dark;
}

.nav-link {
  color: white;
}

.nav-link:hover {
  color: $light;
}

.active {
  color: $light !important
}

.navbar-brand {
  color: white;
}

.navbar-brand:hover {
  color: $light;
}
</style>
