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
$light: #b7cce0;
$dark: #53717f;
$medium: #7394a1;
$accent: #d28864;

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
