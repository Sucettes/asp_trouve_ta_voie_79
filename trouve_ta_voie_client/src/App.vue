<template>
  <HeaderNav></HeaderNav>
  <router-view></router-view>
</template>

<script>
import HeaderNav from "@/components/HeaderNav";

export default {
  components: {HeaderNav},
  mounted() {
    this.$store.dispatch("reloadGetDataFromLocalStorage");
  }
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
}

.backgroundGlass {
  backdrop-filter: blur(15px) saturate(72%);
  -webkit-backdrop-filter: blur(15px) saturate(72%);
  background-color: rgba(221, 160, 122, 0);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

#authForm {
  width: 25rem;
  margin: 0 auto;
  padding: 30px;
  height: auto;
}
</style>
