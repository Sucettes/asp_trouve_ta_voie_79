<template>
  <div id="card">
    <div id="cardBody" class=" shadow-sm p-3 mb-5 bg-body rounded">

      <div>
        <div v-if="images[0]">
          <img class="lstPic" :src="'http://localhost:8090' + images[0].path"/>
        </div>
        <h3 @click="seeDetails">{{ titre }}</h3>
        <hr>

        <p>Style : <strong class="accColorTxt">{{style}}</strong></p>
        <p>Difficulté : <strong class="accColorTxt">{{ difficulte }}</strong></p>
        <p @click="seeLieuDetails">Lieu : <strong class="accColorTxt cursorPointer">{{ lieu.titre }}</strong></p>

        <br>

        <div id="ratingDiv">
          <p>Étoiles : <strong class="accColorTxt">{{ nbEtoiles }}</strong></p>
          <p>Votes : <strong class="accColorTxt">{{ nbVotes }}</strong></p>
        </div>

        <hr>
        <h6>Description</h6>
        <p v-if="description.length > 170">{{ description.substring(0, 170) + "..." }}</p>
        <p v-else>{{ description }}</p>

        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <div id="btnWrapper">
          <p @click="seeDetails" id="detailsBtn">Détails</p>
          <button @click="editGrimpe" type="button" class="btn btn-outline-secondary">Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "grimpeCardComponent",
  props: ["id", "titre", "style", "description", "difficulte", "nbEtoiles", "nbVotes", "images", "lieu"],
  methods: {
    seeLieuDetails() {
      this.$router.push({name: "lieuDetails", params: {id: this.lieu.id}});
    },
    seeDetails() {
      console.log("Sprint 3...");
    },
    editGrimpe() {
      this.$router.push({
        name: "modifierGrimpe",
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/custom.scss';

.containerImg {
  display: inline-block;
  position: relative;

  .text {
    backdrop-filter: blur(15px) saturate(72%);
    -webkit-backdrop-filter: blur(15px) saturate(72%);
    background-color: rgba(221, 160, 122, 0);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
  }
}

.lstPic {
  width: 100%;
}

#card {
  padding: 15px;

  p {
    overflow: auto;
    margin: 0;
  }
}

#cardBody {
  min-height: 520px; // todo : hauteur de carte

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 25px;

  h3 {
    text-align: center;
    color: $primary;
    cursor: pointer;
  }

  h3:hover {
    color: $Darkaccent;
  }

  span {
    height: 10px;
  }

  .accColorTxt {
    color: $Darkaccent;
  }

  .cursorPointer {
    cursor: pointer;
  }

  .cursorPointer:hover {
    color: $accent;
  }
}

#ratingDiv {
  display: flex;
  justify-content: space-between;
}

#btnWrapper {
  display: flex;
  justify-content: space-around;

  #detailsBtn {
    cursor: pointer;
    color: $primary;
    margin-top: 10px;
    margin-bottom: 0;
  }

  #detailsBtn:hover {
    color: $Darkaccent;
  }
}
</style>
