<template>
  <div id="homeContainer" class="shadow-sm p-3 mb-5 bg-body rounded">
    <h1>Accueil</h1>
    <hr>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {}
};
</script>

<style lang="scss">
@import '@/assets/styles/custom.scss';

#homeContainer {
  margin: 30px;
}

body {
  background-color: #f3f4f6;
}
h1 {
  color: $accent;
  text-align: center;
}
</style>
