<template>
  <HeaderNav></HeaderNav>
  <router-view></router-view>
</template>

<script>
import HeaderNav from "@/components/HeaderNav";


export default {
  components: {HeaderNav},
  async mounted() {
    await this.$store.dispatch("checkIfLocalStorageTokenIsValid", this.$store.getters.token).catch(() => {
    });
  },
};
</script>

<style lang="scss">
@import './assets/styles/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';

#app {
  background-color: #f3f4f6;
}

html {
  background-color: #f3f4f6;

  ::-moz-selection {
    color: $primary;
    background: $blueAccent;
  }

  ::selection {
    color: $primary;
    background: $blueAccent;
  }
}

.backgroundGlass {
  backdrop-filter: blur(15px) saturate(100%);
  -webkit-backdrop-filter: blur(15px) saturate(100%);
  background-color: rgba(34, 34, 34, 0.12);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125)
}

#authForm {
  width: 25rem;
  margin: 0 auto;
  padding: 30px;
  height: auto;
}

.error {
  color: $red;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}
</style>
