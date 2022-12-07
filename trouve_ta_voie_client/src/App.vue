<template>
  <header-nav></header-nav>
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

  body {
    background-color: #f3f4f6;
  }
}

.backgroundGlass {
  backdrop-filter: blur(15px) saturate(100%);
  -webkit-backdrop-filter: blur(15px) saturate(100%);
  background-color: rgba(34, 34, 34, 0.12);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125)
}

.error {
  color: $red;
  font-size: 0.9rem;
}

.ulError {
  list-style: none;
  padding: 0;
}

.deleteLink {
  color: $red;
}

.deleteLink:hover {
  color: $redDark !important;
}

h1, h2, h3 {
  color: $accent;
  text-align: center;
}

.d-flex {
  justify-content: center;
}

#alertInfo {
  margin: 40px auto 0;
  width: 80%;
  text-align: center;

  strong {
    cursor: pointer;
  }
}

#map {
  height: 300px !important;
  width: 100% !important;
  min-height: 0;
  position: relative;
}

#svgIconAddDiv {
  position: fixed;
  right: 32px;
  bottom: 32px;
  cursor: pointer;

  #svgIconAdd {
    fill: $secondary;

    :hover {
      fill: $primary;
    }
  }
}

#svgIconAddDiv:hover {
  path {
    fill: $primary;
  }
}

#svgIconEditDiv {
  position: fixed;
  right: 32px;
  bottom: 32px;
  cursor: pointer;
  z-index: 1000;

  #svgIconEdit {
    fill: $secondary;
  }
}

#svgIconEditDiv:hover {
  path {
    fill: $primary;
  }
}

.accColorTxt {
  color: $primary;
}

.cursorPointer {
  cursor: pointer;
}

.cursorPointer:hover {
  color: $accent;
}
</style>
